/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    $("#btnSubmit").click(function(){
        submitSemesterSave();
    });
});
function submitSemesterSave(){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Semester/saveSemester";
    var ajax_url_list="/YsInnoCenter/YsInnovation/index.php/Admin/Semester/showSemesterList";
    var semeYear=$("#selectSeme").val();
    var semeSeas=$("#selectSeas").val();
    var semeWeek=$("#semeWeek").val();
    var semeBeginTime=$("#semeBeginTime").val();
    var semeName=semeYear+"/"+semeSeas;
    if(semeYear==""||semeSeas==""||semeWeek==""||semeBeginTime==""){
        alert("请将信息填写完整后在提交！");
        return;
    }
    $.ajax({
        type:"POST",
        data:{name:semeName,week:semeWeek,time:semeBeginTime},
        url:ajax_url,
        dataType:"JSON",
        success:function(data){
            if(data!="0"){
                alertMes("添加成功！",ajax_url_list);
            }
            else{
                alertMes("添加失败,请重试！",ajax_url_list);
            }
        }
    });
}


function alertMes(mes,url){
    alert(mes);
    window.location.href=url;
}

