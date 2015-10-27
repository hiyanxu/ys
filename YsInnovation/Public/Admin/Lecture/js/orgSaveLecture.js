/* 
 * 实验室管理员：讲座添加保存的js文件
 */
$(function(){
    var org=getCookie("user_org");
    $("#btnSave").click(function(){
        saveLecture(org);
    });
});
/*
 * 实验室管理员：保存的方法
 */
function saveLecture(org){
    var ajax_url=ajax_url_common+"Lecture/orgSaveLectureJs";
    var name=$("#inputLectureName").val();
    var time=$("#inputLectureTime").val();
    var speaker=$("#inputLectureSpeaker").val();
    var speakerDuty=$("#selectLectureSpeakerDuty").val();
    var speakerCollege=$("#selectLectureSpeakerCollege").val();
    var ubdertakeCollege=$("#selectLectureUbdertakeCollege").val();
    var scope=$("#selectLectureScope").val();
    var place=$("#inputLecturePlace").val();
    var desc=$("#areaLectureDesc").val();
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{name:name,time:time,speaker:speaker,speakerDuty:speakerDuty,speakerCollege:speakerCollege,ubdertakeCollege:ubdertakeCollege,
            scope:scope,place:place,desc:desc,org:org},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            alert(resultAnaly);
        }
    });
}

