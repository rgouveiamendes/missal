# Lent Parsing Logic

Order:
1. extract_readings.py
2. extract_special_gospels.py
3. extract_palm_procession.py
4. extract_propers.py
5. extract_prefaces.py
6. fix_propers_ends.py

As of right now lent.json is not reproducible with the aforementioned code as an other level manual correction was done on Lent's propers.

Notice in addition:
- For consistency propers\['week-holy']['1'] was manually renamed to propers\['week-holy']['palm-sunday']. If overall consistency is preferable, perhaps this change could be reversed and a similar change could be operated on consistency readings\['week-holy']['palm-sunday'].

- Some sections are currently not included in Lent's JSON file. Namely:

  - Ash-Wednesday: Blessing and Distribution of Ashes.

  - Palm-Sunday: the three possible starts - hymns, propers, antiphons...

  - Chrism-Mass: Renewal of Priestly Promises.

  - Sacred Paschal Triduum - Good Friday: 
    
    - Prayer similar to collect proper.
    - Solemn Intercessions.
    - The Adoration of the Holy Cross.

- Some notices are not being saved anywhere. Namely:

  - Ash-Wednesday: 
    - 'Omite-se o acto penitencial; é substituído pela imposição das cinzas.'
  - Week 3 - Sunday: Logic for preface selection: 

    - 'Prefácios dos Domingos da Quaresma | Latim | (III, quando se lê o Evangelho da Samaritana)

    - Prefácios da Quaresma | Latim | (I ou II, quando se lê outro Evangelho)'
  - Week 3 -  Sunday Year B/C: Possibily of reading Year A readings:

    - 'Em vez das leituras a seguir indicadas, podem utilizar-se as do Ano A, se for mais oportuno.'

  - Week 4 - Sunday: Logic for preface selection.

  - Week 4 - Sunday Year B/C: Possibily of reading Year A readings.

  - Week 5 - Sunday: Logic for preface selection.

  - Week 5 - Sunday Year B/C: Possibily of reading Year A readings.

  - Week 5: Indication of specific prefaces throughout week-days.

  - Holy Week - Palm-Sunday: 
  
      - 'A leitura da Paixão do Senhor faz-se sem círios nem incenso, sem saudação nem signação do livro. É lida pelo diácono ou, na falta dele, pelo próprio sacerdote. Também pode ser lida por leitores, reservando, quanto possível, a parte de Cristo ao sacerdote.' 

  - Holy Week: Indication of specific prefaces throughout week-days.

  - Holy Week - Chrism-Mass:

    - 'Esta Missa, que o Bispo celebra com o seu presbitério e na qual se benzem os Santos Óleos, deve ser manifestação da comunhão dos presbíteros com o seu Bispo. Convém que todos os presbíteros, dentro do possível, nela participem.'

    - 'Não se diz o Credo nem a Oração dos Fiéis.'

    - Indication of specific preface.

  - Sacred Paschal Triduum - Thursday of the Lord's Supper: multiples notices.

  - Sacred Paschal Triduum - Good Friday: multiples notices.

  - Sacred Paschal Triduum - Saturday: no Mass explanation.

 

- Conditional flow for some communion propers. These notices are being saved in communion propers when existent. See for example: 
  - Week 3 - Sunday: 

    - 'Quando se lê o Evangelho da Samaritana: Jo 4, 13-14

    - Quando se lê outro Evangelho: Salmo 83, 4-5'

  - Week 4: Sunday.

  - Week 5: Sunday.

  - Week 5 - Monday.

- Week 5 - Monday: Notice '(No ano C, pode ler-se Jo 8, 12-20)' is being saved on gospel's reference.

- Holy Week has two possible masses for Thursday: Chrim-Mass and Holy Thursday.

- Holy Week: Palm-Sunday: gospel's short form lies inside gospel's long form with different beggining (e.g. [Início da Forma breve: “Naquele tempo,*…”] N       \[Entretanto,] *Jesus foi levado à presença do governador, que lhe perguntou:) and ending signaled with [Fim da Forma breve].

- Sacred Paschal Triduum: gospel's short form lies inside gospel's long form.

- Prayers over the People are entirely missing for each Lent day with the exception of Good Friday's (Holy Week - Friday).
