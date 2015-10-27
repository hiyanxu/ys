/* 
 * 讲座保存的js文件
 */
$(function(){
    $("#btnSave").click(function(){
        saveLecture();
    });
});
/*
 * 讲座保存的方法
 */
function saveLecture(){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Lecture/saveLectureJs";
    var name=$("#inputLectureName").val();
    var time=$("#inputLectureTime").val();
    var speaker=$("#inputLectureSpeaker").val();
    var speakerDuty=$("#selectLectureSpeakerDuty").val();
    var speakerCollege=$("#selectLectureSpeakerCollege").val();
    var ubdertakeCollege=$("#selectLectureUbdertakeCollege").val();
    var scope=$("#selectLectureScope").val();
    var place=$("#inputLecturePlace").val();
    var org=$("#selectLectureOrg").val();
    var desc=$("#areaLectureDesc").val();
    $.ajax({
        type:"POST",
        dataType:"JSON",
        url:ajax_url,
        data:{name:name,time:time,speaker:speaker,speakerDuty:speakerDuty,speakerCollege:speakerCollege,ubdertakeCollege:ubdertakeCollege,scope:scope,place:place,org:org,desc:desc},
        success:function(result){
            var resultAnaly=eval(result);
            //alert(resultAnaly);
            if(resultAnaly=="success"){
                alert("添加成功！");
                window.loation.href="/YsInnoCenter/YsInnovation/index.php/Admin/Lecture/showExaminedLectureList";
            }
            else{
                alert("添加失败！");
                window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/Lecture/showExaminedLectureList";
            }
        }
    });
}


