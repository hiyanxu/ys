/* 
 * 讲座修改后保存的js文件
 * 传入参数：管理员级别
 */
$(function(){
    var adminRole=document.getElementById("editSaveScript").getAttribute("data");
    $("#btnSave").click(function(){
        if(adminRole=="sadmin"){
            var org=$("#selectLectureOrg").val();
        }
        else if(adminRole=="orgadmin"){
            var org=getCookie("user_org");
        }
        editSave(org);
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
 * 修改后保存的方法
 */
function editSave(org){    
    var id=$("#inputHiddenId").val();
    var name=$("#inputLectureName").val();
    var time=$("#inputLectureTime").val();
    var speaker=$("#inputLectureSpeaker").val();
    var speakerDuty=$("#selectLectureSpeakerDuty").val();
    var speakerCollege=$("#selectLectureSpeakerCollege").val();
    var ubtakeCollege=$("#selectLectureUbdertakeCollege").val();
    var scope=$("#selectLectureScope").val();
    var place=$("#inputLecturePlace").val();
    var desc=$("#areaLectureDesc").val();
     
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Lecture/editSaveJs";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{id:id,name:name,time:time,speaker:speaker,speakerDuty:speakerDuty,speakerCollege:speakerCollege,ubtakeCollege:ubtakeCollege,
        scope:scope,place:place,org:org,desc:desc},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            //alert(resultAnaly);
            if(resultAnaly=="success"){
                alert("修改成功！");
            }
            else if(resultAnaly=="error"){
                alert("修改失败！");
            }
        },
        error:function(){
            alert("系统发生错误！");
        }
    });
}


