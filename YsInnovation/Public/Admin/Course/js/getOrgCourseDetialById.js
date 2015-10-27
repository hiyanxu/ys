/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    var id=psGetUrlParameter("id");   
    $("#hiddenId").val(id);
    getCourseDetialById(id);
});
/*
 * 分析url获取参数的方法
 */
function psGetUrlParameter(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}
/*
 * 根据课程信息id获取课程详细信息的方法
 * 参数：课程信息id
 * 返回：课程的详细信息
 */
function getCourseDetialById(id){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Course/getCourseById";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{id:id},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            fillCourseDetial(resultAnaly);
        }
    });
}
/*
 * 根据返回值将页面信息进行填充的方法
 * 参数：课程返回值
 */
function fillCourseDetial(data){
    $("#inputCourseName").val(data[0]["course_name"]);
    $("#inputCourseBeginTime").val(data[0]["course_begin"]);
    $("#inputCourseEndTime").val(data[0]["course_end"]);
    $("#selectCourseSeme").val(data[0]["semester_id"]);
    $("#selectCourseSpeaker").val(data[0]["speaker_id"]);
    $("#inputCoursePeriod").val(data[0]["course_period"]);
    $("#inputCoursePlace").val(data[0]["course_place"]);
    KindEditor.instances[0].html(data[0]["course_outline"]);
    $("#areaCourseOutline").val(data[0]["course_outline"]);    
    var hours=data[0]["course_hourse"];
    var hoursSplit=hours.split("|");
    //alert(hoursSplit.length);  数组的实际长度-1=时间安排的个数
    var len=hoursSplit.length-1;
    for(var j=0;j<len-1;j++){
        $(function(){
            $("#imgHourAdd").trigger("click");
        });
    }   
    for(var n=0;n<hoursSplit.length;n++){
        var hourData=hoursSplit[n].split(",");  
        $("#divCourseHours").children("div").eq(n).children("select").each(function(m){                  
                $(this).val(hourData[m]);
            //courseHour.push(selectData);
        });   
    }
//    for(var i=0;i<len;i++){
//        $("#divCourseHours").children("div").eq(i).children("select").each(function(m){
//                alert(m);                    
//                $(this).val(hourData[m]);
//
//            //courseHour.push(selectData);
//        });     
//    }
    
    
    
}