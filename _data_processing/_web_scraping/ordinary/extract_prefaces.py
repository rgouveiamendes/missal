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

  was_h3 = False
  current_section = ''

  prefaces_raw_text = {}
  for element in soup.body.find_all():
    if element.get_text() == '\xa0':
      continue

    if element.name == 'h3':
      if was_h3 == False:
        current_section = ''
      was_h3 = True
      current_section += ' ' + element.get_text()
    elif element.name == 'p':
      if was_h3 == True:
        current_section = re.sub(r"\n|\xa0| *\| *|Top|Latim", '', current_section.strip())
        prefaces_raw_text[current_section] = []
      if current_section != '':
        text = re.sub(r"\n", ' ', element.get_text())
        text = re.sub(r"\xa0| *\| *|Santo, Santo, Santo... *|Latim", '', text)
        prefaces_raw_text[current_section].append(text)
      was_h3 = False

  return prefaces_raw_text

def get_raw_prefaces(prefaces_raw_text, sections):
  raw_prefaces = {}
  for key in list(prefaces_raw_text.keys()):
    if key in sections:
      raw_prefaces[key] = prefaces_raw_text[key]

  return raw_prefaces

def create_json_prefaces(raw_prefaces):

  prefaces = {}

  for i, key in enumerate(list(raw_prefaces), 1):

    section = raw_prefaces[key]
    preface_data = {}

    preface_data['snippet'] = section[0]
    preface_data['text'] = ''.join(section[1:])

    if i < 10:
      prefaces[f"common-{i}"] = preface_data
    else:
      prefaces[f"sundays-{i % 10 + 1}"] = preface_data

  return prefaces


# Extraction of Common Prefaces

ordinary_prefaces = defaultdict(recursive_defaultdict)

possible_sections = [
  'TEMPO COMUM I',
  'TEMPO COMUM II',
  'TEMPO COMUM III',
  'TEMPO COMUM IV',
  'TEMPO COMUM V',
  'TEMPO COMUM VI',
  'TEMPO COMUM VII',
  'TEMPO COMUM VIII',
  'TEMPO COMUM IX',
  'DOMINGOS DO TEMPO COMUM I',
  'DOMINGOS DO TEMPO COMUM II',
  'DOMINGOS DO TEMPO COMUM III',
  'DOMINGOS DO TEMPO COMUM IV',
  'DOMINGOS DO TEMPO COMUM V',
  'DOMINGOS DO TEMPO COMUM VI',
  'DOMINGOS DO TEMPO COMUM VII',
  'DOMINGOS DO TEMPO COMUM VIII',
  'DOMINGOS DO TEMPO COMUM IX',
  'DOMINGOS DO TEMPO COMUM X',
]

file_path = '../../_old/Prefacios_V2.html'
prefaces_raw_text = extract_sections(file_path)
raw_ordinary_prefaces = get_raw_prefaces(prefaces_raw_text, possible_sections)
ordinary_prefaces = create_json_prefaces(raw_ordinary_prefaces)

# print(prefaces_raw_text.keys())
# print(raw_ordinary_prefaces.keys())
print(ordinary_prefaces.keys())

for key in ordinary_prefaces.keys():
  print(key)
  print(ordinary_prefaces[key])
  