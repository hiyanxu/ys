/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
   var orgId=getCookie("user_org");
   getTeaByOrgId(orgId);
});
/*
 * 读取当前cookie的方法
 * 获取当前登录人的实验室id信息
*/
function getCookie(c_name)
{
    if (document.cookie.length>0)
      {
            c_start=document.cookie.indexOf(c_name + "=")
            if (c_start!=-1)
            { 
                c_start=c_start + c_name.length+1 
                c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) c_end=document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end))
            } 
      }
    return "";
}
/*
 * 根据实验室id信息获取实验室教师的方法
 * 参数：实验室id
 * 返回：实验室教师信息
 */
function getTeaByOrgId(id){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Laboratory/getLaboratoryUser";
    $.ajax({
        type:"POST",
        url:ajax_url,
        dataType:"POST",
        data:{userType:1,orgId:id},
        success:function(result){
            var resultAnaly=eval(result);
            fillSelectWithTea(resultAnaly);
        }
    });
}
/*
 * 根据实验室教师信息填充select标签
 * 参数：教师信息
 */
function fillSelectWithTea(data){
    $("#selectCourseSpeaker").empty();
    if(data==""){
        var infoList=$("<option value='noTea'>该实验室下无任何教师</option>");
        $("#selectCourseSpeaker").append(infoList);
    }
    else{
        for(var i=0;i<data.length;i++){
            var infoList=$("<option value="+data[i]["user_id"]+">"+data[i]["user_name"]+"</option>");
            $("#selectCourseSpeaker").append(infoList);
        }
    }
}


