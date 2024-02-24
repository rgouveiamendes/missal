from collections import defaultdict
from bs4 import BeautifulSoup
import re
import json

def extract_sections(file_path):
  with open(file_path, 'r', encoding='utf-8') as file:
    soup = BeautifulSoup(file, 'html.parser')

    was_div = False
    first_div = True
    current_gospel = ''

    masses_raw_text = {}
    for element in soup.body.find_all():
      if element.get_text() == '\xa0':
        continue

      if element.name == 'div':
        if was_div == False and first_div == True:
          first_div = False
          continue

        if was_div == False:
          current_gospel = ''
        was_div = True
        current_gospel += ' ' + element.get_text()
      elif element.name == 'p':
        if was_div == True:
          current_gospel = re.sub(r"\n", ' ', current_gospel.strip())
          current_gospel = re.sub(r"\xa0", '', current_gospel)
          masses_raw_text[current_gospel] = []
        if current_gospel != '':
          pattern = r"\xa0| *Palavra da salvação.* *$| *\| Credo \| Latim *\||\(Forma breve\)"
          text = re.sub(r"\n", ' ', element.get_text())
          text = re.sub(pattern, '', text)
          if text != '':
            masses_raw_text[current_gospel].append(text)
        was_div = False
  
  return masses_raw_text


output_file_path = '../../_new/pt/lent.json'
with open(output_file_path, 'r', encoding='utf-8') as file:
  lent = json.load(file)

lent['readings']['week-holy']['palm-sunday']['procession-gospel'] = {}
palm_sunday_proc_gospel = lent['readings']['week-holy']['palm-sunday']['procession-gospel']

file_path = "../../_old/QrmSemSS.htm"
masses_raw_text = extract_sections(file_path)
cycles = ['A', 'C']

# Extraction gospel for Procession or Solemn Entry for
#                Year A and Year C

palm_procession_keys = list(masses_raw_text.keys())[1:5:2]

# print(palm_procession_keys)

for i, gospel_key in enumerate(palm_procession_keys):
  gospel_raw = masses_raw_text[gospel_key]

  reference = re.split(' - | – ', gospel_raw[0])
  reference = " - ".join(reference[1:3]).strip()

  gospel = {}
  gospel['cycle'] = cycles[i]
  gospel['reference'] = reference
  gospel['announcement'] = gospel_raw[1]
  gospel['text']= gospel_raw[2]

  palm_sunday_proc_gospel[cycles[i]] = gospel

  # print(gospel)
  # print("\n")

# Extraction gospel for Procession or Solemn Entry for
#                Year B
# Having a gospel and alternative gospel


palm_procession_b = list(masses_raw_text.keys())[2]
gospel_raw = masses_raw_text[palm_procession_b]
# print(gospel_raw)

reference = re.split(' - | – ', gospel_raw[0])
reference = " - ".join(reference[1:3]).strip().replace(' (Ou)', '')

gospel = {}
gospel['reference'] = reference
gospel['announcement'] = gospel_raw[1]
gospel['text']= gospel_raw[2]

palm_sunday_proc_gospel['B'] = []
palm_sunday_proc_gospel['B'].append(gospel)

# print(gospel)

reference = re.split('Ou: ', gospel_raw[4])
reference = reference[1].strip()

alt_gospel = {}
alt_gospel['reference'] = reference
alt_gospel['announcement'] = gospel_raw[5]
alt_gospel['text']= gospel_raw[6]

palm_sunday_proc_gospel['B'].append(alt_gospel)
# print(alt_gospel)


with open(output_file_path, 'w', encoding='utf-8') as file:
  json.dump(lent, file, ensure_ascii=False, indent=4)
