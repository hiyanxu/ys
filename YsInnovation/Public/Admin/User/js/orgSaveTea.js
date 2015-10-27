/* 
 * 实验室管理员：教师添加保存事件
 */
$(function(){
    var org=getCookie("user_org");
    $("#btnSave").click(function(){
        saveTea(org);
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
 * 保存的方法
 */
function saveTea(org){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/saveTeaBySuperAdmin";
    var name=$("#inputTeaName").val();
    var sex=$("#selectSex").val();
    var account=$("#inputTeaAccount").val();
    var pwd=$("#inputTeaPwd").val();
    var jobNum=$("#inputTeaJobNum").val();
    var duty=$("#selectTeaDuty").val();
    var idCardNum=$("#inputTeaIdCardNum").val();
    var phone=$("#inputTeaPhone").val();
    var email=$("#inputTeaEmail").val();
    var weiXin=$("#inputTeaWeixin").val();
    var QQ=$("#inputTeaQQ").val();
    var org=org;
    var college=$("#selectTeaCollege").val();
    var role=4;
    //进行非空验证
    if(name==""){
        alert("请填写姓名！");
        return;
    }
    else if(account==""){
        alert("请填写用户账号！");
        return;
    }
    else if(pwd==""){
        alert("请填写密码！");
        return;
    }
    else if(jobNum==""){
        alert("请填写教师工号！");
        return;
    }
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{name:name,sex:sex,account:account,pwd:pwd,jobNum:jobNum,duty:duty,
            idCardNum:idCardNum,phone:phone,email:email,weiXin:weiXin,QQ:QQ,org:org,college:college,role:role},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            if(resultAnaly=="success"){
                alert("添加成功！");
                window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showTeaList";
            }
            else if(resultAnaly=="error"){
                alert("添加失败！");
                window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showTeaList";
            }
        }
    });
}


