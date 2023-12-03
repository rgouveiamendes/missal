

//      Variáveis do dia
var diadehoje = localStorage.getItem("diadehoje");
var diadehojeMS=localStorage.getItem("diadehojeMS");
var diaMS0    = localStorage.getItem("diaMS0");         //  Dia de hoje, em MS
var diaMS     = localStorage.getItem("diaMS");          //  Dia novo, em MS
var dia       = localStorage.getItem("dia");            //  Dia
var DiaNovo   = localStorage.getItem("DiaNovo"); 
var diatimeMS = localStorage.getItem("diatimeMS");
//      Variáveis da semana
var feira2L   = localStorage.getItem("feira2L");        //  Dia da semana
var feira9L   = localStorage.getItem("feira9L");        //  Dia da semana, por extenso
//      Variáveis do mês
var mes       = localStorage.getItem("mes");            //  Mês, 2 dígitos
var mes3L     = localStorage.getItem("mes3L");          //  Mês, 3 letras
var mes9L     = localStorage.getItem("mes9L");          //  Mês, por extenso
//      Variáveis do ano
var ano       = localStorage.getItem("ano");            //  Ano
var AnoNovo   = localStorage.getItem("AnoNovo");        //  AnoNovo
var datatotal = localStorage.getItem("datatotal");      //  Dia da semana, dia do mês, mês e ano
var amd       = localStorage.getItem("amd");            //  Ano mes dia
var semanasano= localStorage.getItem("semanasano");     //  Semanas do Ano
//      Variáveis dos Tempos Litúrgicos
var cd        = localStorage.getItem("cd");             //  Ciclo Dominical
var cfl       = localStorage.getItem("cfl");            //  Ciclo ferial letra
var cfn       = localStorage.getItem("cfn");            //  Ciclo ferial número
var sano      = localStorage.getItem("sano");           //  Link da semana do ano
var semtempo  = localStorage.getItem("semtempo");       //  Semana do ano
var semtempoa = localStorage.getItem("semtempoa");      //  Semana do ano
var TL        = localStorage.getItem("TL");             //  Tempo Litúrgico
var TLc       = localStorage.getItem("TLc");            //  Semana + tempo L
var lsem      = localStorage.getItem("lsem");           //  Link da Semana do Tempo litúrgico
var tempo     = localStorage.getItem("tempo");          //  Tempo litúrgico
var tempox    = localStorage.getItem("tempox");         //  Tempo litúrgico
var SemanasAno= localStorage.getItem("SemanasAno");     //  Semana do ano
//      Variáveis do Tempo dos Santos
var dm        = localStorage.getItem("dm");             //  dia + mes3L
var Lmes      = localStorage.getItem("Lmes");           //  Link do mês
var Lmesdia   = localStorage.getItem("Lmesdia");        //  Link do mês + dia
var LmesdiaL1 = localStorage.getItem("LmesdiaL1");      //  Link do mês + dia
var TSdm      = localStorage.getItem("TSdm");           //  Dia do ano (Tempo dos Santos)
var ora       = localStorage.getItem("ora");            //  Orações
var soc       = localStorage.getItem("soc");            //  "(Não tem - só Oração Colecta)"
//      Variáveis da Missa Marcada
var MM        = localStorage.getItem("MM");             //  Missa Marcada
var LMM       = localStorage.getItem("LMM");            //  Link da Missa Marcada
var LMML      = localStorage.getItem("LMML");           //  Link das Leituras da Missa Marcada
var dado      = localStorage.getItem("dado");           //  da / do