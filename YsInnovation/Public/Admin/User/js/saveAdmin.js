/* 
 * 保存管理员的js文件
 */
$(function(){
    $("#btnSave").click(function(){
        saveAdmin();
    });    
});
/*
 * 管理员保存的方法
 */
function saveAdmin(){
    var tea=$("#selectTeaList").val();
    var role=$("#selectTeaRole").val();
    var account=$("#inputTeaAccount").val();
    var pwd=$("#inputTeaPwd").val();
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/saveAdmin";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        url:ajax_url,
        data:{teaId:tea,role:role,account:account,pwd:pwd},
        success:function(result){
            var resultAnaly=eval(result);
            //alert(resultAnaly);
            if(resultAnaly=="success"){
                alert("添加成功！");
                window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showAdminList";
            }
            else if(resultAnaly=="error"){
                alert("添加失败！");
                window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showAdminList";
            }
        }
    });
}


