/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * 获取实验室列表的js文件
 * 并且根据选中的实验室，删选出此实验室的教师
 */
$(function(){
    getOrgan();
    getTeaByOrg();
    $("#selectCourseOrga").change(function(){
        getTeaByOrg();
    });
    
});

/*
 * 
 * 获取实验室列表
 */
function getOrgan(){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Laboratory/getLaboratory";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        url:ajax_url,
        success:function(result){
            $("#selectCourseOrga").empty();
            var resultAnaly=eval(result);//将json格式数据解析
            //alert(resultAnaly[0]["organization_name"]);
            for(var i=0;i<resultAnaly.length;i++){
                var orgaName=resultAnaly[i]["organization_name"];
                var infoList=$("<option value="+resultAnaly[i]["organization_id"]+">"+orgaName+"</option>");
                $("#selectCourseOrga").append(infoList);
            }
        }
    });
} 

/*
 * 得到属于某实验室所有教师
 * 需要传入参数：
 * 用户类型：userType
 * 实验室id：orgId
 */
function getTeaByOrg(){
    var orgId=$("#selectCourseOrga").val();
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Laboratory/getLaboratoryUser";
    $.ajax({
        type:"POST",
        url:ajax_url,
        dataType:"POST",
        data:{userType:1,orgId:orgId},
        success:function(result){
            $("#selectCourseSpeaker").empty();
            var resultAnaly=eval(result);
            //alert(resultAnaly[0]["user_name"]);
            //alert(resultAnaly);
            if(resultAnaly==""){
                var infoList=$("<option value='noTea'>该实验室下无任何教师</option>");
                $("#selectCourseSpeaker").append(infoList);
            }
            else{
                for(var i=0;i<resultAnaly.length;i++){
                    var infoList=$("<option value="+resultAnaly[0]["user_id"]+">"+resultAnaly[i]["user_name"]+"</option>");
                    $("#selectCourseSpeaker").append(infoList);
                }
            }
        },
        error:function(){
            alert("系统发生错误，请重新登录！");
            window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/Login/login";
        }
    });
}
