/* 
 * 获取角色详细信息的js文件
 */
$(function(){
    var id=psGetUrlParameter("id");
    $("#inputRoleId").val(id);
    getRoleDetialById(id);
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
 * 获取角色详细信息的方法
 */
function getRoleDetialById(id){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/getRoleDetialByIdJs";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{id:id},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            $("#inputRoleName").val(resultAnaly[0]["role_name"]);
        }
    });
}


