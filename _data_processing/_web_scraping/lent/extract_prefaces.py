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

def get_bold(bolds):
  if bolds:
    bold = ''
    for i in bolds:
      bold += i.get_text()
    return re.sub(r"\n", ' ', bold).strip()
  else:
    return None

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
        prefaces_raw_text[current_section] = {}
        prefaces_raw_text[current_section]['text'] = []
      if current_section != '':
        text = re.sub(r"\n", ' ', element.get_text())
        if 'Santo, Santo, Santo...' in text:
          was_h3 = False
          continue
        bolds = element.select('b')
        prefaces_raw_text[current_section]['bold'] = get_bold(bolds)
        prefaces_raw_text[current_section]['text'].append(text)
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

    preface_data['snippet'] = section['text'][0]
    preface_data['text'] = ''.join(section['text'][1:])
    if section['bold'] != None:
      preface_data['bold'] = ''.join(section['bold'])

    if i < 6:
      prefaces[f"sunday-{i}"] = preface_data
    elif i < 12:
      prefaces[f"lent-{i - 5}"] = preface_data
    elif i < 14:
      prefaces[f"passion-{i - 11}"] = preface_data
    elif i == 14:
      prefaces[f"palm-sunday"] = preface_data
    else:
      prefaces[f"chrism"] = preface_data

  return prefaces


# Extraction of Lent Prefaces

lent_prefaces = defaultdict(recursive_defaultdict)

possible_sections = [
  'I DOMINGO DA QUARESMA',
  'II DOMINGO DA QUARESMA',
  'III DOMINGO DA QUARESMA',
  'IV DOMINGO DA QUARESMA',
  'V DOMINGO DA QUARESMA',
  'QUARESMA I',
  'QUARESMA II',
  'QUARESMA III',
  'QUARESMA IV',
  'QUARESMA V',
  'QUARESMA VI',
  'PAIXÃO DO SENHOR I',
  'PAIXÃO DO SENHOR II',
  'DOMINGO DE RAMOS',
  'MISSA CRISMAL'
]

file_path = '../../_old/Prefacios_V2.html'
prefaces_raw_text = extract_sections(file_path)

raw_lent_prefaces = get_raw_prefaces(prefaces_raw_text, possible_sections)
lent_prefaces = create_json_prefaces(raw_lent_prefaces)

# print(prefaces_raw_text.keys())
# print(raw_lent_prefaces.keys())
# print(lent_prefaces.keys())

# for key in lent_prefaces.keys():
#   print(key)
#   print(lent_prefaces[key])


# Adding prefaces to Lent Time's JSON file

output_file_path = '../../_new/pt/lent.json'

with open(output_file_path, 'r', encoding='utf-8') as file:
  lent = json.load(file)

lent_propers = lent['propers']
lent_readings = lent['readings']

lent = {
  'prefaces': lent_prefaces,
  'propers': lent_propers,
  'readings': lent_readings
}

with open(output_file_path, 'w', encoding='utf-8') as file:
  json.dump(lent, file, ensure_ascii=False, indent=4)
