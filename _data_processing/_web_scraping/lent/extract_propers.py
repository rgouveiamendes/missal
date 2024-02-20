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
          text = element.get_text().replace('\xa0', '')
          masses_raw_text[current_mass].append(text)
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

def set_proper(proper_type, section, reference):
  proper = {}
  alt_propers = {}
  proper['text'] = section[0]
  proper['reference'] = reference
  propers_set = [proper]

  if (proper_type == 'communion' or proper_type == 'entrance') and len(section) > 3:
    nbr_alt_propers = 0
    i = 0
    while i < len(section):
      if 'Ou: ' in section[i]:
        nbr_alt_propers += 1
        alt_propers[f"alt_proper-{nbr_alt_propers}"] = {}
        alt_propers[f"alt_proper-{nbr_alt_propers}"]['text'] = section[i + 1]
        alt_propers[f"alt_proper-{nbr_alt_propers}"]['reference'] = section[i].split('Ou: ')[-1].replace(':', '')
      elif 'Quando se lê' in section[i]:
        propers_set = []
        nbr_alt_propers += 1
        alt_propers[f"alt_proper-{nbr_alt_propers}"] = {}
        alt_propers[f"alt_proper-{nbr_alt_propers}"]['text'] = section[i + 1]

        notice_reference = section[i].split(': ')
        alt_propers[f"alt_proper-{nbr_alt_propers}"]['reference'] = notice_reference[-1]
        alt_propers[f"alt_proper-{nbr_alt_propers}"]['notice'] = notice_reference[0]
      i += 1

  for alt_proper in alt_propers:
    propers_set.append(alt_propers[alt_proper])

  return propers_set

def create_json_mass_propers(propers_sections):

  propers = {}

  for key in list(propers_sections.keys()):

    data_from_title = re.split(' - | – ', key)
    name = data_from_title[0].title()

    # if 'Ou:' in key:
    #   reference = ' '.join(key.split(' ')[1:])
    # else:
    reference = ' - '.join(data_from_title[1:])

    section = propers_sections[key]
    proper_data = {}
    proper_type = None

    if reference == '':
      reference = None

    if 'Entrada' in name:
      proper_type = 'entrance'
    elif 'Colecta' in name:
      proper_type = 'collect'
    elif 'Oblatas' in name:
      proper_type = 'offerings'
    elif 'Antífona Da Comunhão' in name:
      proper_type = 'communion'
    # elif 'Ou:' in name:
    #   proper_type = 'alt-communion'
    elif 'Depois' in name:
      proper_type = 'post-communion'
    
    proper_s = set_proper(proper_type, section, reference)

    if proper_type != None:
      if len(proper_s) > 1:
        propers[proper_type] = proper_s[0]
        i = 1
        while i < len(proper_s):
          propers[f"alt-{proper_type}-{i}"] = proper_s[i]
          i += 1
      else:
        propers[proper_type] = proper_s[0]
    else:
      print('Proper type not recognized')

  return propers


lent_propers = defaultdict(recursive_defaultdict)

possible_sections = [
    "ANTÍFONA DE ENTRADA",
    "ORAÇÃO COLECTA",
    "ORAÇÃO SOBRE AS OBLATAS",
    "ANTÍFONA DA COMUNHÃO",
    "ORAÇÃO DEPOIS DA COMUNHÃO",
    # "Ou:"
]

# Week 0

file_path = '../../_old/QrmSem00.htm'
weekdays = ['4', '5', '6', '7']

week_sections = extract_sections(file_path)

for j, day in enumerate(list(week_sections.keys())):
  propers_sections = get_mass_by_sections(week_sections[day], possible_sections)
    
  propers = create_json_mass_propers(propers_sections)

  lent_propers[f"week-{file_path[-6:-4]}"][weekdays[j]] = propers



# Weeks 1..5

file_paths = []

for i in range(1, 6):
  file_path = f"../../_old/QrmSem0{i}.htm"
  file_paths.append(file_path)


# file_paths = [
#   '../../_old/QrmSem00.htm'
# ]
weekdays = ['1', '1', '1', '1', '2', 
            '3', '4', '5', '6', '7']

for i, file_path in enumerate(file_paths):
  week_sections = extract_sections(file_path)

  # print(week_sections.keys())
  # print(week_sections['Quarta-feira de Cinzas'])

  for j, day in enumerate(list(week_sections.keys())):
    # print(f"{j} {day}")
    if j in [1, 2, 3]:
      continue

    propers_sections = get_mass_by_sections(week_sections[day], possible_sections)
    
    # print(propers_sections.keys())

    propers = create_json_mass_propers(propers_sections)

    lent_propers[f"week-{file_path[-6:-4]}"][weekdays[j]] = propers
  

# Holy Week: Sunday. Missing: entrance.

file_path = '../../_old/QrmSemSS.htm'

week_sections = extract_sections(file_path)
week_keys = list(week_sections.keys())

propers_sections = get_mass_by_sections(week_sections[week_keys[4]], possible_sections)
propers = create_json_mass_propers(propers_sections)
lent_propers[f"week-holy"]['1'] = propers
  
# Holy Week: week days.

file_path = '../../_old/QrmSemSS.htm'
weekdays = ['2', '3', '4', '5', '6', '7']

week_sections = extract_sections(file_path)
week_keys = list(week_sections.keys())[8:]

for j, day in enumerate(week_keys):

  propers_sections = get_mass_by_sections(week_sections[day], possible_sections)
  propers = create_json_mass_propers(propers_sections)

  lent_propers[f"week-holy"][weekdays[j]] = propers


# for week in lent_propers.keys():
#   print(week)
#   for day in lent_propers[week]:
#     print(day)
#     propers_keys = lent_propers[week][day].keys()
#     print(propers_keys)
    # for proper_type in propers_keys:
    #   print(proper_type)
    #   print(lent_propers[week][day][proper_type])
  

# Adding propers to JSON's readings file

output_file_path = '../../_new/pt/lent.json'

# Open file and load its contents as a Python dictionary
with open(output_file_path, 'r', encoding='utf-8') as file:
  lent_readings = json.load(file)['readings']

lent = {
  'propers': lent_propers,
  'readings': lent_readings
}

with open(output_file_path, 'w', encoding='utf-8') as file:
  json.dump(lent, file, ensure_ascii=False, indent=4)


