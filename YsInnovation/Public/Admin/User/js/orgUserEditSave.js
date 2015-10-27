/* 
 * 实验室管理员：用户修改保存的js文件
 */
$(function(){
    var paras=document.getElementById("userEditSaveScript").getAttribute("data");   //获得当前页面传入参数    
    var org=getCookie("user_org");
    $("#btnSave").click(function(){
        var userId=$("#inputUserId").val();
        var userAccountId=$("#inputUserAccountId").val();
        userEditSave(paras,userId,userAccountId,org);
    });    
});
/*
 * 读取当前cookie的方法
 * 获取当前登录人的实验室id信息
*/
function getCookie(c_name)
{
    if (document.cookie.length>0)
      {
            c_start=document.cookie.indexOf(c_name + "=")
            if (c_start!=-1)
            { 
                c_start=c_start + c_name.length+1 
                c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) c_end=document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end))
            } 
      }
    return "";
}
/*
 * 修改的保存方法
 */
function userEditSave(userType,userId,userAccountId,org){
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
    var org=org;
    var college=$("#selectTeaCollege").val();
    var role=4;
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
                        window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showOrgTeaList";
                    }
                    else{
                        window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showOrgStuList";
                    }
                }
                else{
                    alert("修改失败，请重试！");
                    if(userType==1){
                        window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showOrgTeaList";
                    }
                    else{
                        window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showOrgStuList";
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
                        window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showOrgTeaList";
                    }
                    else{
                        window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showOrgStuList";
                    }
                }
                else{
                    alert("修改失败，请重试！");
                    if(userType==1){
                        window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showOrgTeaList";
                    }
                    else{
                        window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showOrgStuList";
                    }
                }
            },
            error:function(){
                alert("发生错误！");
            }
        });
    }
}

