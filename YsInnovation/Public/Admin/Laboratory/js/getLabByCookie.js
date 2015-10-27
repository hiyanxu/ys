/* 
 * 根据cookie信息得到登录人所在的管理教师
 */
$(function(){
    var org=getCookie("user_org");
    //alert(org);
    //getLabByCookie(1,10,org);
});
/*
 * 根据实验室id得到实验室列表信息
 */
function getLabByCookie(pageNumber,pageSize,org){
    var ajax_url=ajax_url_common+"Laboratory/getLaboratoryListJs";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{page:pageNumber,rows:pageSize,org:org},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            alert(resultAnaly);
        }
    });
}

