/* 
 * 获取基础信息的js文件
 */
$(function(){
    getOrg();
    getDuty();
    getCollege();
});
/*
 * 获取实验室的方法
 */
function getOrg(){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Laboratory/getLaboratory";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        url:ajax_url,
        success:function(result){
            $("#operSelectCourseOrga").empty();
            var resultAnaly=eval(result);//将json格式数据解析成数组对象
            //alert(resultAnaly[0]["organization_name"]);
            for(var i=0;i<resultAnaly.length;i++){
                var orgaName=resultAnaly[i]["organization_name"];
                var infoList=$("<option value="+resultAnaly[i]["organization_id"]+">"+orgaName+"</option>");
                $("#selectLectureOrg").append(infoList);
            }
        }
    });
}
/*
 * 获取职称的方法
 */
function getDuty(){
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
                $("#selectLectureSpeakerDuty").append(infoList);
            }            
        }
    });
}
/*
 * 获取学院的方法
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
                $("#selectLectureUbdertakeCollege").append(infoList);
                var infoList2=$("<option value='"+resultAnaly[i]["college_id"]+"'>"+resultAnaly[i]["college_name"]+"</option>"); 
                $("#selectLectureSpeakerCollege").append(infoList2);
            }     
        }
    });
}
