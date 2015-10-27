/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * 得到课程的详细信息
 * 包括课程当前选择人数
 */
$(function(){
    var id=psGetUrlParameter("id");
    alert(id);
    $("#hiddenId").val(id);
    getCourseDetial(id);
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
 * 参数：
 *  课程id
 * 返回：
 *  课程的一系列信息，包括课程的选择人数
 */
function getCourseDetial(id){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Course/getCourseDetial";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{id:id},
        url:ajax_url,
        success:function(result){
            alert(result);
        }
    });
}