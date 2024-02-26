import json

ordinary = '../../_new/pt/ordinary.json'
fixed_ends = '../../_new/pt/ordinary_fixed_ends.json'

correct_ordinary = '../../_new/pt/ordinary_provisional.json'

with open(ordinary, 'r', encoding='utf-8') as file:
  prefaces_readings = json.load(file)

with open(fixed_ends, 'r', encoding='utf-8') as file:
  propers = json.load(file)

ordinary = {
  'prefaces': prefaces_readings['prefaces'],
  'propers': propers['propers'],
  'readings': prefaces_readings['readings']
}

with open(correct_ordinary, 'w', encoding='utf-8') as file:
  json.dump(ordinary, file, ensure_ascii=False, indent=4)
