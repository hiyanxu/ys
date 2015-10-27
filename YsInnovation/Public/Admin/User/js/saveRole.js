/* 
 * 角色添加的js文件
 */
$(function(){
    $("#btnSave").click(function(){
        saveRole();
    });
});
/*
 * 角色添加保存按钮事件
 */
function saveRole(){
    var roleName=$("#inputRoleName").val();
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/saveRole";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{roleName:roleName},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            if(resultAnaly=="success"){
                alert("添加成功！");
                window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showRoleList";
            }
            else{
                alert("添加失败，请重试！");
                window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showRoleList";
            }
        }
    });
}


