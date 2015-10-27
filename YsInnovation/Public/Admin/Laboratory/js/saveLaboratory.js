/* 
 * 实验室添加保存的js文件
 */
$(function(){
    $("#btnSave").click(function(){
        saveLaboratory();
    });
});
/*
 * 保存的方法
 */
function saveLaboratory(){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Laboratory/saveLaboratoryJs";
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
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{name:name,engName:engName,idea:idea,purpose:purpose,picture:picture,location:location,innoNum:innoNum,phone:phone,remark:remark,college:college,desc:desc},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            if(resultAnaly=="success"){
                alert("添加成功！");
                window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/Laboratory/showLaboratoryList";
            }
            else if(resultAnaly=="error"){
                alert("添加失败！");
                window.loation.href="/YsInnoCenter/YsInnovation/index.php/Admin/Laboratory/showLaboratoryList";
            }
            else if(resultAnaly=="提交方式错误，请确认！"){
                alert(resultAnaly);
            }
        }
    });
}

