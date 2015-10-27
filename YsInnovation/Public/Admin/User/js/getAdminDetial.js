/* 
 * 得到管理员详细信息的js文件
 */
$(function(){
    var id=psGetUrlParameter("id");
    getAdminDetial(id);
    $("#inputAdminName").attr("readonly","readonly");
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
 * 得到详细信息的方法
 */
function getAdminDetial(id){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/getAdminDetialJs";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{id:id},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            //alert(resultAnaly);
            $("#inputId").val(resultAnaly[0]["user_account_id"]);
            $("#inputAdminName").val(resultAnaly[0]["user_name"]);
            $("#selectTeaRole").val(resultAnaly[0]["user_role_id"]);
            $("#inputTeaAccount").val(resultAnaly[0]["user_account"]);
            $("#inputTeaPwd").val(resultAnaly[0]["user_account_pwd"]);
        }
    });
}


