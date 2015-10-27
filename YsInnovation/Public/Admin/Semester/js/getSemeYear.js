/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    getSemeYear();
});
function getSemeYear(){
    var date=new Date();
    var monthNow=date.getMonth();
    var yearNow1=date.getFullYear();
    var yearNext;
    var value;
    for(var i=0;i<5;i++){
        var yearNow=yearNow1+i;
        yearNext=yearNow1+i+1;
        value=yearNow+"-"+yearNext;
        var info=$("<option value="+value+">"+yearNow+"-"+yearNext+"</option>");
        $("#selectSeme").append(info);
    }
    
}

