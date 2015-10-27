/* 
 * 角色信息修改的保存事件
 */
$(function(){
    $("#btnSave").click(function(){
        var id=$("#inputRoleId").val();
        editRoleSave(id);
    });
});
/*
 * 保存方法
 */
function editRoleSave(id){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/editRoleSave";
    var roleName=$("#inputRoleName").val();
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{id:id,roleName:roleName},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            if(resultAnaly="success"){
                alert("修改成功！");
                window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showRoleList";
            }
            else{
                alert("修改失败！");
                window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showRoleList";
            }
        }
    });
}


