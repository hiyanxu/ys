/* 
 * 中心管理员保存按钮的点击事件
 */
$(function(){
    $("#btnSave").click(function(){
        saveTea();
    });
});
/*
 * 保存事件
 */
function saveTea(){
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
    var org=$("#selectTeaOrga").val();
    var college=$("#selectTeaCollege").val();
    var role=$("#selectTeaRole").val();
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
            alert(resultAnaly);
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

