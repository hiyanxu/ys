/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){    
    var paras=document.getElementById("getCourseListScript").getAttribute("data");    //得到statusId
    var paraSplit=paras.split("&");
    var statusId=paraSplit[0];
    var adminRole=paraSplit[1];
    newData(1,10,statusId,adminRole);
    makePage(1,statusId,adminRole);
    $("#operSelectCourseOrga").change(function(){
        changeCondition(statusId,adminRole);
        makePage(1,statusId,adminRole);
    });
});

var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Course/getCourseListData";
function makePage(pageNum,statusId,adminRole){    
    var ajax_url_count="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Course/getCourseCount";
    var status=statusId;
    var org=$("#operSelectCourseOrga").val();
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{status:status,org:org},
        url:ajax_url_count,
        success:function(result){
            var resultAnaly=eval(result);
            var sum=resultAnaly[0]["count(*)"];
            $("#semePageList").pagination({
                total:sum,
                pageSize:10,
                showPageList:false,
                beforePageText:"第",
                afterPageText:"共{pages}页",
                pageNumber:pageNum,
                onSelectPage:function(pageNumber,pageSize){
                    $(this).pagination('loading');
                    newData(pageNumber,pageSize,statusId,adminRole);
                    $(this).pagination('loaded'); 
                    makePage(pageNumber,statusId,adminRole);
                }
            });
        },
        error:function(){
            alert("系统出现错误，请重新登录");
            window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/Login/login";
        }
    });
}

function newData(pageNumber,pageSize,statusId,adminRole){
    var status=statusId;
    var org=$("#operSelectCourseOrga").val();
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{status:status,org:org,page:pageNumber,rows:pageSize},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            //alert(resultAnaly[0]["speaker_name"]);
            bindInfoList(resultAnaly,statusId,adminRole);
        }
    });
}


function changeCondition(statusId,adminRole){
    var status=statusId;
    var org=$("#operSelectCourseOrga").val();
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{status:status,org:org,page:1,rows:10},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            //alert(resultAnaly[0]["speaker_name"]);
            bindInfoList(resultAnaly,statusId,adminRole);
        }
    });
}

function bindInfoList(data,statusId,adminRole){
    $(".listItemData").empty();
    if(data==""){
        $(".listItemData").html("您好，当前条件下没有信息！");
        return;
    }
    else{
        for(var i=0;i<data.length;i++){
            if(statusId==1&&adminRole==1){
                var infoList=$('<div class="divListItemData">'
                +'<input type="hidden" id="hiddenInfoId_'+i+'" value="'+data[i]["course_id"]+'">'
                +'<input class="inputCheckbox" type="checkbox" id="checkboxUserSelect_'+i+'">'
                +'<div id="dataName" class="itemNameNoBold">'+data[i]["course_name"]+'</div>'
                +'<div id="dataSpeaker" class="itemNameNoBold">'+data[i]["speaker_name"]+'</div>'
                +'<div id="dataPeriod" class="itemNameNoBold">'+data[i]["course_period"]+'</div>'
                +'<div id="dataScore" class="itemNameNoBold">'+data[i]["course_score"]+'</div>'
                +'<div id="dataPlace" class="itemNameNoBold">'+data[i]["course_place"]+'</div>'
                +'<div id="dataOrg" class="itemNameNoBold">'+data[i]["org_name"]+'</div>'
                +'<div id="dataWhoAdd" class="itemNameNoBold">'+data[i]["who_add_name"]+'</div>'
                +'<div id="dataStatus" class="itemNameNoBold">审核通过</div>'
                +'<div id="dataOperations">'
                    +'<a id="btnEdit" href="showEditCourse?id='+data[i]["course_id"]+'" class="button border-blue button-little" style="position:absolute; margin-left: 0px; margin-top: 7px;">修改</a>'
                    +'<a href="" onclick="del('+data[i]["course_id"]+');" class="button border-yellow button-little" style="position:absolute; margin-left: 16%; margin-top: 7px;">删除</a>'
                +'</div>'
                +'</div>');
            }
            else if(statusId==2&&adminRole==1){
                var infoList=$('<div class="divListItemData">'
                +'<input type="hidden" id="hiddenInfoId_'+i+'" value="'+data[i]["course_id"]+'">'
                +'<input class="inputCheckbox" type="checkbox" id="checkboxUserSelect_'+i+'">'
                +'<div id="dataName" class="itemNameNoBold">'+data[i]["course_name"]+'</div>'
                +'<div id="dataSpeaker" class="itemNameNoBold">'+data[i]["speaker_name"]+'</div>'
                +'<div id="dataPeriod" class="itemNameNoBold">'+data[i]["course_period"]+'</div>'
                +'<div id="dataScore" class="itemNameNoBold">'+data[i]["course_score"]+'</div>'
                +'<div id="dataPlace" class="itemNameNoBold">'+data[i]["course_place"]+'</div>'
                +'<div id="dataOrg" class="itemNameNoBold">'+data[i]["org_name"]+'</div>'
                +'<div id="dataWhoAdd" class="itemNameNoBold">'+data[i]["who_add_name"]+'</div>'
                +'<div id="dataStatus" class="itemNameNoBold">待审核</div>'
                +'<div id="dataOperations">'
                    +'<a href="showExamineCourse?id='+data[i]["course_id"]+'" class="button border-green button-little" style="position:absolute; margin-left: 0px; margin-top: 7px;">审核</a>'
                    +'<a id="btnEdit" href="showEditCourse?id='+data[i]["course_id"]+'" class="button border-blue button-little" style="position:absolute; margin-left: 16%; margin-top: 7px;">修改</a>'
                    +'<a href="" onclick="del('+data[i]["course_id"]+');" class="button border-yellow button-little" style="position:absolute; margin-left: 32%; margin-top: 7px;">删除</a>'
                +'</div>'
                +'</div>');
            }
            else if(statusId==3&&adminRole==2){
                var infoList=$('<div class="divListItemData">'
                +'<input type="hidden" id="hiddenInfoId_'+i+'" value="'+data[i]["course_id"]+'">'
                +'<input class="inputCheckbox" type="checkbox" id="checkboxUserSelect_'+i+'">'
                +'<div id="dataName" class="itemNameNoBold">'+data[i]["course_name"]+'</div>'
                +'<div id="dataSpeaker" class="itemNameNoBold">'+data[i]["speaker_name"]+'</div>'
                +'<div id="dataPeriod" class="itemNameNoBold">'+data[i]["course_period"]+'</div>'
                +'<div id="dataScore" class="itemNameNoBold">'+data[i]["course_score"]+'</div>'
                +'<div id="dataPlace" class="itemNameNoBold">'+data[i]["course_place"]+'</div>'
                +'<div id="dataOrg" class="itemNameNoBold">'+data[i]["org_name"]+'</div>'
                +'<div id="dataWhoAdd" class="itemNameNoBold">'+data[i]["who_add_name"]+'</div>'
                +'<div id="dataStatus" class="itemNameNoBold">审核未通过</div>'
                +'<div id="dataOperations">'                    
                    +'<a id="btnEdit" href="showOrgEditCourse?id='+data[i]["course_id"]+'" class="button border-blue button-little" style="position:absolute; margin-left: 0px; margin-top: 7px;">修改</a>'
                    +'<a href="" onclick="del('+data[i]["course_id"]+');" class="button border-yellow button-little" style="position:absolute; margin-left: 16%; margin-top: 7px;">删除</a>'
                +'</div>'
                +'</div>');
            }
            else if(statusId==2&&adminRole==2){
                var infoList=$('<div class="divListItemData">'
                +'<input type="hidden" id="hiddenInfoId_'+i+'" value="'+data[i]["course_id"]+'">'
                +'<input class="inputCheckbox" type="checkbox" id="checkboxUserSelect_'+i+'">'
                +'<div id="dataName" class="itemNameNoBold">'+data[i]["course_name"]+'</div>'
                +'<div id="dataSpeaker" class="itemNameNoBold">'+data[i]["speaker_name"]+'</div>'
                +'<div id="dataPeriod" class="itemNameNoBold">'+data[i]["course_period"]+'</div>'
                +'<div id="dataScore" class="itemNameNoBold">'+data[i]["course_score"]+'</div>'
                +'<div id="dataPlace" class="itemNameNoBold">'+data[i]["course_place"]+'</div>'
                +'<div id="dataOrg" class="itemNameNoBold">'+data[i]["org_name"]+'</div>'
                +'<div id="dataWhoAdd" class="itemNameNoBold">'+data[i]["who_add_name"]+'</div>'
                +'<div id="dataStatus" class="itemNameNoBold">待审核</div>'
                +'<div id="dataOperations">'                    
                    +'<a id="btnEdit" href="showOrgEditCourse?id='+data[i]["course_id"]+'" class="button border-blue button-little" style="position:absolute; margin-left: 0px; margin-top: 7px;">修改</a>'
                    +'<a href="" onclick="del('+data[i]["course_id"]+');" class="button border-yellow button-little" style="position:absolute; margin-left: 16%; margin-top: 7px;">删除</a>'
                +'</div>'
                +'</div>');
            }
            $(".listItemData").append(infoList);
        }
    }
}

/*
 * onclick="edit('+data[i]["course_id"]+');"
 * 
function edit(courseId){
    var ajax_url_edit="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Course/getCourseById";    
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{id:courseId},
        url:ajax_url_edit,
        success:function(result){
            var resultAnaly=eval(result);
            alert(result);
        }
    });
}
*/

/*
 * 删除操作
 */
function del(courseId){
    var ajax_url_del="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Course/deleteCourse";
    if(confirm("确定要删除吗？")){
        $.ajax({
            type:"POST",
            dataType:"JSON",
            data:{id:courseId},
            url:ajax_url_del,
            success:function(result){
                var resultAnaly=eval(result);
                if(resultAnaly=="1"){
                    alert("信息删除成功！");
                    window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/Course/showExaminedList";
                }
                else{
                    alert("信息删除失败，请重试！");
                    window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/Course/showExaminedList";
                }
            }
        });
    }
    else{
        return false;
    }    
}