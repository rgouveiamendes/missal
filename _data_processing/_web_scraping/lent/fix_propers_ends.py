import re
import json

input_file_path = '../../_new/pt/lent.json'
output_file_path = '../../_new/pt/lent_fixed_ends.json'

with open(input_file_path, 'r', encoding='utf-8') as file:
  lent = json.load(file)

lent_propers = lent['propers']
lent_readings = lent['readings']
lent_prefaces = lent['prefaces']

old_sentence_a = '. Por Nosso Senhor Jesus Cristo, vosso Filho, que é Deus convosco na unidade do Espírito Santo.'
old_sentence_b = '. Ele que é Deus convosco na unidade do Espírito Santo.'
old_sentence_c = ', que é Deus convosco na unidade do Espírito Santo.'

pattern = rf"{old_sentence_a}|{old_sentence_b}|{old_sentence_c}"

new_sentence_a = '. Por nosso Senhor Jesus Cristo, vosso Filho, que é Deus e convosco vive e reina, na unidade do Espírito Santo, por todos os séculos dos séculos.'
new_sentence_b = '. Por Cristo nosso Senhor.'

for week_str in lent_propers:
  for day in lent_propers[week_str]:
    for proper_type in lent_propers[week_str][day]:
      text = lent_propers[week_str][day][proper_type]['text']
      if proper_type == 'collect':
        lent_propers[week_str][day][proper_type]['text'] = re.sub(pattern, new_sentence_a, text)
      elif proper_type == 'offerings' or proper_type == 'post-communion':
        lent_propers[week_str][day][proper_type]['text'] = re.sub(pattern, new_sentence_b, text)

lent = {
  'prefaces': lent_prefaces,
  'propers': lent_propers,
  'readings': lent_readings
}


# for week_str in lent_propers:
#   print(week_str)
#   for day in lent_propers[week_str]:
#     print(day)
#     for proper_type in lent_propers[week_str][day]:
#       print(proper_type)
#       print(lent_propers[week_str][day][proper_type])

with open(input_file_path, 'w', encoding='utf-8') as file:
  json.dump(lent, file, ensure_ascii=False, indent=4)


# Check against Missal:

# output_file_path = '../../_new/pt/lent_fixed_ends.json'
# with open(output_file_path, 'r', encoding='utf-8') as file:
#   lent = json.load(file)

# lent_propers = lent['propers']

# for week_str in lent_propers:
#   print(week_str)
#   for proper_type in lent_propers[week_str]:
#     print(proper_type)
#     for key in lent_propers[week_str][proper_type]:
#       print(key)
#       print(lent_propers[week_str][proper_type][key])