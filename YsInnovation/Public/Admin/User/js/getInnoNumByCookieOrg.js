/* 
 * 根据实验室的cookie信息得到实验室的创新账号
 */
$(function(){
    var org=getCookie("user_org");
    getInnoNumByOrg(org);
    //当创新账号输入框失去焦点的触发事件
    $("#inputInnoNum").blur(function(){
        var innoNum=$("#inputInnoNum").val();
        checkInnoNumIsRight(org,innoNum);
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
 * 得到实验室的创新账号的方法
 */
function getInnoNumByOrg(orgId){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Laboratory/getInnoNumByOrgJs";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{orgId:orgId},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            //alert(resultAnaly);
            $("#labelInnoNum").text(resultAnaly[0]["organization_inno_num"]);
        }
    });
}
/*
 * 检查创新账号输入是否在输入域中
 */
function checkInnoNumIsRight(orgId,innoNum){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Laboratory/getInnoNumByOrgJs";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{orgId:orgId},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            //alert(resultAnaly);
            //$("#labelInnoNum").text(resultAnaly[0]["organization_inno_num"]);
            var innoNumRanges=resultAnaly[0]["organization_inno_num"];
            var innoNumRangesArr=innoNumRanges.split("-");
            if(innoNum<innoNumRangesArr[0]||innoNum>innoNumRangesArr[1]){
                alert("请输入有效范围内的创新账号！");
                $("#inputInnoNum").val("");
                $("#inputInnoNum").focus();
            }
        }
    });
}

