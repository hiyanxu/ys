/* 
 * 根据实验室下拉菜单的改变得到对应实验室的号段
 */
$(function(){
    $("#selectTeaOrga").click(function(){
        var orgId=$("#selectTeaOrga").val();
        getInnoNumByOrg(orgId);
    });
});
/*
 * 得到实验室号段的方法
 * 参数：实验室id
 */
function getInnoNumByOrg(orgId){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Laboratory/getInnoNumByOrgJs";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{orgId:orgId},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            //alert(resultAnaly);
            $("#labelInnoNum").text(resultAnaly[0]["organization_inno_num"]);
        }
    });
}


