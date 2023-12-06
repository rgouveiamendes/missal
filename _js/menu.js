
//function menos() {diaMS = diaMS-1;   }
//function mais()  {diaMS = diaMS-1+2; }



function reset() {diaMS = diaMS0; dia = diadehoje.getDate(); if (dia <10) {dia="0"+dia};}
function limpa() {
//datatotal = datatotal;      //  Dia da semana, dia do mês, mês e ano
amd       =""; //  Ano mes dia
//      Variáveis dos Tempos Litúrgicos
cd        =""; //  Ciclo Dominical
cfl       =""; //  Ciclo ferial letra
cfn       =""; //  Ciclo ferial número
sano      =""; //  Link da semana do ano
semtempo  =""; //  Semana do ano
semtempoa =""; //  Semana do ano
lsem      =""; //  Link da Semana do Tempo litúrgico
tempo     =""; //  Tempo litúrgico
tempox    =""; //  Tempo litúrgico
SemanasAno=""; //  Semana do ano
TLs       =""; //  Semana do tempo
dado      ="da"; // da / do
TLc       ="";
//      Variáveis do Tempo dos Santos
dm        =""; //  dia + mes3L
Lmes      =""; //  Link do mês
Lmesdia   =""; //  Link do mês + dia
LmesdiaL1 =""; //  Link do mês + dia
TSdm      =""; //  Dia do ano (Tempo dos Santos)
ora       =""; //  Orações
}

function update(){ //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

diatimeMS = diaMS*86400000; 
diatimeMS = diatimeMS.toFixed();
novadata = new Date();
novadata.setTime(diatimeMS);               
// DIA XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 
dia = novadata.getDate();  if (dia <10) {dia="0"+dia}; 
// SEMANA XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
const weeks = ["Do","Se","Te","Qa","Qi","Sx","Sa"];
feira2L = weeks[novadata.getDay()];    
const diaferia = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
        document.getElementById("TLds").innerHTML = feira2L;
        document.getElementById("TLdado").innerHTML = dado;
feira9L = diaferia[novadata.getDay()];               
// MES  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
mes = novadata.getMonth(); mes=1+mes; if (mes <10) {mes="0"+mes};
const meses3L = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];  //Atribuir nomes aos meses
mes3L = meses3L[novadata.getMonth()];
const meses9L = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
mes9L = meses9L[novadata.getMonth()];               
// ANO  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
ano = novadata.getFullYear();                       
//COMBINAÇÕES XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
datatotal = feira9L+", "+dia+" de "+mes9L+" de "+ano;
        document.getElementById("Menu-1").innerHTML = datatotal;
        document.getElementById("Menu-1").style.color = "coral";
if (diaMS == diaMS0){
        document.getElementById("Menu-1").innerHTML = datatotal;
        document.getElementById("Menu-1").style.color = "#66ff00"} 
aamd = ano+"-"+mes3L+"-"+dia;                   // D05
dma = dia+"-"+mes+"-"+ano;                      // D06
dm9La = dia+" de "+mes9L+" de "+ano;            // D06
dm = dia + mes3L;
        document.getElementById("TS2").innerHTML = dm.slice(0,2)+" "+dm.slice(2,6) ;
amd = ano+"-"+mes+"-"+dia;                      // em formato 2023-10-28
// VER DIA E SEMANA DO ANO XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
AN = ano + "-01-01";
AnoNovo = new Date(AN);
DiaNovo= AnoNovo.getTime()/86400000;
diasdoano = Number(diaMS) - DiaNovo; 
diasdoano = 1 + Number(diasdoano.toFixed())
if (ano == "2023"){semanasano = ( 3 + Number(diasdoano))/7;}// +3 atrasa um dia da semana??
if (ano == "2024"){semanasano = ( 4 + Number(diasdoano))/7;}// +4 em 2024
semanasano =  Number(semanasano.toFixed());


//  SEMANAS DO ANO + TEMPOS LITÚRGICOS XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
if (amd >= "2023-01-01" && amd < "2023-12-03") {cd = "A"}; //cd = "A";
if (amd >= "2023-12-03" && amd < "2024-12-01") {cd = "B";} ;
if (amd >= "2024-12-01" && amd < "2025-12-01") {cd = "C";} ;
if (amd >= "2023-01-01" && amd <= "2023-12-31") {cfl = "A1"; cfn = "I";}
if (amd >= "2024-01-01" && amd <= "2024-12-31") {cfl = "A2"; cfn = "II";}   //cfl="A1"; cfn="I";
if (amd >= "2025-01-01" && amd <= "2025-12-31") {cfl = "A1"; cfn = "I";}

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// TEMPOS a partir de 2023 XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//verdiasdoano();
        document.getElementById("TL6").innerHTML = "( Ciclo Festivo: " + cd + " - ";
        document.getElementById("TL7").innerHTML = "Ciclo Ferial: " + cfn + " )";
        document.getElementById("SA").innerHTML = semanasano;   //semanas.slice(4, 6);



// TEMPO COMUM XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  TEMPO COMUM
if (amd >= "2023-06-11" && amd <="2023-12-02"){         // TC do ano 2023 (2ª parte)
TL="TC";        tempox = "sem. Tempo Comum ";        
semtempo= semanasano-14; if (semtempo <10){semtempo="0"+semtempo};
semtempoa= semanasano-14+"ª";
sano = "7TC"+semtempo+".html#TCSem"+semtempo;   // Semana do tempo
lsem = sano + feira2L + "L1" + cfl ;           // Leituras da féria- Se é TEMPO COMUM: TCSem33SeL1A1 TCSem34QiL1A1
if (TL == "TC" && feira2L == "Do") {lsem = sano + "Dom" + cd}  //E Se é Domingo  TCSem34Leituras TCSem30DomA  
}

//console.log("lsem: " + lsem);



// TEMPO DO ADVENTO XXXXXXXXXXXXXXXXXXX TEMPO ADVENTO
if (amd >= "2023-12-03" && amd <"2023-12-25"){          // TA do ano 2023
TL="TA";        tempox = "do Advento";
semtempo= semanasano-48;
semtempoa=semanasano-48 +"ª semana"; 
sano = "3TA"+semtempo+".html#AdvSem0"+semtempo+feira2L;// Semana do tempo 3TA1.html#AdvSem01Se 
lsem = sano+"Leituras";              // Leituras da féria:     AdvSem01Se  AdvSem01SeLeituras
if (TL == "TA" && feira2L == "Do") { lsem = sano+"Leituras"+cd}     //E Se é Domingo   AdvSem01DoLeiturasA
sano = "3TA"+semtempo+".html#AdvSem0"+semtempo+feira2L;// Semana do tempo 3TA1.html#AdvSem01Se AdvSem01DoLeiturasA     
}             



// TEMPO DO NATAL XXXXXXXXXXXXXXXXXXXXXXX TEMPO DO NATAL
if (amd > "2023-12-24" && amd <= "2024-01-09"){         // TN do ano 2023
TL="TN";         tempox = "Tempo do Natal";
dado="do"
        document.getElementById("TLdado").innerHTML = dado;
semtempo= "";
sano = "4TN.html#"+dm;                          // Semana do tempo Natal        
lsem = sano + feira2L;                          // Leituras da féria
lsemLeituras = sano + feira2L+"Leituras";     // Se é Advento:  AdvSem01Se  AdvSem01SeLeituras
}



// TEMPO COMUM XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  TEMPO COMUM
if (amd >= "2024-01-09" && amd < "2024-02-14"){         // TC do ano 2024 (1ª parte)
TL="TC";        tempox = "sem. Tempo Comum ";   //verdiasdoano();
semtempo= semanasano-1; if (semtempo <10){semtempo="0"+semtempo};
semtempoa = semanasano-1 + "ª" ;
sano = "7TC"+semtempo+".html#TCSem"+semtempo;   // Semana do tempo
lsem = sano + feira2L + "L1" + cfl ;           // Leituras da féria- Se é TEMPO COMUM: TCSem33SeL1A1 TCSem34QiL1A1
if (TL == "TC" && feira2L == "Do") {lsem = sano + "Dom" + cd}  //E Se é Domingo  TCSem34Leituras TCSem30DomA  
}





// TEMPO DA QUARESMA XXXXXXXXXXXXXXXXXXXXXXX DA QUARESMA
if (amd > "2024-02-17" && amd < "2024-03-31") { // Se é TEMPO DA QUARESMA
TL="TQ";          tempox = "sem. da Quaresma";
semtempo = semanasano-7;
semtempoa = semanasano-7 +"ª";            
sano = "5TQ"+semtempo+".html#QrmSem0"+semtempo;// Semana do tempo 3TA1.html#AdvSem01Se  
lsem = sano + feira2L + "Leituras";          // Leituras da féria- Se é TEMPO COMUM:  TCSem33SeL1A1 TCSem34QiL1A1
if (TL == "TQ" && feira2L == "Do"){ lsem = sano + feira2L + "Leituras" + cd;}    //E Se é Domingo   AdvSem01DoLeiturasA
}



// TEMPO DA PÁSCOA GENÉRICO XXXXXXXXXXXXXXXXXXXXXXX DA PÁSCOA
if (amd > "2024-03-30" && amd < "2024-05-20") {  // Se é TEMPO PASCAL
TL="TP";              tempox = "sem. do Tempo Pascal";
semtempo = semanasano-13;
semtempoa = semanasano-13 +"ª";};       



// TEMPO COMUM XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  TEMPO COMUM
if (amd > "2024-05-18" && amd < "2024-12-01") {         // TC do ano 2024 (2ª parte)
TL="TC";        tempox = "sem. Tempo Comum ";        
semtempo = semanasano-14; 
semtempoa = semanasano-14 +"ª"; 
sano = "7TC"+semtempo+".html#TCSem"+semtempo;   // Semana do tempo
lsem = sano + feira2L + "L1" + cfl ;           // Leituras da féria- Se é TEMPO COMUM: TCSem33SeL1A1 TCSem34QiL1A1
if (TL == "TC" && feira2L == "Do") {lsem = sano + "Dom" + cd}  //E Se é Domingo  TCSem34Leituras TCSem30DomA  }; 
}

// TEMPO DO ADVENTO XXXXXXXXXXXXXXXXXXX TEMPO ADVENTO
if (amd >= "2024-12-01" && amd < "2024-12-25") {
TL="TA";        tempox = "do Advento";
semtempo= semanasano-48;
semtempoa=semanasano-48 +"ª semana";
sano = "3TA"+semtempo+".html#AdvSem0"+semtempo+feira2L;// Semana do tempo 3TA1.html#AdvSem01Se 
lsem = sano+"Leituras";              // Leituras da féria:     AdvSem01Se  AdvSem01SeLeituras
if (TL == "TA" && feira2L == "Do") { lsem = sano+"Leituras"+cd}     //E Se é Domingo   AdvSem01DoLeiturasA
sano = "3TA"+semtempo+".html#AdvSem0"+semtempo+feira2L;// Semana do tempo 3TA1.html#AdvSem01Se AdvSem01DoLeiturasA     
}             


// TEMPO DO NATAL XXXXXXXXXXXXXXXXXXXXXXX TEMPO DO NATAL
if (amd > "2024-12-24" && amd <= "2024-12-31") {// Se é TEMPO DO Natal 2024
TL="TN";         tempox = "Tempo do Natal";
dado="do"
        document.getElementById("TLdado").innerHTML = dado;
semtempo= "";
sano = "4TN.html#"+dm;                          // Semana do tempo Natal        
lsem = sano + feira2L;                          // Leituras da féria
lsemLeituras = sano + feira2L+"Leituras";     // Se é Advento:  AdvSem01Se  AdvSem01SeLeituras
AN = ano + "-01-01";
AnoNovo = new Date(AN);
DiaNovo= AnoNovo.getTime()/86400000;
AnoNovo24 = new Date("2024-01-01");              // Início das semanas de 2024
AnoNovo24MS = AnoNovo24.getTime()/86400000;
}



// Cor do TEMPO   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        TLc = ' '+semtempoa+' '+tempox+' ';
        document.getElementById("TLds").style.display = "inline";
        document.getElementById("TLds").innerHTML = feira2L;
        document.getElementById("TLdado").style.display = "inline";
        document.getElementById("TLdado").innerHTML = dado;

// EXCEPÇÕES À REGRA 
if (amd == "2024-02-14"){              // Se é 4ª-F de cinzas
        TL="TQ";
        document.getElementById("TLds").style.display = "none";
        document.getElementById("TLdado").style.display = "none";
        TLc="Quarta-feira de cinzas";};
if (amd > "2024-02-14" && amd < "2024-02-18"){  // Se é depois de 4ª-F de cinzas
        TL="TQ";
        document.getElementById("TLds").innerHTML = feira2L;
        document.getElementById("TLdado").style.display = "none";
        TLc="depois de cinzas";};

        document.getElementById("TLst").style.color ="white";
        document.getElementById("TLst").innerHTML =TLc;

if (TL == "TA") {document.getElementById("TLst").style.backgroundColor ="#c800c8";} 
if (TL == "TN") {document.getElementById("TLst").style.backgroundColor ="#00CCFF";}
if (TL == "TQ") {document.getElementById("TLst").style.backgroundColor ="#ff00ff";} 
if (TL == "TC") {document.getElementById("TLst").style.backgroundColor ="green";}
if (TL == "TP") {document.getElementById("TLst").style.backgroundColor ="#FF6600";}


//console.log("Semana do ano: " + semanasano + "/cfn: " + cfn);



// GUARDAR VARIÁVEIS XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX GUARDAR VARIÁVEIS
//      Variáveis do dia
localStorage.setItem("diaMS", diaMS);
localStorage.setItem("diatimeMS", diatimeMS);
localStorage.setItem("dia", dia);
//      Variáveis da semana
localStorage.setItem("feira2L", feira2L);
localStorage.setItem("feira9L", feira9L);
localStorage.setItem("semanasano", semanasano);
//      Variáveis do mês
localStorage.setItem("mes9L", mes9L);
//      Variáveis do ano
localStorage.setItem("datatotal", datatotal);
localStorage.setItem("ano", ano);
localStorage.setItem("amd", amd);
//      Variáveis dos Tempos Litúrgicos
localStorage.setItem("sano", sano);
localStorage.setItem("TL", TL);
localStorage.setItem("TLc", TLc);
localStorage.setItem("semtempo", semtempo);
localStorage.setItem("semtempoa", semtempoa);
localStorage.setItem("tempox", tempox);
localStorage.setItem("cd", cd);
localStorage.setItem("cfl", cfl);
localStorage.setItem("cfn", cfn);
localStorage.setItem("dado", dado);



// TEMPO DOS SANTOS  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// PARA O TEMPO DOS SANTOS Atribuir o LINK do mês (TSLmes)
Lmes="8TS01.html#jan";                              
if (mes3L=="jan") {Lmes="8TS01.html#jan"}   if (mes3L=="Fev") {Lmes="8TS02.html#fev"}
if (mes3L=="Mar") {Lmes="8TS03.html#mar"}   if (mes3L=="Abr") {Lmes="8TS04.html#abr"}
if (mes3L=="Mai") {Lmes="8TS05.html#mai"}   if (mes3L=="Jun") {Lmes="8TS06.html#jun"}
if (mes3L=="Jul") {Lmes="8TS07.html#jul"}   if (mes3L=="Ago") {Lmes="8TS08.html#ago"}
if (mes3L=="Set") {Lmes="8TS09.html#set"}   if (mes3L=="Out") {Lmes="8TS10.html#Out"}
if (mes3L=="Nov") {Lmes="8TS11.html#nov"}   if (mes3L=="Dez") {Lmes="8TS12.html#dez"}
Lmesdia=Lmes+dia;
LmesdiaL1=Lmesdia+"L1";
ora="";
orax=""; 
soc="";
TSdm= "";
if (dm == "01Jan") {TSdm= " Solenidade de Santa Maria, Mãe de Deus"}
if (dm == "02Jan") {TSdm= " S. Basílio Magno e S. Gregório Nazianzeno, bispos e doutores da Igreja"}
if (dm == "03Jan") {TSdm= " Santíssimo Nome de Jesus"}
if (dm == "07Jan") {TSdm= " S. Raimundo de Penhaforte, presbítero"}
if (dm == "10Jan") {TSdm= " B. Gonçalo de Amarante, presbítero"; ora = "Ac0000"};
if (dm == "13Jan") {TSdm= " S. Hilário, bispo e doutor da Igreja"}
if (dm == "17Jan") {TSdm= " S. Antão, abade"}
if (dm == "20Jan") {TSdm= " S. Fabião, papa e mártir / S. Sebastião, mártir"; ora = "xcxxxx";}
if (dm == "21Jan") {TSdm= " S. Inês, virgem e mártir"; ora = "xcxxxx";};
if (dm == "22Jan") {TSdm= " S. Vicente, diácono e mártir"; ora = "xcxxxx";};
if (dm == "24Jan") {TSdm= " S. Francisco de Sales, bispo e doutor da Igreja"}
if (dm == "25Jan") {TSdm= " Conversão de S. Paulo, apóstolo (Festa)"}
if (dm == "26Jan") {TSdm= " S. Timóteo e S. Tito, bispos"}
if (dm == "27Jan") {TSdm= " S. Ângela Merici, virgem"; ora = "xcxxxx";}
if (dm == "28Jan") {TSdm= " S. Tomás de Aquino, presbítero e doutor da Igreja"; ora = "xcxxxx";};
if (dm == "31Jan") {TSdm= " S. João Bosco, presbítero"; ora = "xcxxxx";};

if (dm == "02Fev") {TSdm= " Apresentação do Senhor (Festa)"}
if (dm == "03Fev") {TSdm= " S. Brás, bispo e mártir / S. Ansgário (Óscar), bispo"; ora = "xcxxxx";}
if (dm == "04Fev") {TSdm= " S. João de Brito, presbítero e mártir"}
if (dm == "05Fev") {TSdm= " S. Águeda, virgem e mártir"; ora = "xcxxxx";};
if (dm == "06Fev") {TSdm= " Ss. Paulo Miki e Companheiros, mártires"}
if (dm == "07Fev") {TSdm= " As Cinco Chagas do Senhor (Festa)"}
if (dm == "08Fev") {TSdm= " S. Jerónimo Emiliano / S. Josefina Bakhita, virgem"; ora = "xcxxxx";}
if (dm == "10Fev") {TSdm= " S. Escolástica, virgem"; ora = "xcxxxx";};
if (dm == "11Fev") {TSdm= " Nossa Senhora de Lourdes"}
if (dm == "14Fev") {TSdm= " S. Cirilo, monge, e S. Metódio, bispo, Padroeiros da Europa (Festa) / Na Prelatura do Opus Dei: Nossa Senhora, Mãe do Amor Formoso"}
if (dm == "17Fev") {TSdm= " Os Sete Santos Fundadores da Ordem dos Servos de Maria (Servitas)"; ora = "xcxxxx";};
if (dm == "18Fev") {TSdm= " S. Teotónio, presbítero"}
if (dm == "20Fev") {TSdm= " SS. Francisco e Jacinta Marto"}
if (dm == "21Fev") {TSdm= " S. Pedro Damião, bispo e doutor da Igreja"; ora = "xcxxxx";};
if (dm == "22Fev") {TSdm= " Cadeira de S. Pedro, apóstolo (Festa)"}
if (dm == "23Fev") {TSdm= " S. Policarpo, bispo e mártir"}

if (dm == "04Mar") {TSdm= " S. Casimiro"; ora = "xcxxxx";};
if (dm == "07Mar") {TSdm= " S. Perpétua e S. Felicidade, mártires "}
if (dm == "08Mar") {TSdm= " S. João de Deus, religioso"}
if (dm == "09Mar") {TSdm= " S. Francisca Romana, religiosa(Só Or. Colecta)"}
if (dm == "17Mar") {TSdm= " S. Patrício, bispo(Só Or. Colecta)"}
if (dm == "18Mar") {TSdm= " S. Cirilo de Jerusalém, bispo e doutor da Igreja"; ora = "xcxxxx";};
if (dm == "19Mar") {TSdm= " Solenidade de S. José, Esposo da Virgem Santa Maria"}
if (dm == "23Mar") {TSdm= " S. Turíbio de Mongrovejo, bispo"; ora = "xcxxxx";};
if (dm == "25Mar") {TSdm= " Solenidade da Anunciação do Senhor"}

if (dm == "02Abr") {TSdm= " S. Francisco de Paula, eremita"; ora = "xcxxxx";};
if (dm == "04Abr") {TSdm= " S. Isidoro, bispo e doutor da Igreja(Só Or. Colecta)"}
if (dm == "05Abr") {TSdm= " S. Vicente Ferrer, presbítero(Só Or. Colecta)"}
if (dm == "07Abr") {TSdm= " S. João Baptista de la Salle, presbítero(Só Or. Colecta)"}
if (dm == "11Abr") {TSdm= " S. Estanislau, bispo e mártir"; ora = "xcxxxx";};
if (dm == "13Abr") {TSdm= " S. Martinho I, papa e mártir"; ora = "xcxxxx";};
if (dm == "21Abr") {TSdm= " S. Anselmo, bispo e doutor da Igreja"; ora = "xcxxxx";};
if (dm == "23Abr") {TSdm= " S. Jorge, mártir / S. Adalberto, bispo e mártir"; ora = "xcxxxx";}
if (dm == "24Abr") {TSdm= " S. Fiel de Sigmaringa, presbítero e mártir"; ora = "xcxxxx";};
if (dm == "25Abr") {TSdm= " S. Marcos, evangelista (Festa)"}
if (dm == "28Abr") {TSdm= " S. Pedro Chanel, presbítero e mártir / S. Luís Maria Grignion de Monfort, presbítero"; ora = "xcxxxx";}
if (dm == "29Abr") {TSdm= " S. Catarina de Sena, virgem e doutora da Igreja, padroeira da Europa (Festa)"}
if (dm == "30Abr") {TSdm= " S. Pio V, papa"; ora = "xcxxxx";};

if (dm == "01Mai") {TSdm= " S. José Operário"}
if (dm == "02Mai") {TSdm= " S. Atanásio, bispo e doutor da Igreja"}
if (dm == "03Mai") {TSdm= " S. Filipe e S. Tiago, apóstolos (Festa)"}
if (dm == "10Mai") {TSdm= " S. João da Ávila, presbítero e doutor da Igeja (inc.)"}
if (dm == "12Mai") {TSdm= " SS. Nereu e Aquileu, mártires (Só Or. Colecta) / B. Álvaro, bispo / B. Joana de Portugal, virgem"}
if (dm == "13Mai") {TSdm= " Nossa Senhora de Fátima (Festa)"}
if (dm == "14Mai") {TSdm= " S. Matias, apóstolo (Festa)"}
if (dm == "18Mai") {TSdm= " S. João I, papa e mártir (Só Or. Colecta) / B. Guadalupe, leiga"}
if (dm == "20Mai") {TSdm= " S. Bernardino de Sena, presbítero"}
if (dm == "21Mai") {TSdm= " S. Cristóvão Magallanes, presbítero e companheiros, mártires"; ora = "xcxxxx";};
if (dm == "22Mai") {TSdm= " S. Rita de Cássia, religiosa"; ora = "xcxxxx";};
if (dm == "25Mai") {TSdm= " S. Beda Venerável, presbítero e doutor da Igreja / S. Gregório VII, papa / S. Maria Madalena de Pazzi, virgem"; ora = "xcxxxx";}
if (dm == "26Mai") {TSdm= " S. Filipe Néri, presbítero"}
if (dm == "29Mai") {TSdm= " S. Paulo VI, papa"; ora = "xcxxxx";};
if (dm == "31Mai") {TSdm= " Visitação de Nossa Senhora (Festa)"}

if (dm == "01Jun") {TSdm= " S. Justino, mártir"}
if (dm == "02Jun") {TSdm= " S. Marcelino e S. Pedro, mártires"; ora = "xcxxxx";};
if (dm == "03Jun") {TSdm= " SS. Carlos Lwanga e Companheiros, mártires"}
if (dm == "05Jun") {TSdm= " S. Bonifácio, bispo e mártir"; ora = "xcxxxx";};
if (dm == "06Jun") {TSdm= " S. Norberto, Bispo(Só Or. Colecta)"}
if (dm == "09Jun") {TSdm= " S. Efrém, diácono e doutor da Igreja (Só Or. Colecta) / B. José de Anchieta, presbítero"}
if (dm == "10Jun") {TSdm= " S. Anjo da Guarda de Portugal"}
if (dm == "11Jun") {TSdm= " S. Barnabé, apóstolo"}
if (dm == "13Jun") {TSdm= " S. António de Lisboa, presbítero e doutor da Igreja, Padroeiro de Portugal (Festa)"}
if (dm == "19Jun") {TSdm= " S. Romualdo, abade"; ora = "xcxxxx";};
if (dm == "20Jun") {TSdm= " BB. Sancha e Mafalda, virgens, e Teresa, religiosa"}
if (dm == "21Jun") {TSdm= " S. Luís Gonzaga, religioso"}
if (dm == "22Jun") {TSdm= " S. João Fisher, bispo, e S. Tomás More, mártires (Só Or. Colecta) / S. Paulino de Nola, bispo"}
if (dm == "24Jun") {TSdm= " Solenidade do Nascimento de S. João Baptista"}
if (dm == "26Jun") {TSdm= " S. Josemaria, presbítero"}
if (dm == "27Jun") {TSdm= " S. Cirilo de Alexandria, bispo e doutor da Igreja"; ora = "xcxxxx";};
if (dm == "28Jun") {TSdm= " S. Ireneu, bispo e mártir"}
if (dm == "29Jun") {TSdm= " Solenidade de S. Pedro e S. Paulo, apóstolos"}
if (dm == "30Jun") {TSdm= " Primeiros Santos Mártires da Igreja de Roma"}

if (dm == "03Jul") {TSdm= " S. Tomé, apóstolo (Festa)"}
if (dm == "04Jul") {TSdm= " S. Isabel de Portugal"}
if (dm == "05Jul") {TSdm= " S. António Maria Zacarias, presbítero(Só Or. Colecta)"}
if (dm == "06Jul") {TSdm= " S. Maria Goretti, virgem e mártir"}
if (dm == "09Jul") {TSdm= " S. Paulina, virgem"}
if (dm == "11Jul") {TSdm= " S. Bento, abade, Padroeiro da Europa (Festa)"}
if (dm == "13Jul") {TSdm= " S. Henrique"; ora = "xcxxxx";};
if (dm == "14Jul") {TSdm= " S. Camilo de Lellis, presbítero"; ora = "xcxxxx";};
if (dm == "15Jul") {TSdm= " S. Boaventura, bispo e doutor da Igreja(Só Or. Colecta)"}
if (dm == "16Jul") {TSdm= " Nossa Senhora do Carmo(Só Or. Colecta)"}
if (dm == "17Jul") {TSdm= " BB. Inácio de Azevedo, presbítero, e Companheiros, mártires"}
if (dm == "18Jul") {TSdm= " B. Bartolomeu dos Mártires, bispo"; ora = "xcxxxx";};
if (dm == "20Jul") {TSdm= " S. Apolinário, bispo e mártir"; ora = "xcxxxx";};
if (dm == "21Jul") {TSdm= " S. Lourenço de Brindes, presbítero e doutor da Igreja(Só Or. Colecta)"}
if (dm == "22Jul") {TSdm= " S. Maria Madalena (Festa)"}
if (dm == "23Jul") {TSdm= " S. Brígida, religiosa, Padroeira da Europa (Festa)"}
if (dm == "24Jul") {TSdm= " S. Charbel Makhluf, presbítero"; ora = "xcxxxx";};
if (dm == "25Jul") {TSdm= " S. Tiago, apóstolo (Festa)"}
if (dm == "26Jul") {TSdm= " S. Joaquim e S. Ana, Pais da Virgem Santa Maria"}
if (dm == "29Jul") {TSdm= " S. Marta"}
if (dm == "30Jul") {TSdm= " S. Pedro Crisólogo, bispo e doutor da Igreja"; ora = "xcxxxx";};
if (dm == "31Jul") {TSdm= " S. Inácio de Loiola, presbítero"}

if (dm == "01Ago") {TSdm= " S. Afonso Maria de Ligório, bispo e doutor da Igreja"}
if (dm == "02Ago") {TSdm= " S. Eusébio de Vercelas, Bispo / S. Pedro Juliano Eymard, presbítero"; ora = "xcxxxx";}
if (dm == "04Ago") {TSdm= " S. João Maria Vianney, presbítero"}
if (dm == "05Ago") {TSdm= " Dedicação da Basílica de Santa Maria Maior"}
if (dm == "06Ago") {TSdm= " Transfiguração do Senhor (Festa)"}
if (dm == "07Ago") {TSdm= " SS. Sisto II, papa, e Companheiros, mártires / S. Caetano, presbítero"; ora = "xcxxxx";}
if (dm == "08Ago") {TSdm= " S. Domingos, presbítero"}
if (dm == "09Ago") {TSdm= " S. Teresa Benedita da Cruz, virgem e mártir, Padroeira da Europa (Festa)"}
if (dm == "10Ago") {TSdm= " S. Lourenço, diácono e mártir (Festa)"}
if (dm == "11Ago") {TSdm= " S. Clara, virgem"; ora = "xcxxxx";};
if (dm == "12Ago") {TSdm= " S. Joana Francisca de Chantal, religiosa"; ora = "xcxxxx";};
if (dm == "13Ago") {TSdm= " S. Ponciano, papa, e S. Hipólito, presbítero, mártires"; ora = "xcxxxx";};
if (dm == "14Ago") {TSdm= " S. Maximiliano Maria Kolbe, presbítero e mártir "}
if (dm == "15Ago") {TSdm= " Solenidade da Assunção da Virgem Santa Maria"}
if (dm == "16Ago") {TSdm= " S. Estêvão da Hungria"; ora = "xcxxxx";};
if (dm == "17Ago") {TSdm= " S. Beatriz da Silva, virgem"}
if (dm == "19Ago") {TSdm= " S. João Eudes, presbítero"}
if (dm == "20Ago") {TSdm= " S. Bernardo, abade e doutor da Igreja"}
if (dm == "21Ago") {TSdm= " S. Pio X, papa"}
if (dm == "22Ago") {TSdm= " Virgem Santa Maria, Rainha"}
if (dm == "23Ago") {TSdm= " S. Rosa de Lima, virgem"}
if (dm == "24Ago") {TSdm= " S. Bartolomeu, apóstolo (Festa)"}
if (dm == "25Ago") {TSdm= " S. Luís de França / S. José de Calasanz, presbítero"; ora = "xcxxxx";}
if (dm == "27Ago") {TSdm= " S. Mónica"}
if (dm == "28Ago") {TSdm= " S. Agostinho, bispo e doutor da Igreja"}
if (dm == "29Ago") {TSdm= " Martírio de S. João Baptista"}

if (dm == "03Set") {TSdm= " S. Gregório Magno, papa e doutor da Igreja"}
if (dm == "08Set") {TSdm= " Natividade da Virgem Santa Maria (Festa)"}
if (dm == "09Set") {TSdm= " S. Pedro Claver, presbítero"}
if (dm == "12Set") {TSdm= " Santíssimo Nome de Maria"}
if (dm == "13Set") {TSdm= " S. João Crisóstomo, bispo e doutor da Igreja"}
if (dm == "14Set") {TSdm= " Exaltação da Santa Cruz (Festa)"}
if (dm == "15Set") {TSdm= " Nossa Senhora das Dores"}
if (dm == "16Set") {TSdm= " S. Cornélio, papa, e S. Cipriano, bispo, mártires"}
if (dm == "17Set") {TSdm= " S. Roberto Belarmino, bispo e doutor da Igreja / S. Hildegarda de Bingen, virgem e doutora da Igreja"; ora = "xcxxxx";};
if (dm == "19Set") {TSdm= " S. Januário, bispo e mártir"; ora = "xcxxxx";};
if (dm == "20Set") {TSdm= " SS. André Kim Taegon, presbítero, Paulo Chang Hasang, e Companheiros, mártires"}
if (dm == "21Set") {TSdm= " S. Mateus, apóstolo e evangelista (Festa)"}
if (dm == "23Set") {TSdm= " S. Pio de Pietrelcina, presbítero"; ora = "xcxxxx";};
if (dm == "26Set") {TSdm= " S. Cosme e S. Damião, mártires"}
if (dm == "27Set") {TSdm= " S. Vicente de Paulo, presbítero"}
if (dm == "28Set") {TSdm= " S. Venceslau, mártir / SS. Lourenço Ruiz e Companheiros, mártires"; ora = "xcxxxx";}
if (dm == "29Set") {TSdm= " S. Miguel, S. Gabriel e S. Rafael, arcanjos (Festa)"}
if (dm == "30Set") {TSdm= " S. Jerónimo, presbítero e doutor da Igreja"}

if (dm == "01Out") {TSdm= " S. Teresa do Menino Jesus, virgem e doutora da Igreja"}
if (dm == "02Out") {TSdm= " Santos Anjos da Guarda"}
if (dm == "03Out") {TSdm= " B. André de Soveral e companheiros, mártires"; ora = "xcxxxx";};
if (dm == "04Out") {TSdm= " S. Francisco de Assis"}
if (dm == "05Out") {TSdm= " S. Faustina Kowalska, virgem / S. Benedito, o Negro, religioso"; ora = "xcxxxx";}
if (dm == "06Out") {TSdm= " S. Bruno, presbítero"; ora = "xcxxxx";};
if (dm == "07Out") {TSdm= " Nossa Senhora do Rosário"}
if (dm == "09Out") {TSdm= " S. Dinis, bispo, e Companheiros, mártires / S. João Leonardo, presbítero"; ora = "xcxxxx";}
if (dm == "11Out") {TSdm= " S. João XXIII, papa"; ora = "xcxxxx";};
if (dm == "12Out") {TSdm= " Nossa Senhora Aparecida e do Pilar"; ora = "xcxxxx";};
if (dm == "14Out") {TSdm= " S. Calisto, papa e mártir"; ora = "xcxxxx";};
if (dm == "15Out") {TSdm= " S. Teresa de Jesus, virgem e doutora da Igreja"}
if (dm == "16Out") {TSdm= " S. Hedviges, religiosa (Só Or. Colecta) / S. Margarida Maria Alacoque, virgem"}
if (dm == "17Out") {TSdm= " S. Inácio de Antioquia, bispo e mártir"}
if (dm == "18Out") {TSdm= " S. Lucas, evangelista (Festa)"}
if (dm == "19Out") {TSdm= " SS. João de Brébeuf e Isaac Jogues, presbíteros, e Companheiros, mártires (Só Or. Colecta) / S. Paulo da Cruz, presbítero"}
if (dm == "22Out") {TSdm= " S. João Paulo II, papa"; ora = "xcxxxx";};
if (dm == "23Out") {TSdm= " S. João de Capistrano, presbítero"; ora = "xcxxxx";};
if (dm == "24Out") {TSdm= " S. António Maria Claret, bispo"; ora = "xcxxxx";};
if (dm == "25Out") {TSdm= " S. Frei Galvão, religioso / No Patriarcado de Lisboa: Aniv. da Dedicação da Igreja Catedral"}
if (dm == "27Out") {TSdm= " B. Gonçalo de Lagos, presbítero"; ora = "xcxxxx";};
if (dm == "28Out") {TSdm= " S. Simão e S. Judas, apóstolos (Festa)"}

if (dm == "01Nov") {TSdm= " Solenidade de Todos os Santos";}
if (dm == "02Nov") {TSdm= " Comemoração de Todos os Fiéis Defuntos"}
if (dm == "03Nov") {TSdm= " S. Martinho de Porres, religioso"; ora = "xcxxxx"; }
if (dm == "04Nov") {TSdm= " S. Carlos Borromeu, bispo"; ora = "ecxocd";}
if (dm == "06Nov") {TSdm= " S. Nuno de Santa Maria, religioso";}
if (dm == "09Nov") {TSdm= " Dedicação da Basílica de Latrão (Festa)";}
if (dm == "10Nov") {TSdm= " S. Leão Magno, papa e doutor da Igreja"}
if (dm == "11Nov") {TSdm= " S. Martinho de Tours, bispo"}
if (dm == "12Nov") {TSdm= " S. Josafat, bispo e mártir"}
if (dm == "15Nov") {TSdm= " S. Alberto Magno, bispo e doutor da Igreja"; ora = "xcxxxx"; }
if (dm == "16Nov") {TSdm= " S. Margarida da Escócia  (Só Or. Colecta) / S. Gertrudes, virgem"}
if (dm == "17Nov") {TSdm= " S. Isabel da Hungria, religiosa"; ora = "xcxxxx"; }
if (dm == "18Nov") {TSdm= " Dedicação das Basílicas de S. Pedro e de S. Paulo, apóstolos"}
if (dm == "19Nov") {TSdm= " S. Roque Gonzales e companheiros, mártires"; ora = "xcxxxx"; }
if (dm == "21Nov") {TSdm= " Apresentação de Nossa Senhora"; ora = "xcxxxx"; }
if (dm == "22Nov") {TSdm= " S. Cecília, virgem e mártir"; ora = "xcxxxx"; }
if (dm == "23Nov") {TSdm= " S. Clemente I, papa e mártir / S. Columbano, abade"; ora = "xcxxxx"; ora = "xcxxxx"; }
if (dm == "24Nov") {TSdm= " Ss. André Dung-Lac e Companheiros, mártires"; ora = "ecxocd";}
if (dm == "25Nov") {TSdm= " S. Catarina Alexandrina, virgem e mártir"; ora = "xcxxxx"; }
if (dm == "30Nov") {TSdm= " S. André, apóstolo (Festa)"}

if (dm == "03Dez") {TSdm= " S. Francisco Xavier, presbítero"}
if (dm == "04Dez") {TSdm= " S. João Damasceno, presbítero e doutor da Igreja"}
if (dm == "05Dez") {TSdm= " S. Frutuoso, S. Martinho de Dume e S. Geraldo, bispos"; ora = "xcxxxx"; }
if (dm == "06Dez") {TSdm= " S. Nicolau, bispo"; ora = "xcxxxx"; }
if (dm == "07Dez") {TSdm= " S. Ambrósio, bispo e doutor da Igreja"; ora = "ecxocd";}
if (dm == "08Dez") {TSdm= " Solenidade da Imaculada Conceição da Virgem Santa Maria, Padroeira de Portugal"}
if (dm == "09Dez") {TSdm= " S. João Diogo Cuauhtlatoatzin"; ora = "xcxxxx"; }
if (dm == "10Dez") {TSdm= " Virgem Santa Maria de Loreto"; ora = "xcxxxx"; }
if (dm == "11Dez") {TSdm= " S. Dâmaso I, papa"; ora = "xcxxxx"; }
if (dm == "12Dez") {TSdm= " Nossa Senhora de Guadalupe, Padroeira da América Latina";}
if (dm == "13Dez") {TSdm= " S. Luzia, virgem e mártir"; ora = "xcxxxx"; }
if (dm == "14Dez") {TSdm= " S. João da Cruz, presbítero e doutor da Igreja";}
if (dm == "17Dez") {TSdm= " Missa do dia 17 de Dezembro"}
if (dm == "18Dez") {TSdm= " Missa do dia 18 de Dezembro"}
if (dm == "19Dez") {TSdm= " Missa do dia 19 de Dezembro"}
if (dm == "20Dez") {TSdm= " Missa do dia 20 de Dezembro"}
if (dm == "21Dez") {TSdm= " Missa do dia 21 de Dezembro / S. Pedro Canísio"; ora = "xcxxxx"; }
if (dm == "22Dez") {TSdm= " Missa do dia 22 de Dezembro"}
if (dm == "23Dez") {TSdm= " Missa do dia 23 de Dezembro / S. João de Kenty, presbítero"; ora = "xcxxxx"; }
if (dm == "24Dez") {TSdm= " Missa do dia 24 de Dezembro"}
if (dm == "25Dez") {TSdm= " Solenidade do Natal do Senhor"}
if (dm == "26Dez") {TSdm= " S. Estêvão, primeiro mártir (Festa)"}
if (dm == "27Dez") {TSdm= " S. João, apóstolo e evangelista (Festa)"}
if (dm == "28Dez") {TSdm= " Santos Inocentes, mártires (Festa)"}
if (dm == "29Dez") {TSdm= " S. Tomás Becket, bispo e mártir"; ora = "xcxxxx"; }
if (dm == "31Dez") {TSdm= " S. Silvestre I, papa"; ora = "xcxxxx"; }

        document.getElementById("TS3").innerHTML = TSdm ;
        document.getElementById("TS3").style.color = "coral";
if (TSdm == "") {
        document.getElementById("TS3").innerHTML = "(Sem Missa para hoje)"; 
        document.getElementById("TS3").style.color = "silver"; }
else {document.getElementById("TS3").innerHTML = TSdm ;}

localStorage.setItem("diaMS", diaMS);
localStorage.setItem("diatimeMS", diatimeMS);
localStorage.setItem("dia", dia);
localStorage.setItem("feira9L", feira9L);
localStorage.setItem("mes3L", mes3L);
localStorage.setItem("mes9L", mes9L);
localStorage.setItem("ano", ano);
localStorage.setItem("datatotal", datatotal);
localStorage.setItem("Lmesdia", Lmesdia);
localStorage.setItem("LmesdiaL1", LmesdiaL1);
localStorage.setItem("lsem", lsem);
localStorage.setItem("dm", dm);
localStorage.setItem("TSdm", TSdm);
localStorage.setItem("ora", ora);
//localStorage.setItem("soc", soc);

// MISSA MARCADA  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    document.getElementById("MM1").innerHTML = MM ;
    document.getElementById("MM1").style.color = "#87cefa";
if (MM == "(Não está Missa marcada)"){
    document.getElementById("MM1").innerHTML = MM ;
    document.getElementById("MM1").style.color = "silver";}
//      Variáveis a Missa Marcada
localStorage.setItem("MM", MM);
localStorage.setItem("LMM", LMM);
LMML1 = LMM+"L1";
localStorage.setItem("LMML1", LMML1);


}