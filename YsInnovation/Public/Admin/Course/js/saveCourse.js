/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    $("#btnSave").click(function(){
        saveCourse();
    });
});
/*
 * 保存课程信息的方法
 */
function saveCourse(){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Course/saveCourse";
    
    var courseName=$("#inputCourseName").val();
    var courseNum=$("#inputCourseNum").val();
    var courseBeginTime=$("#inputCourseBeginTime").val();
    var courseEndTime=$("#inputCourseEndTime").val();
    var courseSeme=$("#selectCourseSeme").val();
    var courseOrg=$("#selectCourseOrga").val();
    var courseSpeaker=$("#selectCourseSpeaker").val();
    if(courseSpeaker=="noTea"){
        alert("此课程缺少主讲人，请确认是否选错实验室！");
        return;
    }
    var coursePeriod=$("#inputCoursePeriod").val();
    var courseScore=$("#inputCourseScore").val();
    var coursePlace=$("#inputCoursePlace").val();    
    var courseHour="";   //创建一个空字符串，用于存储课程时间安排
    var len=$("#divCourseHours").children("div").length;
    for(var i=0;i<len;i++){
        $("#divCourseHours").children("div").eq(i).children("select").each(function(){
            var selectData=$(this).val();
            //courseHour.push(selectData);
            courseHour+=selectData+",";
        });
        courseHour+="|";        
    }
    var courseContent=$("#areaCourseOutline").val();
    if(courseName==""||courseNum==""||courseBeginTime==""||courseEndTime==""||
            courseSeme==""||courseOrg==""||courseSpeaker==""||coursePeriod==""||courseScore==""||coursePlace==""||courseHour==""||courseContent==""){
        alert("请将信息填写完整后保存！");
        return;
            }
    
    
    
    
    $.ajax({
        type:"POST",
        dataType:"JSON",
        url:ajax_url,
        data:{name:courseName,num:courseNum,beginTime:courseBeginTime,endTime:courseEndTime,seme:courseSeme,org:courseOrg,speaker:courseSpeaker,
        period:coursePeriod,score:courseScore,place:coursePlace,hour:courseHour,content:courseContent},
        success:function(result){
            if(result!="0"){
                alert("信息添加成功！");
                window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/Course/showExaminedList";
            }
            else{
                alert("信息添加失败！请重试！");
                window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/Course/showExaminedList";
            }
        }
    });
}