/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    $("#btnSave").click(function(){
        orgSaveCourse();
    });    
});
/*
 * 课程保存按钮的方法
 */
function orgSaveCourse(){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Course/orgSaveCourse"
    var courseName=$("#inputCourseName").val();
    var courseBeginTime=$("#inputCourseBeginTime").val();
    var courseEndTime=$("#inputCourseEndTime").val();
    var courseSemester=$("#selectCourseSeme").val();
    var courseSpeaker=$("#selectCourseSpeaker").val();
    var coursePeriod=$("#inputCoursePeriod").val();
    var coursePlace=$("#inputCoursePlace").val();
    //var courseHour=new Array();
    var courseHour="";
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
        data:{name:courseName,beginTime:courseBeginTime,endTime:courseEndTime,
            seme:courseSemester,speaker:courseSpeaker,period:coursePeriod,place:coursePlace,hour:courseHour,content:courseOutline},
        url:ajax_url,
        success:function(result){
            alert(result);
        }
    });
}


//function orgSaveCourse(){
//    var courseHour=new Array(); //创建一个空数组，用以存储时间安排
//    $("#divCourseHours").each(function(){
//        $(".divCourseHourSelect select").each(function(){
//            var week=$(this).val();
////            var week1=$("#week1").val();
////            var week2=$("#week2").val();
////            var section1=$("#section1").val();
////            var section2=$("#section2").val();
//            //var hours=week1+"-"+week2+"/"+section1+"-"+section2;
//            alert($(this));
//            courseHour.push(hours);
//            
//        });
//       alert(courseHour); 
//    });
//}