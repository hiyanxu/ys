/* 
 * 获取讲座列表的js文件
 * 根据传入参数的不同，得到当前传入页面的管理员级别、所需查询的当前状态
 */
$(function(){
    var paras=document.getElementById("getLectureListScript").getAttribute("data");
    var parasArr=paras.split("&");    
    var adminRole=parasArr[0];
    var status=parasArr[1];
    var org;
    
    if(adminRole=="1"){
        org=$("#operSelectLectureOrga").val();
    }
    else{
        org=getCookie("user_org");
    }
    newData(1,10,status,adminRole,org);
    makePage(1,status,adminRole,org);
    $("#operSelectLectureOrga").change(function(){
        var orgId=$("#operSelectLectureOrga").val();
        changeCondition(status,adminRole,orgId);
        makePage(1,status,adminRole,orgId);
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
 * 分页的函数
 */
var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Lecture/getLectureListDataJs";
function makePage(pageNum,statusId,adminRole,org){  
    var ajax_url_count="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Lecture/getLectureCountJs";
    var status=statusId;
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
                    newData(pageNumber,pageSize,statusId,adminRole,org);
                    $(this).pagination('loaded'); 
                    makePage(pageNumber,statusId,adminRole,org);
                }
            });
        },
        error:function(){
            alert("系统出现错误，请重新登录");
            window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/Login/login";
        }
    });
}
/*
 * 获取具体信息的方法
 */
function newData(pageNumber,pageSize,statusId,adminRole,org){
    var status=statusId;
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
/*
 * 条件改变后获取信息的方法
 */
function changeCondition(statusId,adminRole,org){
    var status=statusId;
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
/*
 * 填充页面信息的方法
 */
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
                +'<input type="hidden" id="hiddenInfoId_'+i+'" value="'+data[i]["lecture_id"]+'">'
                +'<input class="inputCheckbox" type="checkbox" id="checkboxUserSelect_'+i+'">'
                +'<div id="dataName" class="itemNameNoBold">'+data[i]["lecture_name"]+'</div>'
                +'<div id="dataBeginTime" class="itemNameNoBold">'+data[i]["lecture_time"]+'</div>'
                +'<div id="dataPlace" class="itemNameNoBold">'+data[i]["lecture_place"]+'</div>'
                +'<div id="dataSpeaker" class="itemNameNoBold">'+data[i]["speaker"]+'</div>'
                +'<div id="dataScope" class="itemNameNoBold">'+data[i]["lecture_scope"]+'</div>'
                +'<div id="dataOrg" class="itemNameNoBold">'+data[i]["org_name"]+'</div>'
                +'<div id="dataStatus" class="itemNameNoBold">审核通过</div>'
                +'<div id="dataOperations">'
                    +'<a id="btnEdit" href="showEditLecture?id='+data[i]["lecture_id"]+'" class="button border-blue button-little" style="position:absolute; margin-left: 0px; margin-top: 7px;">修改</a>'
                    +'<a href="" onclick="del('+data[i]["lecture_id"]+');" class="button border-yellow button-little" style="position:absolute; margin-left: 16%; margin-top: 7px;">删除</a>'
                +'</div>'
                +'</div>');
            }
            else if(statusId==2&&adminRole==1){
                var infoList=$('<div class="divListItemData">'
                +'<input type="hidden" id="hiddenInfoId_'+i+'" value="'+data[i]["lecture_id"]+'">'
                +'<input class="inputCheckbox" type="checkbox" id="checkboxUserSelect_'+i+'">'
                +'<div id="dataName" class="itemNameNoBold">'+data[i]["lecture_name"]+'</div>'
                +'<div id="dataBeginTime" class="itemNameNoBold">'+data[i]["lecture_time"]+'</div>'
                +'<div id="dataPlace" class="itemNameNoBold">'+data[i]["lecture_place"]+'</div>'
                +'<div id="dataSpeaker" class="itemNameNoBold">'+data[i]["speaker"]+'</div>'
                +'<div id="dataScope" class="itemNameNoBold">'+data[i]["lecture_scope"]+'</div>'
                +'<div id="dataOrg" class="itemNameNoBold">'+data[i]["org_name"]+'</div>'
                +'<div id="dataStatus" class="itemNameNoBold">待审核</div>'
                +'<div id="dataOperations">'
                    +'<a href="showExamineLecture?id='+data[i]["lecture_id"]+'" class="button border-green button-little" style="position:absolute; margin-left: 0px; margin-top: 7px;">审核</a>'
                    +'<a id="btnEdit" href="showEditLecture?id='+data[i]["lecture_id"]+'" class="button border-blue button-little" style="position:absolute; margin-left: 16%; margin-top: 7px;">修改</a>'
                    +'<a href="" onclick="del('+data[i]["lecture_id"]+');" class="button border-yellow button-little" style="position:absolute; margin-left: 32%; margin-top: 7px;">删除</a>'                    
                +'</div>'
                +'</div>');
            }
            else if(statusId==3&&adminRole==2){
                var infoList=$('<div class="divListItemData">'
                +'<input type="hidden" id="hiddenInfoId_'+i+'" value="'+data[i]["lecture_id"]+'">'
                +'<input class="inputCheckbox" type="checkbox" id="checkboxUserSelect_'+i+'">'
                +'<div id="dataName" class="itemNameNoBold">'+data[i]["lecture_name"]+'</div>'
                +'<div id="dataBeginTime" class="itemNameNoBold">'+data[i]["lecture_time"]+'</div>'
                +'<div id="dataPlace" class="itemNameNoBold">'+data[i]["lecture_place"]+'</div>'
                +'<div id="dataSpeaker" class="itemNameNoBold">'+data[i]["speaker"]+'</div>'
                +'<div id="dataScope" class="itemNameNoBold">'+data[i]["lecture_scope"]+'</div>'
                +'<div id="dataOrg" class="itemNameNoBold">'+data[i]["org_name"]+'</div>'
                +'<div id="dataStatus" style="margin-left:72%;" class="itemNameNoBold">审核未通过</div>'
                +'<div id="dataOperations" style="position:absolute; margin-left: 80%; margin-top: 0px; width: 20%; height: 40px;">'
                    +'<a id="btnEdit" href="showOrgAdvice?id='+data[i]["lecture_id"]+'" class="button border-green button-little" style="position:absolute; margin-left: 0px; margin-top: 7px;">意见查看</a>'
                    +'<a id="btnEdit" href="showOrgEditLecture?id='+data[i]["lecture_id"]+'" class="button border-blue button-little" style="position:absolute; margin-left: 26%; margin-top: 7px;">修改</a>'
                    +'<a href="" onclick="del('+data[i]["lecture_id"]+');" class="button border-yellow button-little" style="position:absolute; margin-left: 42%; margin-top: 7px;">删除</a>'
                    +'<a href="" onclick="postExam('+data[i]["lecture_id"]+');" class="button border-blue button-little" style="position:absolute; margin-left: 58%; margin-top: 7px;">提交审核</a>'
                +'</div>'
                +'</div>');
            }
            else if(statusId==2&&adminRole==2){
                var infoList=$('<div class="divListItemData">'
                +'<input type="hidden" id="hiddenInfoId_'+i+'" value="'+data[i]["lecture_id"]+'">'
                +'<input class="inputCheckbox" type="checkbox" id="checkboxUserSelect_'+i+'">'
                +'<div id="dataName" class="itemNameNoBold">'+data[i]["lecture_name"]+'</div>'
                +'<div id="dataBeginTime" class="itemNameNoBold">'+data[i]["lecture_time"]+'</div>'
                +'<div id="dataPlace" class="itemNameNoBold">'+data[i]["lecture_place"]+'</div>'
                +'<div id="dataSpeaker" class="itemNameNoBold">'+data[i]["speaker"]+'</div>'
                +'<div id="dataScope" class="itemNameNoBold">'+data[i]["lecture_scope"]+'</div>'
                +'<div id="dataOrg" class="itemNameNoBold">'+data[i]["org_name"]+'</div>'
                +'<div id="dataStatus" class="itemNameNoBold">待审核</div>'
                +'<div id="dataOperations">'
                    +'<a id="btnEdit" href="showOrgEditLecture?id='+data[i]["lecture_id"]+'" class="button border-blue button-little" style="position:absolute; margin-left: 0px; margin-top: 7px;">修改</a>'
                    +'<a href="" onclick="del('+data[i]["lecture_id"]+');" class="button border-yellow button-little" style="position:absolute; margin-left: 16%; margin-top: 7px;">删除</a>'
                +'</div>'
                +'</div>');
            }
            else if(statusId==1&&adminRole==2){
                var infoList=$('<div class="divListItemData">'
                +'<input type="hidden" id="hiddenInfoId_'+i+'" value="'+data[i]["lecture_id"]+'">'
                +'<input class="inputCheckbox" type="checkbox" id="checkboxUserSelect_'+i+'">'
                +'<div id="dataName" class="itemNameNoBold">'+data[i]["lecture_name"]+'</div>'
                +'<div id="dataBeginTime" class="itemNameNoBold">'+data[i]["lecture_time"]+'</div>'
                +'<div id="dataPlace" class="itemNameNoBold">'+data[i]["lecture_place"]+'</div>'
                +'<div id="dataSpeaker" class="itemNameNoBold">'+data[i]["speaker"]+'</div>'
                +'<div id="dataScope" class="itemNameNoBold">'+data[i]["lecture_scope"]+'</div>'
                +'<div id="dataOrg" class="itemNameNoBold">'+data[i]["org_name"]+'</div>'
                +'<div id="dataStatus" class="itemNameNoBold">审核通过</div>'
                +'<div id="dataOperations">'
                    +'<a id="btnEdit" href="showOrgEditLecture?id='+data[i]["lecture_id"]+'" class="button border-blue button-little" style="position:absolute; margin-left: 0px; margin-top: 7px;">修改</a>'
                    +'<a href="" onclick="del('+data[i]["lecture_id"]+');" class="button border-yellow button-little" style="position:absolute; margin-left: 16%; margin-top: 7px;">删除</a>'
                +'</div>'
                +'</div>');
            }
            $(".listItemData").append(infoList);
        }
    }
}

/*
 * 提交审核的方法
 */
function postExam(id){
    var ajax_post_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Lecture/postExamine";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{id:id},
        url:ajax_post_url,
        success:function(result){
            var resultAnaly=eval(result);
            if(resultAnaly=="success"){
                alert("成功提交审核！");
            }
            else if(resultAnaly=="error"){
                alert("提交审核失败，请重试！");
            }
        }
    });
}



