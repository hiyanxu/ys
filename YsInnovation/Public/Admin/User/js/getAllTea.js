/* 
 * 得到所有教师的js文件
 */
$(function(){
    getAllTea();
});
function getAllTea(){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/getAllTea";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            //alert(resultAnaly);
            for(var i=0;i<resultAnaly.length;i++){
                var element=$('<option value='+resultAnaly[i]["user_id"]+'>'+resultAnaly[i]["user_name"]+'</option>');
                $("#selectTeaList").append(element);
            }
        }
    });
}


