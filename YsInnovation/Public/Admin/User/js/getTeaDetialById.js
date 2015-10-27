/* 
 * 得到详细信息的js文件
 */
$(function(){
    var paras=document.getElementById("editUserScript").getAttribute("data"); 
    var id=psGetUrlParameter("id");
    getTeaDetialById(id,paras);
});
/*
 * 分析url获取参数的方法
 */
function psGetUrlParameter(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}
/*
 * 得到详细信息的方法
 * 参数：本条信息的id
 */
function getTeaDetialById(id,userType){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/getUserDetialByIdJs";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{id:id},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            //alert(resultAnaly);
            fillUserDetial(userType,resultAnaly);
        }
    });
}
/*
 * 将数据填充页面的方法
 * 参数：用户类型、详细信息
 */
function fillUserDetial(userType,data){
    $("#inputUserId").val(data[0]["user_id"]);
    $("#inputUserAccountId").val(data[0]["user_account_id"]);
    $("#inputTeaName").val(data[0]["user_name"]);
    $("#selectSex").val(data[0]["user_sex"]);
    $("#inputTeaAccount").val(data[0]["user_account"]);
    $("#inputTeaPwd").val(data[0]["user_account_pwd"]);
    $("#inputTeaJobNum").val(data[0]["user_num"]);
    $("#inputTeaIdCardNum").val(data[0]["user_idcard_num"]);
    $("#inputTeaPhone").val(data[0]["phonenum"]);
    $("#inputTeaEmail").val(data[0]["email"]);
    $("#inputTeaWeixin").val(data[0]["weixin"]);
    $("#inputTeaQQ").val(data[0]["qq"]);
    $("#selectTeaOrga").val(data[0]["organization_id"]);
    $("#selectTeaCollege").val(data[0]["college_id"]);
    $("#selectTeaRole").val(data[0]["user_role_id"]);
    if(userType==1){        
        $("#selectTeaDuty").val(data[0]["user_duty"]);        
    }
    else{        
        $("#inputInnoNum").val(data[0]["innovation_num"]);        
    }
}


