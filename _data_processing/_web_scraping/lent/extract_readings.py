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


# A change to extract_sections(file_path) is required for lent time.
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
          current_mass = re.sub(r"\xa0", '', current_mass.strip())
          masses_raw_text[current_mass] = []
        if current_mass != '':
          masses_raw_text[current_mass].append(re.sub(r"\xa0", '', element.get_text()))
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

  i = 0
  len_contents = len(section_content)
  reading_data['text'] = ''
  while i < len_contents - 1:
    content = section_content[i]
    if 'Leitura' not in content and i == 0:
      reading_data['snippet'] = content
    elif 'Leitura' in content:
      reading_data['announcement'] = content
    else:
      reading_data['text'] = reading_data['text'] + re.sub(r" *(Palavra do Senhor\. *)$", "", content)
    i += 1

def gospel_extraction(reading_type, reading_data, sections_present, section_content, reference):
  sections_present.append(reading_type)
  set_reference(reading_data, reference)

  i = 0
  len_contents = len(section_content)
  reading_data['text'] = ''
  while i < len_contents - 1:
    content = section_content[i]
    if 'Palavra da salvação' in content:
      break
    elif 'Evangelho de' not in content and i == 0:
      reading_data['snippet'] = content
    elif 'Evangelho de' in content:
      reading_data['announcement'] = content
    else:
      reading_data['text'] = reading_data['text'] + content
    i += 1

def psalm_extraction(reading_type, reading_data, sections_present, section_content, reference):
  sections_present.append(reading_type)
  reading_data['reference'] = reference.strip()
  reading_data['response'] = ': '.join(section_content[0].split(': ')[1:])
  reading_data['verses'] = []

  response = section_content[0]
  response_latin = section_content[1]
  was_response = True

  nbr_alt_responses = 0

  for i in section_content[2:]:
    if 'Ou:' in i:
      nbr_alt_responses += 1
      reading_data[f"alt-response--{nbr_alt_responses}"] = ': '.join(i.split(': ')[1:]).strip()
    elif response in i or response_latin in i:
      was_response = True
      continue
    else:
      if was_response == False:
        reading_data['verses'][-1] = reading_data['verses'][-1] + ' ' + i
      else:
        reading_data['verses'].append(i)
        was_response = False

def before_gospel_extraction(reading_data, section_content, reference):
  reading_data['reference'] = reference
  reading_data['response'] = ': '.join(section_content[0].split(': ')[1:])

  nbr_alt_responses = 0

  was_text = False

  for i in section_content[1:]:
    if 'Ou:' in i and was_text == True:
      reading_data[f"alt-text"] = ': '.join(i.split(': ')[1:]).strip()
      break
    elif 'Ou:' in i:
      nbr_alt_responses += 1
      reading_data[f"alt-response--{nbr_alt_responses}"] = ': '.join(i.split(': ')[1:]).strip()
    elif was_text == False:
      reading_data['text'] = i
      was_text = True

def spaced_reference(title):
  if 'SALMO' in title:
    return ' '.join(title.split(' ')[2:])
  elif 'LEITURA' in title:
    return ' '.join(title.split(' ')[2:])
  elif 'ACLAMAÇÃO' in title:
    space_split = title.split(' ')
    if len(space_split) > 4:
      return ' '.join(title.split(' ')[4:])
    else:
      return ''
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

def create_json_mass_readings(mass_by_section):

  readings = {}
  sections_present = []

  for key in mass_by_section.keys():

    data_from_title = re.split(' - | – ', key)

    if data_from_title[0] == key:
      reference = spaced_reference(data_from_title[0])
    else:
      reference = ' - '.join(data_from_title[1:])

    if reference == '':
      reference = None

    name = data_from_title[0].title()
    name_split = name.split(' ')
    if name_split[0] == 'Leitura':
      name = set_reading_name(name_split)

    section_content = mass_by_section[key]

    reading_data = {}
    reading_type = None

    if 'Leitura' in name:
      reading_type = set_reading_type(name)
      if reading_type in sections_present:
        sections_present.append('alt-' + reading_type)
        reading_type = f"alt-{reading_type}--{sections_present.count('alt-' + reading_type)}"
      reading_extraction(reading_type, reading_data, sections_present, section_content, reference)
    elif 'Aclamação' in name:
      reading_type = 'before-gospel'
      before_gospel_extraction(reading_data, section_content, reference)
      # reading_data['text'] = section_content[1]
      # Missing latin text?
    elif 'Evangelho' in name:
      reading_type = 'gospel'
      if reading_type in sections_present:
        sections_present.append('alt-gospel')
        reading_type = f"alt-gospel--{sections_present.count('alt-gospel')}"
      gospel_extraction(reading_type, reading_data, sections_present, section_content, reference)
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
    "ACLAMAÇÃO ANTES DO EVANGELHO",
    "LEITURA II",
    "EVANGELHO",
    "LEITURA"
]

lent_readings = defaultdict(recursive_defaultdict)


# Week 0

file_path = "../../_old/QrmSem00.htm"
masses_raw_text = extract_sections(file_path)
weekdays = ['4', '5', '6', '7']

for i, key in enumerate(list(masses_raw_text.keys())):
  # [1:] == Exclusion of first key in masses_raw_text as the
  #   first key refers to Ash Wednesday
  mass_by_section = get_mass_by_sections(masses_raw_text[key], possible_sections)

  readings = create_json_mass_readings(mass_by_section)

  lent_readings[f'week-{file_path[-6:-4]}'][weekdays[i]] = readings

# for day in list(lent_readings['week-00'].keys()):
#   for key in lent_readings['week-00'][day]:
#     print(key)
#     print(lent_readings['week-00'][day][key])



# Weeks 1..5

file_paths = [
  "../../_old/QrmSem01.htm",
  "../../_old/QrmSem02.htm",
  "../../_old/QrmSem03.htm",
  "../../_old/QrmSem04.htm",
  "../../_old/QrmSem05.htm",
]

weekdays = ["1", "1", "1",
            "2", "3", "4",
            "5", "6", "7",]
cycles = ["A", "B", "C"]

for j, file_path in enumerate(file_paths):
  masses_raw_text = extract_sections(file_path)

  for i, key in enumerate(list(masses_raw_text.keys())[1:]):
    # [1:] == Exclusion of first key in masses_raw_text as the
    #   first key refers to the initial week page containg its propers
    mass_by_section = get_mass_by_sections(masses_raw_text[key], possible_sections)

    readings = create_json_mass_readings(mass_by_section)

    if weekdays[i] == '1':
      if lent_readings[f'week-{file_path[-6:-4]}'][weekdays[i]] == {}:
        lent_readings[f'week-{file_path[-6:-4]}'][weekdays[i]] = []
      # readings['cycle'] = [cycles][i]
      readings = {**{'cycle': cycles[i]}, **readings}
      lent_readings[f'week-{file_path[-6:-4]}'][weekdays[i]].append(readings)
    else:
      lent_readings[f'week-{file_path[-6:-4]}'][weekdays[i]] = readings

# print(repr(lent_readings.keys()))

# for sunday in lent_readings['week-05']['1']:
#   for key in sunday:
#     print(key)
#     print(sunday[key])

# for day in list(lent_readings['week-05'].keys())[1:]:
#   for key in lent_readings['week-05'][day]:
#     print(key)
#     print(lent_readings['week-05'][day][key])

# Holy Week: Palm Sunday readings, except gospel and procession

file_path = "../../_old/QrmSemSS.htm"
masses_raw_text = extract_sections(file_path)

palm_key = list(masses_raw_text.keys())[4]
mass_by_section = get_mass_by_sections(masses_raw_text[palm_key], possible_sections)

readings = create_json_mass_readings(mass_by_section)

del readings['reading-DA']

lent_readings['week-holy']['palm-sunday'] = readings

# Holy Week: everything less Palm Sunday

file_path = "../../_old/QrmSemSS.htm"
masses_raw_text = extract_sections(file_path)
weekdays = ["2", "3", "4",
            "5", "6", "7",]

for i, key in enumerate(list(masses_raw_text.keys())[8:]):
  mass_by_section = get_mass_by_sections(masses_raw_text[key], possible_sections)

  readings = create_json_mass_readings(mass_by_section)

  if weekdays[i] == '5':
    lent_readings['week-holy'][f'{weekdays[i]}-chrism'] = readings
  else:
    lent_readings['week-holy'][weekdays[i]] = readings


# Sacred Paschal Triduum: Holy Thursday and Good Friday

file_path = "../../_old/QrmTridSacro.htm"
masses_raw_text = extract_sections(file_path)
weekdays = ["5", "6"]

for i, key in enumerate(list(masses_raw_text.keys())[0:2]):
  if i == 1:
    # Good Friday's "gospel" requires different parsing.
    # Done in extract_gospels.py
    del possible_sections[4]

  mass_by_section = get_mass_by_sections(masses_raw_text[key], possible_sections)

  readings = create_json_mass_readings(mass_by_section)

  lent_readings['week-holy'][weekdays[i]] = readings

# print(repr(lent_readings.keys()))

# for day in list(lent_readings['week-holy'].keys()):
#   for key in lent_readings['week-holy'][day]:
#     print(key)
#     print(lent_readings['week-holy'][day][key])

# print(repr(lent_readings.keys()))
# print(repr(lent_readings['week-holy'].keys()))
# print(repr(lent_readings['week-holy']['palm_sunday'].keys()))

# for key in lent_readings['week-holy']['palm_sunday']:
#   print(key)
#   print(lent_readings['week-holy']['palm_sunday'][key])

# Add readings to JSON file

lent_readings = defaultdict_to_dict(lent_readings)
lent = {'readings': lent_readings}

output_file_path = '../../_new/pt/lent.json'
with open(output_file_path, 'w', encoding='utf-8') as file:
  json.dump(lent, file, ensure_ascii=False, indent=4)
