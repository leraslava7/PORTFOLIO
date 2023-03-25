"use strict"
const ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
let updatePassword;
const stringName='ANISKEVICH_VALERYIA_PROJECT';

function storeInfo() {
    //сначала сделаем валидацию имени
    const formElem=document.getElementById('IValid');
    const nameElem=document.getElementById('IName');

    formElem.addEventListener("submit", formValid)
    nameElem.addEventListener("blur", (eo)=>nameValid(false));

    function nameValid(focusOnError) {

        const nameErrorElem=document.getElementById('INameError');
        let errorsCount=0;
    
        const value=nameElem.value;
        if ( !value ) {
            nameErrorElem.innerHTML="Введите свое имя";
            if (focusOnError)
                nameElem.focus();
            errorsCount++;
        }
        else {
            nameErrorElem.innerHTML="";
        }
    
        return errorsCount;
    } 

    function formValid(eo) {
        eo=eo||window.event;
    
        let errCount=0;
        errCount+=nameValid(!errCount);   
    
        if (errCount)
          eo.preventDefault();
    }

    formValid();
//теперь запомним
    updatePassword=Math.random();
    $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'LOCKGET', n : stringName, p : updatePassword },
            success : lockGetReady, error : errorHandler
        }
    );
}

function lockGetReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else {
        // нам всё равно, что было прочитано -
        // всё равно перезаписываем
        const info={
            name : document.getElementById('IName').value,
            level : document.getElementById('LevelCh').value
        };
        $.ajax( {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'UPDATE', n : stringName,
                    v : JSON.stringify(info), p : updatePassword },
                success : updateReady, error : errorHandler
            }
        );
    }
}

function updateReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
}

function restoreInfo() {
    $.ajax(
        {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'READ', n : stringName },
            success : readReady, error : errorHandler
        }
    );
}

function readReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else if ( callresult.result!="" ) {
        const info=JSON.parse(callresult.result);
        document.getElementById('IName').value=info.name;
        document.getElementById('LevelCh').value=info.level;
    }
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}

restoreInfo();