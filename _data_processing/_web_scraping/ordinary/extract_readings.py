from collections import defaultdict
from bs4 import BeautifulSoup
import re
import json

def recursive_defaultdict():
  return defaultdict(recursive_defaultdict)

def defaultdict_to_dict(d):
  if isinstance(d, defaultdict):
    # Convert the defaultdict itself to a dict
    d = dict(d)
    # Recursively apply this conversion
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
      if element.get_text() == '\xa0': # Matches a " " chr [code 160])
        continue                       # no-break space

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
          # print(repr(current_mass))
          masses_raw_text[current_mass] = []
        if current_mass != '':
          masses_raw_text[current_mass].append(element.get_text())
          # if len(masses_raw_text[current_mass]) == 1 :
            # print(repr(masses_raw_text[current_mass]))
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


def create_json_mass_readings(reading_idxs, mass_by_section):

  readings = {}

  sections = list(mass_by_section.keys()) 
  # Couldn't this also be passed in as an argument?

  readings_present = []
  for idx in reading_idxs:

    data_from_title = sections[idx].split(' - ')
    name = data_from_title[0].title() # Correct words' casing
    if name.split(' ')[0] == 'Leitura':
      name = name.split(' ')[0].title() + ' ' + name.split(' ')[1].upper() 
      # Couldn't this be done more efficiently?
    reference = ' - '.join(data_from_title[1:])
    # In case data_from_title contains more than one ' - ' substring?

    if reference == '':
      reference = None

    section_content = mass_by_section[sections[idx]]

    reading_data = {}
    reading_type = None

    if 'Leitura' in name:
      reading_type = 'reading-' + name.split(' ')[-1]
      if reading_type in readings_present:
        readings_present.append('alt-' + reading_type)
        reading_type = f"alt-{reading_type}--{reading_type.count('alt-' + reading_type) + 1}"
        # Shouldn't it be ....{reading_present.count('alt-' + reading_type)}....
        # Will this count also readings signalled as, e.g., alt-reading I-1 ?
      else:
        readings_present.append(reading_type)
      reading_data["reference"] = reference
      base_idx = 0
      if section_content[0][0] == '«':
        reading_data['snippet'] = section_content[base_idx]
      else:
        base_idx = -1   # What is the need of this base_idx being set to -1?
      reading_data["announcement"] = section_content[base_idx + 1]
      reading_data['text'] = re.sub(r'(Palavra do Senhor\.)$', '', section_content[base_idx + 2])
      # Why the parenthesis surrounding Palavra do Senhor\. ?
      # ChatGPT:
      # The purpose of the parentheses in the regular expression is to create a capturing group. In this specific case, it captures the entire string "Palavra do Senhor." at the end of the input string ($ asserts the position at the end of the string). This capturing group is not used in the replacement (since the replacement is an empty string), but it could be used if you wanted to refer to the captured text in the replacement string or elsewhere in your code.

      # How does section_content[0 + 2] // section_content[-1 + 2] target p{Palavra do Senhor.} ?
      # It doesn't. It pressuposes, 'Palavra do Senhor.' is included in the text section.
      # Is this a logic that is most of the times applicable? For Terça, Quarta, Quinta Primeira
      # Semana do Advento it is not applicable.

    if 'Evangelho' in name:
      reading_type = 'gospel'
      reading_data['reference'] = reference
      if section_content[0][0] == '«':
        reading_data['snippet'] = section_content[base_idx]
      else:
        base_idx = -1
        # Is there a need for this conditional new assignemnt of base_idx?
      reading_data['snippet'] = section_content[0]
      reading_data['announcement'] = section_content[1]
      reading_data['text'] = re.sub(r"(Palavra da salvação\.)$", "", section_content[2])
      # Again is this substitution required? For Primeira Semana Advento Domingo Ano A 
      # e Quinta-Feira it was not.
    
    if 'Aleluia' in name:
      reading_type = 'aleluia'
      reading_data['reference'] = reference
      reading_data['response'] = ': '.join(section_content[0].split(': ')[1:])
      # In case of extra ': ' beyond that separating response from 'Refrão', right?
      reading_data['text'] = section_content[1]
      # Missing latin text?

    if 'Salmo' in name:
      reading_type = 'psalm'
      reading_data['reference'] = reference

      base_idx = 0
      # if section_content[0][0] == '(':
      #   reading_data['notice'] = section_content[0]
      #   base_idx = 1
      
      reading_data['response'] = ': '.join(section_content[0].split(': ')[1:])

      if section_content[base_idx + 2].split(' ')[0] == 'Ou:':
        reading_data['alt-response'] = ' '.join(section_content[base_idx+2].split(' ')[1:])
        # if len(section_content[base_idx+3:]) % 3 == 1:
        #   print(repr(section_content[base_idx+4::3]))
        #   reading_data['verses'] = section_content[base_idx+4::3]
        # else:
        reading_data['verses'] = section_content[base_idx+3::3]
      else:
        reading_data['verses'] = section_content[base_idx+2::3]
      # Slicing notation [start:stop:step]
     
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

file_paths = [
    "../../_old/TCSemana01.htm",
]

weekdays = ["2", "3", "4", "5", "6", "7", 
            "2-even", "3-even", "4-even",
            "5-even", "6-even", "7-even"]

for i, file_path in enumerate(file_paths):
  masses_raw_text = extract_sections(file_path)
  # print(repr(masses_raw_text.keys()))
  # print(repr(masses_raw_text['I Semana do Tempo Comum']))

  for i, key in enumerate(list(masses_raw_text.keys())[1:]):
    # [1:] == Exclusion of first key in masses_raw_text as the 
    #   first key refers to the initial week page containg its propers
    mass_by_section = get_mass_by_sections(masses_raw_text[key], possible_sections)
    
    # print(f"{repr(mass_by_section.keys())}")
    # print(repr(mass_by_section['SALMO RESPONSORIAL - Salmo 96 (97), 1 e 2b.6 e 7c.9 (R. cf. 7c)']))

    sections = list(mass_by_section.keys())

    keywords = ["EVANGELHO", "LEITURA", "ALELUIA", "SALMO"]
    reading_idxs = [i for i, element in enumerate(sections) if any(word in element for word in keywords)]
    # # CHATGPT: reading_idxs will contain the indices of elements in the sections list where any of the keywords are found.
    # # Is a dictionary an **ordered** collection of key-value pairs, as opposed to a unorderd collection of key-value pairs?

    readings = create_json_mass_readings(reading_idxs, mass_by_section)
    # print(repr(readings.keys()))
    # if 'gospel' in readings:
    #   print(f"{repr(readings['gospel'])}\n")

    ordinary_readings[f'week-{file_path[-6:-4]}'][weekdays[i]] = readings


# print(repr(ordinary_readings.keys()))
# print(repr(ordinary_readings['week-01'].keys()))
# print(repr(ordinary_readings['week-01']['2'].keys()))
# print(repr(ordinary_readings['week-01']['2-even'].keys()))



# Weeks 2.. 

file_paths = [
    "../../_old/TCSemana02.htm",
    "../../_old/TCSemana03.htm",
    "../../_old/TCSemana04.htm",
    "../../_old/TCSemana05.htm",
]

weekdays = ["1", "1", "1", 
            "2", "3", "4", "5", "6", "7", 
            "2-even", "3-even", "4-even",
            "5-even", "6-even", "7-even"]
cycles = ["A", "B", "C"]

for i, file_path in enumerate(file_paths):
  masses_raw_text = extract_sections(file_path)
  # print(repr(masses_raw_text.keys()))
  # print(repr(masses_raw_text['I Semana do Tempo Comum']))

  for i, key in enumerate(list(masses_raw_text.keys())[1:]):
    # [1:] == Exclusion of first key in masses_raw_text as the 
    #   first key refers to the initial week page containg its propers
    mass_by_section = get_mass_by_sections(masses_raw_text[key], possible_sections)
    
    sections = list(mass_by_section.keys())

    keywords = ["EVANGELHO", "LEITURA", "ALELUIA", "SALMO"]
    reading_idxs = [i for i, element in enumerate(sections) if any(word in element for word in keywords)]
    # # CHATGPT: reading_idxs will contain the indices of elements in the sections list where any of the keywords are found.
    # # Is a dictionary an **ordered** collection of key-value pairs, as opposed to a unorderd collection of key-value pairs?

    readings = create_json_mass_readings(reading_idxs, mass_by_section)
    # print(repr(readings.keys()))
    # if 'gospel' in readings:
    #   print(f"{repr(readings['gospel'])}\n")

    if weekdays[i] == '1':
      if ordinary_readings[f'week-{file_path[-6:-4]}'][weekdays[i]] == {}:
        ordinary_readings[f'week-{file_path[-6:-4]}'][weekdays[i]] = []
      # readings['cycle'] = [cycles][i]
      readings = {**{'cycle': cycles[i]}, **readings}
      ordinary_readings[f'week-{file_path[-6:-4]}'][weekdays[i]].append(readings)
    else:
      ordinary_readings[f'week-{file_path[-6:-4]}'][weekdays[i]] = readings

print(repr(ordinary_readings.keys()))
print(repr(ordinary_readings['week-03'].keys()))
# print(repr(ordinary_readings['week-02']['1']))
# print(repr(ordinary_readings['week-02']['2'].keys()))
# print(repr(ordinary_readings['week-02']['2-even'].keys()))

# for sunday in ordinary_readings['week-05']['1']:
#   print(f"{sunday['reading-I']}\n")
#   print(f"{sunday['psalm']}\n")
#   print(f"{sunday['reading-II']}\n")
#   print(f"{sunday['aleluia']}\n")
#   print(f"{sunday['gospel']}\n")

for day in ordinary_readings['week-05']:
  if 'gospel' in ordinary_readings['week-05'][day]:
    print(f"{ordinary_readings['week-05'][day]['reading-I']}\n")
    print(f"{ordinary_readings['week-05'][day]['psalm']}\n")
    print(f"{ordinary_readings['week-05'][day]['aleluia']}\n")
    print(f"{ordinary_readings['week-05'][day]['gospel']}\n")
