/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    getOrgan();
});
function getOrgan(){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Laboratory/getLaboratory";
    alert("getorgan");
    $.ajax({
        type:"POST",
        dataType:"JSON",
        url:ajax_url,
        success:function(result){
            $("#operSelectCourseOrga").empty();
            var resultAnaly=eval(result);//将json格式数据解析
            //alert(resultAnaly[0]["organization_name"]);
            for(var i=0;i<resultAnaly.length;i++){
                var orgaName=resultAnaly[i]["organization_name"];
                var infoList=$("<option value="+resultAnaly[i]["organization_id"]+">"+orgaName+"</option>");
                $("#operSelectCourseOrga").append(infoList);
            }
        }
    });
}

