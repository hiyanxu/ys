/* 
 * 管理员修改后保存的js文件
 */
$(function(){
    $("#btnSave").click(function(){
        editSaveAdmin();
    });    
});
/*
 * 修改后保存的方法
 */
function editSaveAdmin(){
    var id=$("#inputId").val();
    var name=$("#inputAdminName").val();
    var role=$("#selectTeaRole").val();
    var account=$("#inputTeaAccount").val();
    var pwd=$("#inputTeaPwd").val();
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/editSaveAdmin";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{id:id,name:name,role:role,account:account,pwd:pwd},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            //alert(resultAnaly);
            if(resultAnaly==1){
                alert("修改成功！");
                window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showAdminList";
            }
            else{
                alert("修改失败！");
                window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showAdminList";
            }
        }
    });
}


