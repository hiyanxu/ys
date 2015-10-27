/* 
 * 实验室管理员：保存学生信息
 */
$(function(){
    var org=getCookie("user_org");
    $("#btnSave").click(function(){
        saveStu(org);
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
保存学生的方法
*/
function saveStu(org){
	var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/saveStuBySuperAdmin";
	var name=$("#inputTeaName").val();
	var sex=$("#divTeaSex").val();
	var account=$("#inputTeaAccount").val();
	var pwd=$("#inputTeaPwd").val();
	var stuNum=$("#inputTeaJobNum").val();
	var idCardNum=$("#inputTeaIdCardNum").val();
	var phone=$("#inputTeaPhone").val();
	var email=$("#inputTeaEmail").val();
	var weixin=$("#inputTeaWeixin").val();
	var QQ=$("#inputTeaQQ").val();
	var org=org;
	var innoNum=$("#inputInnoNum").val();
	var college=$("#selectTeaCollege").val();
        var isCharge=$("#selectIsCharge").val();
        var role;
        if(isCharge==0){
            role=3;
        }
	else if(isCharge==1){
            role=5;
        }
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
    else if(stuNum==""){
        alert("请填写学号！");
        return;
    }
	$.ajax({
		type:"POST",
		dataType:"JSON",
		data:{name:name,sex:sex,account:account,pwd:pwd,stuNum:stuNum,idCardNum:idCardNum,phone:phone,email:email,weixin:weixin,QQ:QQ,org:org,innoNum:innoNum,college:college,role:role},
		url:ajax_url,
		success:function(result){
			var resultAnaly=eval(result);
			if(resultAnaly=="success"){
				alert("添加成功！");
				window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showStuList";
			}
			else{
				alert("添加失败，请重试！");
				window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showStuList";
			}
		}
	});
}


