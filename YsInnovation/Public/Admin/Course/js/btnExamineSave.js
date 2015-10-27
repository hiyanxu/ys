/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    var id=$("#hiddenId").val();
    $("#btnSave").click(function(){
        benExamineSave(id);
    });
});
/*
 * 审核保存的方法
 */
function benExamineSave(id){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Course/examineCourseSave";
    var courseName=$("#inputCourseName").val();
    var courseNum=$("#inputCourseNum").val();
    if(courseNum==""){
        alert("请填写课程号！");
        return;
    }
    var courseBeginTime=$("#inputCourseBeginTime").val();
    var courseEndTime=$("#inputCourseEndTime").val();
    var courseSemester=$("#selectCourseSeme").val();
    var courseOrg=$("#selectCourseOrga").val();
    if(courseOrg==""){
        alert("请填写课程所属实验室！");
        return;
    }
    var courseSpeaker=$("#selectCourseSpeaker").val();
    var coursePeriod=$("#inputCoursePeriod").val();
    var courseScore=$("#inputCourseScore").val();
    if(courseScore==""){
        alert("请填写此课程学分！");
        return;
    }
    var coursePlace=$("#inputCoursePlace").val();
    var courseHour="";    //设置一个空字符串，用于得到课程时间安排的信息
    var len=$("#divCourseHours").children("div").length;
    for(var i=0;i<len;i++){
        $("#divCourseHours").children("div").eq(i).children("select").each(function(){
            var selectData=$(this).val();
            //courseHour.push(selectData);
            courseHour+=selectData+",";
        });
        courseHour+="|";        
    }
    var courseOutline=$("#areaCourseOutline").val();
    var courseStatus=$("#selectCourseExamine").val();
    $.ajax({
        type:"POST",
        dataType:"JSON",
        url:ajax_url,
        data:{id:id,name:courseName,num:courseNum,beginTime:courseBeginTime,endTime:courseEndTime,
            seme:courseSemester,org:courseOrg,speaker:courseSpeaker,period:coursePeriod,score:courseScore,place:coursePlace,hour:courseHour,content:courseOutline,status:courseStatus},
        success:function(result){
            if(result=="1"){
                alert("审核成功！");
                window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/Course/showExaminedList";
            }
        }
    });
    
}
