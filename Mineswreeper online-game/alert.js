"use strict";

var textChanged=false;
const gameAtt = document.querySelector('.game');

gameAtt.onclick=txtChanged;
gameAtt.onkeypress=txtChanged;
gameAtt.onpaste=txtChanged;
gameAtt.oncut=txtChanged;

function txtChanged(EO) {
    EO=EO||window.event;
    textChanged=true; // текст изменён
  }
  
  window.onbeforeunload=befUnload;
  
  function befUnload(EO) {
    EO=EO||window.event;
    // если текст изменён, попросим браузер задать вопрос пользователю
    if ( textChanged )
      EO.returnValue='А у вас есть несохранённые изменения!';
  };