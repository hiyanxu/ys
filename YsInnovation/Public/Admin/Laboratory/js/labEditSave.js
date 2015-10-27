/* 
 * 实验室修改后保存的js文件
 */
$(function(){
    $("#btnSave").click(function(){
        labEditSave();
    });    
});
/*
 * 修改后保存的方法
 */
function labEditSave(){
    var id=$("#inputHiddenId").val();
    var name=$("#inputLaboratoryName").val();
    var engName=$("#inputLaboratoryEngName").val();
    var idea=$("#inputLaboratoryIdea").val();
    var purpose=$("#inputLaboratoryPurpose").val();
    var picture=$("#inputOrgPicture").val();
    var location=$("#inputLaboratoryLocation").val();
    var innoNum=$("#inputLaboratoryInnoNum").val();
    var phone=$("#inputLaboratoryPhone").val();
    var remark=$("#inputLaboratoryRemark").val();
    var college=$("#selectLaboratoryCollege").val();
    var desc=$("#areaLaboratoryDesc").val();
    
    var ajax_url=ajax_url_common+"Laboratory/labEditSaveJs";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{id:id,name:name,engName:engName,idea:idea,purpose:purpose,picture:picture,location:location,innoNum:innoNum,phone:phone,remark:remark,college:college,desc:desc},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            //alert(resultAnaly);
            if(resultAnaly=="success"){
                alertMes("修改成功！","/YsInnoCenter/YsInnovation/index.php/Admin/Laboratory/showLaboratoryList");
            }
            else{
                alertMes("修改失败！","/YsInnoCenter/YsInnovation/index.php/Admin/Laboratory/showLaboratoryList");
            }
        }
    });
}


