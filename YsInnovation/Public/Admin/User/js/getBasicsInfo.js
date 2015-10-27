/* 
 * 得到基础信息的js文件
 */
$(function(){
    getTeaDuty();
    getOrg();
    getCollege();
    getRoles();
});
/*
 * 得到教师职称的方法
 */
function getTeaDuty(){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/getTeaDutyJs";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        url:ajax_url,
        success:function(result){
            //alert(result);
            var resultAnlay=eval(result);
            for(var i=0;i<resultAnlay.length;i++){
                var infoList=$("<option value='"+resultAnlay[i]["tea_duty_id"]+"'>"+resultAnlay[i]["tea_duty_name"]+"</option>");
                $("#selectTeaDuty").append(infoList);
            }            
        }
    });
}
/*
 * 得到实验室的方法
 */
function getOrg(){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/getOrgJs";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        url:ajax_url,
        success:function(result){
            //alert(result);
            var resultAnaly=eval(result);
            for(var i=0;i<resultAnaly.length;i++){
                var infoList=$("<option value='"+resultAnaly[i]["organization_id"]+"'>"+resultAnaly[i]["organization_name"]+"</option>");
                $("#selectTeaOrga").append(infoList);
            }     
        }
    });
}
/*
 * 得到学院的方法
 */
function getCollege(){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/getCollegeJs";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            //alert(resultAnaly);
            for(var i=0;i<resultAnaly.length;i++){
                var infoList=$("<option value='"+resultAnaly[i]["college_id"]+"'>"+resultAnaly[i]["college_name"]+"</option>");
                $("#selectTeaCollege").append(infoList);
            }     
        }
    });
}
/*
 * 得到用户角色
 */
function getRoles(){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/getRolesJs";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            for(var i=0;i<resultAnaly.length;i++){
                var infoList=$("<option value='"+resultAnaly[i]["role_id"]+"'>"+resultAnaly[i]["role_name"]+"</option>");
                $("#selectTeaRole").append(infoList);
            }    
        }
    });
}


