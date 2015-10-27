/* 
 * 获取学院的js文件
 */
$(function(){
    getCollege();
});
/*
 * 获取学院的方法
 */
function getCollege(){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/getCollegeJs";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            //alert(resultAnaly);
            for(var i=0;i<resultAnaly.length;i++){
                var infoList=$("<option value='"+resultAnaly[i]["college_id"]+"'>"+resultAnaly[i]["college_name"]+"</option>");                
                $("#selectLaboratoryCollege").append(infoList);                
            }     
        }
    });
}
