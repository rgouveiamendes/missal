import re
import json

# input_file_path = '../../_new/pt/ordinary.json'
# output_file_path = '../../_new/pt/ordinary_fixed_ends.json'

# with open(input_file_path, 'r', encoding='utf-8') as file:
#   ordinary = json.load(file)

# ordinary_propers = ordinary['propers']
# ordinary_readings = ordinary['readings']
# ordinary_prefaces = ordinary['readings']

# old_sentence = 'Por Nosso Senhor Jesus Cristo, vosso Filho, que é Deus convosco na unidade do Espírito Santo.'
# new_sentence_a = 'Por nosso Senhor Jesus Cristo, vosso Filho, que é Deus e convosco vive e reina, na unidade do Espírito Santo, por todos os séculos dos séculos.'
# new_sentence_b = 'Por Cristo nosso Senhor.'

# for week_str in ordinary_propers:
#   for proper_type in ordinary_propers[week_str]:
#     text = ordinary_propers[week_str][proper_type]['text']
#     if proper_type == 'collect':
#       ordinary_propers[week_str][proper_type]['text'] = text.replace(old_sentence, new_sentence_a)
#     elif proper_type == 'offerings' or proper_type == 'post-communion':
#       ordinary_propers[week_str][proper_type]['text'] = text.replace(old_sentence, new_sentence_b)

# ordinary = {
#   'prefaces': ordinary_prefaces,
#   'propers': ordinary_propers,
#   'readings': ordinary_readings
# }

# with open(output_file_path, 'w', encoding='utf-8') as file:
#   json.dump(ordinary, file, ensure_ascii=False, indent=4)


# Check against Missal:

output_file_path = '../../_new/pt/ordinary_fixed_ends.json'
with open(output_file_path, 'r', encoding='utf-8') as file:
  ordinary = json.load(file)

ordinary_propers = ordinary['propers']

for week_str in ordinary_propers:
  print(week_str)
  for proper_type in ordinary_propers[week_str]:
    print(proper_type)
    for key in ordinary_propers[week_str][proper_type]:
      print(key)
      print(ordinary_propers[week_str][proper_type][key])