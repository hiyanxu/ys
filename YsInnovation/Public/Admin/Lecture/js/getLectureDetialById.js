/* 
 * 根据id得到本条讲座的详细信息
 */
$(function(){
    var id=psGetUrlParameter("id");
    getLectureDetialById(id);
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
 * 根据id得到详细信息
 */
function getLectureDetialById(id){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Lecture/getLectureDetialJs";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{id:id},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            //alert(resultAnaly);
            bindInfo(resultAnaly);
        }
    });
}
/*
 * 填充信息的方法
 */
function bindInfo(data){
    $("#inputHiddenId").val(data[0]["lecture_id"]);
    $("#inputLectureName").val(data[0]["lecture_name"]);
    $("#inputLectureTime").val(data[0]["lecture_time"]);
    $("#inputLectureSpeaker").val(data[0]["speaker"]);    
    $("#selectLectureSpeakerDuty").val(data[0]["speaker_duty_id"]);   
    $("#selectLectureSpeakerCollege").val(data[0]["speaker_college"]);
    $("#selectLectureUbdertakeCollege").val(data[0]["lecture_college"]);
    $("#selectLectureScope").val(data[0]["lecture_scope"]);
    $("#inputLecturePlace").val(data[0]["lecture_place"]);
    $("#selectLectureOrg").val(data[0]["organization_id"]);
    KindEditor.instances[0].html(data[0]["lecture_desc"]);
    $("#areaLectureDesc").val(data[0]["lecture_desc"]);    
}


