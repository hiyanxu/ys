/* 
 * 讲座审核的方法
 */
$(function(){
    $("#btnSave").click(function(){
        examineLecture();
    });    
});
/*
 * 讲座审核的方法
 */
function examineLecture(){
    var id=$("#inputHiddenId").val();
    alert(id);
    var status=$("#selectExamineLecture").val();
    var backInfo=$("#areaLectureBackInfo").val();
    var ajax_url=ajax_url_common+"Lecture/examineLecture";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{status:status,backInfo:backInfo,id:id},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            alert(resultAnaly);
        }
    });
}


