from collections import defaultdict
from bs4 import BeautifulSoup
import re
import json

def recursive_defaultdict():
  return defaultdict(recursive_defaultdict)

def defaultdict_to_dict(d):
  if isinstance(d, defaultdict):
    d = dict(d)
    for key, value in d.items():
      d[key] = defaultdict_to_dict(value)
  return d


# A change to extract_sections(file_path) is required for ordinary time.
# Masses are not separated by h3 elements but by div elements.
# In addition to that there's an initial div that aggregates the whole page.
# Meaning: an extra conditional flow had to be incorporated into
#           extract_sections for previous functioning logic to work
#           with div elements instead of h3 elements.

def extract_sections(file_path):
  with open(file_path, 'r', encoding='utf-8') as file:
    soup = BeautifulSoup(file, 'html.parser')

    was_div = False
    first_div = True
    current_mass = ''

    masses_raw_text = {}
    for element in soup.body.find_all():
      if element.get_text() == '\xa0':
        continue

      if element.name == 'div':
        if was_div == False and first_div == True:
          first_div = False
          continue

        if was_div == False:
          current_mass = ''
        was_div = True
        current_mass += ' ' + element.get_text()
      elif element.name == 'p':
        if was_div == True:
          current_mass = current_mass.strip().replace('\n', ' ')
          masses_raw_text[current_mass] = []
        if current_mass != '':
          masses_raw_text[current_mass].append(element.get_text())
        was_div = False
  
  return masses_raw_text

def get_mass_by_sections(mass_raw_text, sections):
  mass_by_section = {}
  current_section = ''
  for text in mass_raw_text:
    text = text.replace('\n', ' ')
    is_section_title = False
    for section in sections:
      if section in text:
        is_section_title = True
        current_section = text
        mass_by_section[current_section] = []
    if not is_section_title and current_section != '':
      mass_by_section[current_section].append(text)

  return mass_by_section

def set_reference(reading_data, reference):
  if reference is not None:
    reading_data["reference"] = re.sub(r" \(Forma breve\)| \(Ou\)", "", reference)
  else:
    reading_data["reference"] = reference

def reading_extraction(reading_type, reading_data, sections_present, section_content, reference):
  sections_present.append(reading_type)
  set_reference(reading_data, reference)
  base_idx = 0
  if section_content[0][0] == '«':
    reading_data['snippet'] = section_content[base_idx]
  else:
    base_idx = -1
  reading_data["announcement"] = section_content[base_idx + 1]
  reading_data['text'] = re.sub(r" (Palavra do Senhor\.)$", "", ' '.join(section_content[base_idx + 2 : -1]))

def gospel_extraction(reading_type, reading_data, sections_present, section_content, reference):
  sections_present.append(reading_type)
  set_reference(reading_data, reference)
  base_idx = 0
  if section_content[0][0] == '«':
    reading_data['snippet'] = section_content[base_idx]
  else:
    base_idx = -1
  reading_data['snippet'] = section_content[0]
  reading_data['announcement'] = section_content[base_idx + 1]
  reading_data['text'] =  re.sub(r" (Palavra da salvação\. *)$", "", ' '.join(section_content[base_idx + 2 : -2]))
  # There might not be a need for:
  #   - conditional flow around base_idx;

def psalm_extraction(reading_type, reading_data, sections_present, section_content, reference):
  sections_present.append(reading_type)
  reading_data['reference'] = reference
  reading_data['response'] = ': '.join(section_content[0].split(': ')[1:])
  reading_data['verses'] = []

  response = section_content[0]
  response_latin = section_content[1]
  was_response = True

  nbr_alt_responses = 0

  for i in section_content[2:]:
    if 'Ou:' in i:
      nbr_alt_responses += 1
      reading_data[f"alt-response--{nbr_alt_responses}"] = ': '.join(i.split(': ')[1:])
    elif response in i or response_latin in i:
      was_response = True
      continue
    else:
      if was_response == False:
        reading_data['verses'][-1] = reading_data['verses'][-1] + ' ' + i
      else:
        reading_data['verses'].append(i)
        was_response = False

  last_verse = reading_data['verses'][-1]

  if last_verse == '| Aleluia e Evangelho |' or last_verse == '| Leitura II |' :
    reading_data['verses'].pop()

def spaced_reference(title):
  if 'SALMO' in title:
    return ' '.join(title.split(' ')[2:])
  elif 'LEITURA' in title:
    return ' '.join(title.split(' ')[2:])
  else:
    return ' '.join(title.split(' ')[1:])

def set_reading_name(name_split):
  if len(name_split) == 1:
    return name_split[0]
  else:
    return name_split[0].title() + ' ' + name_split[1].upper()

def set_reading_type(name):
  name_split = name.split(' ')
  if len(name_split) == 1:
      return 'reading-I'
  else:
      return 'reading-' + name_split[1].upper()

def create_json_mass_readings(reading_idxs, mass_by_section, sections):

  readings = {}
  sections_present = []

  for idx in reading_idxs:

    data_from_title = re.split(' - | – ', sections[idx])

    if data_from_title[0] == sections[idx]:
      reference = spaced_reference(data_from_title[0]).strip()
    else:
      reference = ' - '.join(data_from_title[1:]).strip()

    if reference == '':
      reference = None

    name = data_from_title[0].title()
    name_split = name.split(' ')
    if name_split[0] == 'Leitura':
      name = set_reading_name(name_split)

    section_content = mass_by_section[sections[idx]]

    reading_data = {}
    reading_type = None

    if 'Leitura' in name:
      reading_type = set_reading_type(name)
      if reading_type in sections_present:
        sections_present.append('alt-' + reading_type)
        reading_type = f"alt-{reading_type}--{sections_present.count('alt-' + reading_type)}"
      reading_extraction(reading_type, reading_data, sections_present, section_content, reference)
    elif 'Evangelho' in name:
      reading_type = 'gospel'
      if reading_type in sections_present:
        sections_present.append('alt-gospel')
        reading_type = f"alt-gospel--{sections_present.count('alt-gospel')}"
      gospel_extraction(reading_type, reading_data, sections_present, section_content, reference)
    elif 'Aleluia' in name:
      reading_type = 'aleluia'
      reading_data['reference'] = reference
      reading_data['response'] = ': '.join(section_content[0].split(': ')[1:])
      reading_data['text'] = section_content[1]
      # Missing latin text?
    elif 'Salmo' in name:
      reading_type = 'psalm'
      if reading_type in sections_present:
        sections_present.append('alt-' + reading_type)
        reading_type = f"alt-{reading_type}--{sections_present.count('alt-' + reading_type)}"
      psalm_extraction(reading_type, reading_data, sections_present, section_content, reference)
     
    if reading_type != None:
      readings[reading_type] = reading_data
    else:
      print('Reading type not recognized')

  return readings

possible_sections = [
    "LEITURA I ",
    "SALMO RESPONSORIAL",
    "ALELUIA",
    "LEITURA II",
    "EVANGELHO",
    "LEITURA"
]

ordinary_readings = defaultdict(recursive_defaultdict)


# Week 1 of Ordinary Time

weekdays = ["2", "3", "4", "5", "6", "7", 
            "2-even", "3-even", "4-even",
            "5-even", "6-even", "7-even"]

file_path = "../../_old/TCSemana01.htm"
masses_raw_text = extract_sections(file_path)

for i, key in enumerate(list(masses_raw_text.keys())[1:]):
  # [1:] == Exclusion of first key in masses_raw_text as the 
  #   first key refers to the initial week page containg its propers

  mass_by_section = get_mass_by_sections(masses_raw_text[key], possible_sections)
  sections = list(mass_by_section.keys())

  keywords = ["EVANGELHO", "LEITURA", "ALELUIA", "SALMO"]
  reading_idxs = [i for i, element in enumerate(sections) if any(word in element for word in keywords)]

  readings = create_json_mass_readings(reading_idxs, mass_by_section, sections)

  ordinary_readings[f'week-{file_path[-6:-4]}'][weekdays[i]] = readings


# print(repr(ordinary_readings.keys()))
# print(repr(ordinary_readings['week-01'].keys()))
# print(repr(ordinary_readings['week-01']['2'].keys()))
# print(repr(ordinary_readings['week-01']['2-even'].keys()))



# Weeks 2..37 of Ordinary Time

file_paths = [
  "../../_old/TCSemana02.htm",
  "../../_old/TCSemana03.htm",
  "../../_old/TCSemana04.htm",
  "../../_old/TCSemana05.htm",
  "../../_old/TCSemana06.htm",
  "../../_old/TCSemana07.htm",
  "../../_old/TCSemana08.htm",
  "../../_old/TCSemana09.htm",
  "../../_old/TCSemana10.htm",
  "../../_old/TCSemana11.htm",
  "../../_old/TCSemana12.htm",
  "../../_old/TCSemana13.htm",
  "../../_old/TCSemana14.htm",
  "../../_old/TCSemana15.htm",
  "../../_old/TCSemana16.htm",
  "../../_old/TCSemana17.htm",
  "../../_old/TCSemana18.htm",
  "../../_old/TCSemana19.htm",
  "../../_old/TCSemana20.htm",
  "../../_old/TCSemana21.htm",
  "../../_old/TCSemana22.htm",
  "../../_old/TCSemana23.htm",
  "../../_old/TCSemana24.htm",
  "../../_old/TCSemana25.htm",
  "../../_old/TCSemana26.htm",
  "../../_old/TCSemana27.htm",
  "../../_old/TCSemana28.htm",
  "../../_old/TCSemana29.htm",
  "../../_old/TCSemana30.htm",
  "../../_old/TCSemana31.htm",
  "../../_old/TCSemana32.htm",
  "../../_old/TCSemana33.htm",
]

weekdays = ["1", "1", "1", 
            "2", "3", "4", "5", "6", "7", 
            "2-even", "3-even", "4-even",
            "5-even", "6-even", "7-even"]
cycles = ["A", "B", "C"]

for i, file_path in enumerate(file_paths):
  masses_raw_text = extract_sections(file_path)

  for i, key in enumerate(list(masses_raw_text.keys())[1:]):
    # [1:] == Exclusion of first key in masses_raw_text as the 
    #   first key refers to the initial week page containg its propers
    mass_by_section = get_mass_by_sections(masses_raw_text[key], possible_sections)

    sections = list(mass_by_section.keys())

    keywords = ["EVANGELHO", "LEITURA", "ALELUIA", "SALMO"]
    reading_idxs = [i for i, element in enumerate(sections) if any(word in element for word in keywords)]
    # # CHATGPT: reading_idxs will contain the indices of elements in the sections list where any of the keywords are found.

    readings = create_json_mass_readings(reading_idxs, mass_by_section, sections)

    if weekdays[i] == '1':
      if ordinary_readings[f'week-{file_path[-6:-4]}'][weekdays[i]] == {}:
        ordinary_readings[f'week-{file_path[-6:-4]}'][weekdays[i]] = []
      # readings['cycle'] = [cycles][i]
      readings = {**{'cycle': cycles[i]}, **readings}
      ordinary_readings[f'week-{file_path[-6:-4]}'][weekdays[i]].append(readings)
    else:
      ordinary_readings[f'week-{file_path[-6:-4]}'][weekdays[i]] = readings

# print(repr(ordinary_readings.keys()))
# print(repr(ordinary_readings['week-01'].keys()))
# print(repr(ordinary_readings['week-01'].keys()))
# print(repr(ordinary_readings['week-02']['1']))
# print(repr(ordinary_readings['week-06']['2'].keys()))
# print(repr(ordinary_readings['week-06']['2-even'].keys()))

# for sunday in ordinary_readings['week-21']['1']:
#   print(f"{sunday.keys()}\n")
#   print(f"{sunday['reading-I']}\n")
#   if 'alt-reading-I--1' in sunday:
#     print(f"{sunday['alt-reading-I--1']}\n")
#   print(f"{sunday['psalm']}\n")
#   print(f"{sunday['reading-II']}\n")
#   if 'alt-reading-II--1' in sunday:
#     print(f"{sunday['alt-reading-II--1']}\n")
#   print(f"{sunday['aleluia']}\n")
#   print(f"{sunday['gospel']}\n")
#   if 'alt-gospel--1' in sunday:
#     print(f"{sunday['alt-gospel--1']}\n")

# for day in ordinary_readings['week-21']:
#   if 'reading-I' in ordinary_readings['week-21'][day] and 'gospel' not in ordinary_readings['week-21'][day]:
#     print(f"{ordinary_readings['week-21'][day]['reading-I']}\n")
#     if 'alt-reading-I--1' in  ordinary_readings['week-21'][day]:
#       print(f"{ordinary_readings['week-21'][day]['alt-reading-I--1']}\n")
#     print(f"{ordinary_readings['week-21'][day]['psalm']}\n")

    
# for day in ordinary_readings['week-21']:
#   if 'gospel' in ordinary_readings['week-21'][day]:
#     print(f"{ordinary_readings['week-21'][day]['reading-I']}\n")
#     if 'alt-reading-I--1' in  ordinary_readings['week-21'][day]:
#       print(f"{ordinary_readings['week-21'][day]['alt-reading-I--1']}\n")
#     print(f"{ordinary_readings['week-21'][day]['psalm']}\n")
#     if 'aleluia' in ordinary_readings['week-21'][day]:
#       print(f"{ordinary_readings['week-21'][day]['aleluia']}\n")
#     print(f"{ordinary_readings['week-21'][day]['gospel']}\n")
#     if 'alt-gospel--1' in ordinary_readings['week-21'][day]:
#       print(f"{ordinary_readings['week-21'][day]['alt-gospel--1']}\n")
      

# Week 38

weekdays = ["2", "3", "4", "5", "6", "7", 
            "2-even", "3-even", "4-even",
            "5-even", "6-even", "7-even"]

file_path = "../../_old/TCSemana34.htm"
masses_raw_text = extract_sections(file_path)

for i, key in enumerate(list(masses_raw_text.keys())[1:]):
  # [1:] == Exclusion of first key in masses_raw_text as the 
  #   first key refers to the initial week page containg its propers

  mass_by_section = get_mass_by_sections(masses_raw_text[key], possible_sections)
  sections = list(mass_by_section.keys())

  keywords = ["EVANGELHO", "LEITURA", "ALELUIA", "SALMO"]
  reading_idxs = [i for i, element in enumerate(sections) if any(word in element for word in keywords)]

  readings = create_json_mass_readings(reading_idxs, mass_by_section, sections)

  ordinary_readings[f'week-{file_path[-6:-4]}'][weekdays[i]] = readings


ordinary_readings = defaultdict_to_dict(ordinary_readings)
ordinary = {'readings': ordinary_readings}

output_file_path = '../../_new/pt/ordinary.json'
with open(output_file_path, 'w', encoding='utf-8') as file:
  json.dump(ordinary, file, ensure_ascii=False, indent=4)