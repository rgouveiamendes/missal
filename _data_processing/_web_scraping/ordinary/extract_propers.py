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

def create_json_mass_propers(propers_sections):

  propers = {}

  for key in list(propers_sections.keys()):

    data_from_title = re.split(' - | – ', key)
    name = data_from_title[0].title()

    if 'Ou: ' in key:
      reference = ' '.join(key.split(' ')[1:])
    else:
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
    elif 'Ou: ' in name:
      proper_type = 'alt-communion'
    elif 'Depois' in name:
      proper_type = 'post-communion'
    
    proper_data['reference'] = reference
    proper_data['text'] = section[0]

    if proper_type != None:
      propers[proper_type] = proper_data
    else:
      print('Proper type not recognized')

  return propers


ordinary_propers = defaultdict(recursive_defaultdict)

possible_sections = [
    "ANTÍFONA DE ENTRADA",
    "ORAÇÃO COLECTA",
    "ORAÇÃO SOBRE AS OBLATAS",
    "ANTÍFONA DA COMUNHÃO",
    "ORAÇÃO DEPOIS DA COMUNHÃO",
    "Ou: "
]

for i in range(1, 35):
  if i < 10:
    file_path = f"../../_old/TCSemana0{i}.htm"
  else:
    file_path = f"../../_old/TCSemana{i}.htm"
  week_sections = extract_sections(file_path)

  propers_key = list(week_sections.keys())[0]
  propers_sections = get_mass_by_sections(week_sections[propers_key], possible_sections)

  propers = create_json_mass_propers(propers_sections)

  ordinary_propers[f"week-{i}"] = propers

print(repr(ordinary_propers.keys()))
print(repr(ordinary_propers['week-1'].keys()))
print(repr(ordinary_propers['week-1']['entrance']))
print(repr(ordinary_propers['week-1']['collect']))
print(repr(ordinary_propers['week-1']['offerings']))
print(repr(ordinary_propers['week-1']['communion']))
if 'alt-communion' in ordinary_propers['week-1']:
  print(repr(ordinary_propers['week-1']['alt-communion']))
print(repr(ordinary_propers['week-1']['post-communion']))