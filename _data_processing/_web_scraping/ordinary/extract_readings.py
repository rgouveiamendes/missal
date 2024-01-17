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
    reading_data["reference"] = re.sub(r" \(Forma breve\)$", "", reference)
  else:
    reading_data["reference"] = reference

def reading_extraction(reading_type, reading_data, readings_present, section_content, reference):
  readings_present.append(reading_type)
  set_reference(reading_data, reference)
  base_idx = 0
  if section_content[0][0] == '«':
    reading_data['snippet'] = section_content[base_idx]
  else:
    base_idx = -1
  reading_data["announcement"] = section_content[base_idx + 1]
  reading_data['text'] = re.sub(r" (Palavra do Senhor\.)$", "", ' '.join(section_content[base_idx + 2 : -1]))

def gospel_extraction(reading_type, reading_data, readings_present, section_content, reference):
  readings_present.append(reading_type)
  set_reference(reading_data, reference)
  base_idx = 0
  if section_content[0][0] == '«':
    reading_data['snippet'] = section_content[base_idx]
  else:
    base_idx = -1
  reading_data['snippet'] = section_content[0]
  reading_data['announcement'] = section_content[base_idx + 1]
  reading_data['text'] =  re.sub(r" (Palavra da salvação\. *)", "", ' '.join(section_content[base_idx + 2 : -2]))
  # There might not be a need for:
  #   - conditional flow around base_idx;

def psalm_extraction(reading_data, section_content, reference):
  reading_data['reference'] = reference

  base_idx = 0
  # if section_content[0][0] == '(':
  #   reading_data['notice'] = section_content[0]
  #   base_idx = 1
  
  reading_data['response'] = ': '.join(section_content[0].split(': ')[1:])

  if section_content[base_idx + 2].split(' ')[0] == 'Ou:':
    reading_data['alt-response'] = ' '.join(section_content[base_idx+2].split(' ')[1:])
    reading_data['verses'] = section_content[base_idx+3::3]
  else:
    reading_data['verses'] = section_content[base_idx+2::3]

  if reading_data['verses'][-1] == '| Aleluia e Evangelho |':
    reading_data['verses'].pop()

def create_json_mass_readings(reading_idxs, mass_by_section, sections):

  readings = {}
  readings_present = []

  for idx in reading_idxs:

    data_from_title = re.split(' - | – ', sections[idx])
    name = data_from_title[0].title() # Correct words' casing
    name_split = name.split(' ')
    if name_split[0] == 'Leitura':
      name = name_split[0].title() + ' ' + name_split[1].upper() 
    reference = ' - '.join(data_from_title[1:])

    if reference == '':
      reference = None

    section_content = mass_by_section[sections[idx]]

    reading_data = {}
    reading_type = None

    if 'Leitura' in name:
      reading_type = 'reading-' + name.split(' ')[-1]
      if reading_type in readings_present:
        readings_present.append('alt-' + reading_type)
        reading_type = f"alt-{reading_type}--{readings_present.count('alt-' + reading_type)}"
      reading_extraction(reading_type, reading_data, readings_present, section_content, reference)

    if 'Evangelho' in name:
      reading_type = 'gospel'
      if reading_type in readings_present:
        readings_present.append('alt-gospel')
        reading_type = f"alt-gospel--{readings_present.count('alt-gospel')}"
      gospel_extraction(reading_type, reading_data, readings_present, section_content, reference)
    
    if 'Aleluia' in name:
      reading_type = 'aleluia'
      reading_data['reference'] = reference
      reading_data['response'] = ': '.join(section_content[0].split(': ')[1:])
      reading_data['text'] = section_content[1]
      # Missing latin text?

    if 'Salmo' in name:
      reading_type = 'psalm'
      psalm_extraction(reading_data, section_content, reference)
     
    if reading_type != None:
      readings[reading_type] = reading_data
    else:
      print('Reading type not recognized')

  return readings

possible_sections = [
    "ANTÍFONA DE ENTRADA",
    "ORAÇÃO COLECTA",
    "ANTÍFONA DA COMUNHÃO",
    "ORAÇÃO SOBRE AS OBLATAS",
    "ORAÇÃO DEPOIS DA COMUNHÃO",
    "LEITURA I ",
    "SALMO RESPONSORIAL",
    "ALELUIA",
    "LEITURA II",
    "EVANGELHO"
]

ordinary_readings = defaultdict(recursive_defaultdict)


# Week 1 of Ordinary Time

# file_paths = [
#     "../../_old/TCSemana01.htm",
# ]

# weekdays = ["2", "3", "4", "5", "6", "7", 
#             "2-even", "3-even", "4-even",
#             "5-even", "6-even", "7-even"]

# for i, file_path in enumerate(file_paths):
#   masses_raw_text = extract_sections(file_path)
#   for i, key in enumerate(list(masses_raw_text.keys())[1:]):
#     # [1:] == Exclusion of first key in masses_raw_text as the 
#     #   first key refers to the initial week page containg its propers

#     mass_by_section = get_mass_by_sections(masses_raw_text[key], possible_sections)
#     sections = list(mass_by_section.keys())

#     keywords = ["EVANGELHO", "LEITURA", "ALELUIA", "SALMO"]
#     reading_idxs = [i for i, element in enumerate(sections) if any(word in element for word in keywords)]
#     # # CHATGPT: reading_idxs will contain the indices of elements in the sections list where any of the keywords are found.

#     readings = create_json_mass_readings(reading_idxs, mass_by_section, sections)

#     ordinary_readings[f'week-{file_path[-6:-4]}'][weekdays[i]] = readings


# print(repr(ordinary_readings.keys()))
# print(repr(ordinary_readings['week-01'].keys()))
# print(repr(ordinary_readings['week-01']['2'].keys()))
# print(repr(ordinary_readings['week-01']['2-even'].keys()))



# Weeks 2.. 

file_paths = [
  # "../../_old/TCSemana02.htm",
  # "../../_old/TCSemana03.htm",
  # "../../_old/TCSemana04.htm",
  # "../../_old/TCSemana05.htm",
  # "../../_old/TCSemana06.htm",
  # "../../_old/TCSemana07.htm",
  # "../../_old/TCSemana08.htm",
  # "../../_old/TCSemana09.htm",
  # "../../_old/TCSemana10.htm",
  # "../../_old/TCSemana11.htm",
  # "../../_old/TCSemana12.htm",
  "../../_old/TCSemana13.htm",
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

print(repr(ordinary_readings.keys()))
# print(repr(ordinary_readings['week-01'].keys()))
# print(repr(ordinary_readings['week-01'].keys()))
# print(repr(ordinary_readings['week-02']['1']))
# print(repr(ordinary_readings['week-06']['2'].keys()))
# print(repr(ordinary_readings['week-06']['2-even'].keys()))

# for sunday in ordinary_readings['week-13']['1']:
#   print(f"{sunday.keys()}\n")
#   print(f"{sunday['reading-I']}\n")
#   if 'alt-reading-I--2' in sunday:
#     print(f"{sunday['alt-reading-I--2']}\n")
#   print(f"{sunday['psalm']}\n")
#   print(f"{sunday['reading-II']}\n")
#   if 'alt-reading-II--2' in sunday:
#     print(f"{sunday['alt-reading-II--2']}\n")
#   print(f"{sunday['aleluia']}\n")
#   print(f"{sunday['gospel']}\n")
#   if 'alt-gospel--1' in sunday:
#     print(f"{sunday['alt-gospel--1']}\n")

for day in ordinary_readings['week-13']:
  if 'gospel' in ordinary_readings['week-13'][day]:
    print(f"{ordinary_readings['week-13'][day]['reading-I']}\n")
    if 'alt-reading-I--1' in  ordinary_readings['week-13'][day]:
      print(f"{ordinary_readings['week-13'][day]['alt-reading-I--1']}\n")
    print(f"{ordinary_readings['week-13'][day]['psalm']}\n")
    print(f"{ordinary_readings['week-13'][day]['aleluia']}\n")
    print(f"{ordinary_readings['week-13'][day]['gospel']}\n")
    if 'alt-gospel--1' in ordinary_readings['week-13'][day]:
      print(f"{ordinary_readings['week-13'][day]['alt-gospel--1']}\n")


