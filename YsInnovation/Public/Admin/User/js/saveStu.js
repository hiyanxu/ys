/*
保存学生的js文件
*/
$(function(){
	$("#btnSave").click(function(){
		saveStu();
	});
});
/*
保存学生的方法
*/
function saveStu(){
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
	var org=$("#selectTeaOrga").val();
	var innoNum=$("#inputInnoNum").val();
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