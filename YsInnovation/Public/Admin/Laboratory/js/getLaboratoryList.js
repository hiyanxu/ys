/* 
 * 获取实验室列表
 */
$(function(){
    var adminRole=document.getElementById("getLectureListScript").getAttribute("data");
    if(adminRole=="sadmin"){
        var org="all";
    }
    else if(adminRole=="orgadmin"){
        var org=getCookie("user_org");
    }
    makePage(1,org,adminRole);
    newData(1,10,org,adminRole);
});

var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Laboratory/getLaboratoryListJs";
function makePage(pageNum,org,adminRole){    
    var ajax_url_count="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Laboratory/getLaboratoryCountJs";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{org:org},
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
                    newData(pageNumber,pageSize,org,adminRole);
                    $(this).pagination('loaded'); 
                    makePage(pageNumber,org,adminRole);
                }
            });
        },
        error:function(){
            alert("系统出现错误，请重新登录");
            window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/Login/login";
        }
    });
}

function newData(pageNumber,pageSize,org,adminRole){
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{org:org,page:pageNumber,rows:pageSize},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
//            alert(resultAnaly[0]["tea_in_charge_name"]);
//            alert("haha");
            bindInfoList(resultAnaly,adminRole);
        }
    });
}


function bindInfoList(data,adminRole){
    $(".listItemData").empty();
    if(data==""){
        $(".listItemData").html("您好，当前条件下没有信息！");
        return;
    }
    else{
        if(adminRole=="sadmin"){
            for(var i=0;i<data.length;i++){
                var infoList=$('<div class="divListItemData">'
                +'<input type="hidden" id="hiddenInfoId_'+i+'" value="'+data[i]["course_id"]+'">'
                +'<input class="inputCheckbox" type="checkbox" id="checkboxUserSelect_'+i+'">'
                +'<div id="dataName" class="itemNameNoBold">'+data[i]["organization_name"]+'</div>'
                +'<div id="dataEngName" class="itemNameNoBold">'+data[i]["organization_english_name"]+'</div>'
                +'<div id="dataLaboratoryTeaInCharge" class="itemNameNoBold">'+data[i]["tea_in_charge_name"]+'</div>'
                +'<div id="dataLaboratoryStuInCharge" class="itemNameNoBold">'+data[i]["stu_in_charge_name"]+'</div>'
                +'<div id="dataInnoNum" class="itemNameNoBold">'+data[i]["organization_inno_num"]+'</div>'
                +'<div id="dataOrg" class="itemNameNoBold">'+data[i]["college_name"]+'</div>'
                +'<div id="dataOperations">'
                    +'<a id="btnEdit" href="showEditOrg?id='+data[i]["organization_id"]+'" class="button border-blue button-little" style="position:absolute; margin-left: 0px; margin-top: 7px;">修改</a>'                    
                +'</div>'
                +'</div>');
            
                $(".listItemData").append(infoList);
            }
        }
        else if(adminRole=="orgadmin"){
            for(var i=0;i<data.length;i++){
                var infoList=$('<div class="divListItemData">'
                +'<input type="hidden" id="hiddenInfoId_'+i+'" value="'+data[i]["course_id"]+'">'
                +'<input class="inputCheckbox" type="checkbox" id="checkboxUserSelect_'+i+'">'
                +'<div id="dataName" class="itemNameNoBold">'+data[i]["organization_name"]+'</div>'
                +'<div id="dataEngName" class="itemNameNoBold">'+data[i]["organization_english_name"]+'</div>'
                +'<div id="dataLaboratoryTeaInCharge" class="itemNameNoBold">'+data[i]["tea_in_charge_name"]+'</div>'
                +'<div id="dataLaboratoryStuInCharge" class="itemNameNoBold">'+data[i]["stu_in_charge_name"]+'</div>'
                +'<div id="dataInnoNum" class="itemNameNoBold">'+data[i]["organization_inno_num"]+'</div>'
                +'<div id="dataOrg" class="itemNameNoBold">'+data[i]["college_name"]+'</div>'
                +'<div id="dataOperations">'
                    +'<a id="btnEdit" href="showMaintainOrg?id='+data[i]["organization_id"]+'" class="button border-blue button-little" style="position:absolute; margin-left: 0px; margin-top: 7px;">信息完善</a>'                    
                +'</div>'
                +'</div>');
            
                $(".listItemData").append(infoList);
            }
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



