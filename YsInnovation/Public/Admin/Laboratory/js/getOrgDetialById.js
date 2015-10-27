/* 
 * 根据主键id获取详细信息的js文件
 */
$(function(){
    var id=psGetUrlParameter("id");   //引用公共函数库js文件中的方法，获取url中的参数
    //alert(id);
    getOrgDetialById(id);
});
/*
 * 根据主键id获取详细信息的方法
 */
function getOrgDetialById(id){
    var ajax_url=ajax_url_common+"Laboratory/getOrgDetialByIdJs";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{id:id},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            //alert(resultAnaly);
            bindInfo(resultAnaly);
        }
    });
}
/*
 * 填充页面信息的方法
 */
function bindInfo(data){
    $("#inputHiddenId").val(data[0]["organization_id"]);
    $("#inputLaboratoryName").val(data[0]["organization_name"]);
    $("#inputLaboratoryEngName").val(data[0]["organization_english_name"]);
    $("#inputLaboratoryIdea").val(data[0]["organization_idea"]);
    $("#inputLaboratoryPurpose").val(data[0]["organization_purpose"]);
    $("#inputOrgPicture").val(data[0]["organization_image"]);
    $("#inputLaboratoryLocation").val(data[0]["organization_loc"]);
    $("#inputLaboratoryInnoNum").val(data[0]["organization_inno_num"]);
    $("#inputLaboratoryPhone").val(data[0]["organization_tel"]);
    $("#inputLaboratoryRemark").val(data[0]["remark"]);
    $("#selectLaboratoryCollege").val(data[0]["lead_college_id"]);
    KindEditor.instances[0].html(data[0]["organization_desc"]);
    $("#areaLaboratoryDesc").val(data[0]["organization_desc"]);
}


