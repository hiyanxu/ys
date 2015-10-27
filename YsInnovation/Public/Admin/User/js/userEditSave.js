/* 
 * 修改的保存按钮事件
 */
$(function(){
    var paras=document.getElementById("userEditSaveScript").getAttribute("data");   //获得当前页面传入参数    
    $("#btnSave").click(function(){
        var userId=$("#inputUserId").val();
        var userAccountId=$("#inputUserAccountId").val();
        userEditSave(paras,userId,userAccountId);
    });    
});
/*
 * 修改的保存方法
 */
function userEditSave(userType,userId,userAccountId){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/userEditSaveJs";
    var name=$("#inputTeaName").val();
    var sex=$("#selectSex").val();
    var account=$("#inputTeaAccount").val();
    var pwd=$("#inputTeaPwd").val();    
    var idCardNum=$("#inputTeaIdCardNum").val();
    var phone=$("#inputTeaPhone").val();
    var email=$("#inputTeaEmail").val();
    var weixin=$("#inputTeaWeixin").val();
    var QQ=$("#inputTeaQQ").val();
    var org=$("#selectTeaOrga").val();
    var college=$("#selectTeaCollege").val();
    var role=$("#selectTeaRole").val();
    if(userType==1){
        var jobNum=$("#inputTeaJobNum").val();
        var duty=$("#selectTeaDuty").val();
        $.ajax({
            type:"POST",
            dataType:"JSON",
            data:{userId:userId,userAccountId:userAccountId,userType:userType,name:name,sex:sex,account:account,pwd:pwd,jobNum:jobNum,duty:duty,idCardNum:idCardNum,phone:phone,email:email,
                weixin:weixin,qq:QQ,org:org,college:college,role:role},
            url:ajax_url,
            success:function(result){
                var resultAnaly=eval(result);
                //alert(resultAnaly);
                if(resultAnaly=="success"){
                    alert("修改成功！");
                    if(userType==1){
                        window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showTeaList";
                    }
                    else{
                        window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showStuList";
                    }
                }
                else{
                    alert("修改失败，请重试！");
                    if(userType==1){
                        window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showTeaList";
                    }
                    else{
                        window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showStuList";
                    }
                }
            },
            error:function(){
                alert("发生错误！");
            }
        });
    }
    else{        
        var stuNum=$("#inputTeaJobNum").val();        
        var innoNum=$("#inputInnoNum").val();
        $.ajax({
            type:"POST",
            dataType:"JSON",
            data:{userId:userId,userAccountId:userAccountId,userType:userType,name:name,sex:sex,account:account,pwd:pwd,stuNum:stuNum,idCardNum:idCardNum,phone:phone,email:email,
                weixin:weixin,qq:QQ,org:org,college:college,role:role,innoNum:innoNum},
            url:ajax_url,
            success:function(result){
                var resultAnaly=eval(result);
                //alert(resultAnaly);
                if(resultAnaly=="success"){
                    alert("修改成功！");
                    if(userType==1){
                        window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showTeaList";
                    }
                    else{
                        window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showStuList";
                    }
                }
                else{
                    alert("修改失败，请重试！");
                    if(userType==1){
                        window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showTeaList";
                    }
                    else{
                        window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showStuList";
                    }
                }
            },
            error:function(){
                alert("发生错误！");
            }
        });
    }
}


