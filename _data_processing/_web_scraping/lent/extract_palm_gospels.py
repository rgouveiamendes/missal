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
          current_gospel = re.sub(r"\xa0", '', current_gospel.strip())
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

lent['readings']['week-holy']['palm-sunday']['gospel'] = {}
palm_sunday_gospel = lent['readings']['week-holy']['palm-sunday']['gospel']

file_path = "../../_old/QrmSemSS.htm"
masses_raw_text = extract_sections(file_path)
cycles = ['A', 'B', 'C']

palm_gospel_keys = list(masses_raw_text.keys())[5:8]

for i, gospel_key in enumerate(palm_gospel_keys):
  gospel_raw = masses_raw_text[gospel_key]

  reference = re.split(' - | – ', gospel_raw[0])
  reference = " - ".join(reference[1:3]).strip()

  gospel = {}
  gospel['reference'] = reference
  gospel['snippet'] = gospel_raw[1]
  gospel['text']= gospel_raw[2:]

  palm_sunday_gospel[cycles[i]] = gospel

  # print(palm_sunday_gospel[cycles[i]])
  # print("\n")


with open(output_file_path, 'w', encoding='utf-8') as file:
  json.dump(lent, file, ensure_ascii=False, indent=4)
