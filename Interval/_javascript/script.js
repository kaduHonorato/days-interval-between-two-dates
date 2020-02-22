// Variáveis criadas a partir de Tags HTML

var dt1 = document.querySelector("#tagDt1"); // Recebe um campo input do tipo data;
var dt2 = document.querySelector("#tagDt2"); // Recebe um campo input do tipo data; 
var tagExibeResultado = document.querySelector("#tagExibeResultado"); // Recebe a TAG p que exibirá o resultado da operação; 

// ================================================

// Variáveis Auxiliares 

var intervaloDias = 0;

// ===============================================

// Eventos Associados às variáveis

dt1.addEventListener("change",MotorOperacaoDatas);
dt2.addEventListener("change",MotorOperacaoDatas);


// ===============================================


Inicio();

// Função padrão de início de código

function Inicio(){

VerificaDadosSalvos();

OperacaoData(dt1,dt2,1,["min","max"]);

}

// ========================================

// Função que verifica os dados salvos no local storage

function VerificaDadosSalvos(){

var valCampoDt1;
var valCampoDt2;

if(localStorage.getItem("valCampoDt1") != null && localStorage.getItem("valCampoDt2") == null){

  valCampoDt1 =  new Date(localStorage.getItem("valCampoDt1"));
  valCampoDt2 =  new Date(localStorage.getItem("valCampoDt1"));
  valCampoDt2.setDate(valCampoDt2.getDate() + 1);

}else if( localStorage.getItem("valCampoDt1") == null && localStorage.getItem("valCampoDt2") != null){

  valCampoDt1 =  new Date(localStorage.getItem("valCampoDt2"));
  valCampoDt2 =  new Date(localStorage.getItem("valCampoDt2"));
  valCampoDt1.setDate(valCampoDt1.getDate() - 1);

}else if(localStorage.getItem("valCampoDt1") != null && localStorage.getItem("valCampoDt2") != null){

  valCampoDt1 =  new Date(localStorage.getItem("valCampoDt1"));
  valCampoDt2 =  new Date(localStorage.getItem("valCampoDt2"));

}else{

  valCampoDt1 =  new Date();
  valCampoDt2 =  new Date();
  valCampoDt2.setDate(valCampoDt2.getDate() + 1);

}  

dt1.valueAsDate = valCampoDt1;
dt2.valueAsDate = valCampoDt2;

}

// ========================================

// Função que serve de Motor para as operações com as datas

function MotorOperacaoDatas(){


switch(this.id){

case "tagDt1":

   if(dt1.checkValidity()){ 
      
      OperacaoData(dt1,dt2,1,["min","max"]);
      salvaDados("valCampoDt1",dt1.valueAsDate);
   
    }else{
      AlteraTextContent(tagExibeResultado,"Invalid Values.");
    }

break;

case "tagDt2":

  if(dt2.checkValidity()){ 
      
    OperacaoData(dt2,dt1,-1,["max","min"]);
    salvaDados("valCampoDt2",dt2.valueAsDate);
  
  }else{
    AlteraTextContent(tagExibeResultado,"Invalid Values.");
  }
 
break;

}

}

// ==================================================================


// Função que realiza as operações com as datas

function OperacaoData(dtPrincipal,dtSecundaria,valInc,valStrings){
      

    var novoDt1 = AlteraData(dtPrincipal.valueAsDate,1);
    
    var  newLimiteValdt2 = ExtraiDataFormatoPadrao(AlteraData(novoDt1,valInc));

    DefineAtributoElemento(dtSecundaria,valStrings[0],newLimiteValdt2);
        

    if(dtSecundaria.checkValidity()){

      var novoDt2 = AlteraData(dtSecundaria.valueAsDate,1);

      var newLimiteValdt1 = ExtraiDataFormatoPadrao(AlteraData(novoDt2,-(valInc)));
      
      DefineAtributoElemento(dtPrincipal,valStrings[1],newLimiteValdt1);

      var strDays = "Day";
      intervaloDias = calculaIntervaloDias();
    
      if(intervaloDias > 1)
        strDays = strDays.concat("s");

      var msgResult = "Interval between " + dt1.value + " and " + dt2.value + ": " + intervaloDias + " " + strDays + ".";   
      AlteraTextContent(tagExibeResultado,msgResult);
      intervaloDias = 0;
    }else
      AlteraTextContent(tagExibeResultado,"Invalid Values.");

}

// =================================================================================

// Função que altera uma data

function AlteraData(dt,n){

dt.setDate(dt.getDate() + (n));

return dt;

}  

// =================================================================================


// Função que extraí o ano o mês e o dia de uma variável do tipo data  

function ExtraiDataFormatoPadrao(dt){

var dataFormatada = dt.getFullYear() + "-" + AddZero((dt.getMonth() + 1)) + "-" + AddZero(dt.getDate());

return dataFormatada;

}

// ===============================================================================================

// Função que calcula o intervalo de dias entre duas datas 

function calculaIntervaloDias(){

var auxDt1 =  dt1.valueAsDate; 

while(ExtraiDataFormatoPadrao(auxDt1).localeCompare(ExtraiDataFormatoPadrao(dt2.valueAsDate))){

auxDt1 = AlteraData(auxDt1,1);
intervaloDias++;

}

return intervaloDias;

}

// =======================================================================================================


// Função que insere/muda determinado atributo de um elemento  

function DefineAtributoElemento(ele,attr,val){

ele.setAttribute(attr,val);

}

// ======================================================================================


// Função que adiciona um zero a valores menores que dez 

function AddZero(val){

  if(val < 10)
  val = "0" + val;
  
  return val;
  
  }
  
  // ==============================================================

  // Função que altera o atributo textContent de um Elemeto 

  function AlteraTextContent(ele,txt){

    ele.textContent = txt;

  }

// =======================================================


// Função que salva determinado dado no localStorage  

function salvaDados(nomeCampo,val){

localStorage.setItem(nomeCampo,val);

}

// =====================================================