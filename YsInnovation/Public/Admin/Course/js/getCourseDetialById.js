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
 * 填充详细信息的方法
 * 参数：课程详细信息infoDetial
 */
function fillCourseDetial(infoDetial){
    $("#inputCourseName").val(infoDetial[0]["course_name"]);
    $("#inputCourseNum").val(infoDetial[0]["course_num"]);
    $("#inputCourseBeginTime").val(infoDetial[0]["course_begin"]);
    $("#inputCourseEndTime").val(infoDetial[0]["course_end"]);
    $("#selectCourseSeme").val(infoDetial[0]["semester_id"]);
    $("#selectCourseOrga").val(infoDetial[0]["organization_id"]);
    $("#selectCourseSpeaker").val(infoDetial[0]["speaker_id"]);
    $("#inputCoursePeriod").val(infoDetial[0]["course_period"]);
    $("#inputCourseScore").val(infoDetial[0]["course_score"]);
    $("#inputCoursePlace").val(infoDetial[0]["course_place"]);
    var hours=infoDetial[0]["course_hourse"];
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
    KindEditor.instances[0].html(infoDetial[0]["course_outline"]);
    $("#areaCourseOutline").val(infoDetial[0]["course_outline"]);    
}

