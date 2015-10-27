/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    var id=$("#hiddenId").val();
    $("#btnSave").click(function(){
        courseEditSave(id);
    });
});
/*
 * 课程修改后保存的方法
 * 参数：本条课程信息id
 */
function courseEditSave(id){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Course/updateCourse";
    var courseName=$("#inputCourseName").val();
    var courseNum=$("#inputCourseNum").val();
    var courseBeginTime=$("#inputCourseBeginTime").val();
    var courseEndTime=$("#inputCourseEndTime").val();
    var courseSemester=$("#selectCourseSeme").val();
    var courseOrg=$("#selectCourseOrga").val();
    var courseSpeaker=$("#selectCourseSpeaker").val();
    var coursePeriod=$("#inputCoursePeriod").val();
    var courseScore=$("#inputCourseScore").val();
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
    $.ajax({
        type:"POST",
        dataType:"JSON",
        url:ajax_url,
        data:{id:id,name:courseName,num:courseNum,beginTime:courseBeginTime,endTime:courseEndTime,
            seme:courseSemester,org:courseOrg,speaker:courseSpeaker,period:coursePeriod,score:courseScore,place:coursePlace,hour:courseHour,content:courseOutline},
        success:function(result){
            if(result=="1"){
                alert("课程修改成功！");
                window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/Course/showExaminedList";
            }
        }
    });
}
