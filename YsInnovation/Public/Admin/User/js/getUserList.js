/* 
 * 列表显示js文件：
 * 根据传递过来的参数判断当前列表显示是学生列表还是教师列表
 */
$(function(){
    var paras=document.getElementById("getUserListScript").getAttribute("data");    //当前类型参数
    newData(1,10,paras);
    makePage(1,paras);
    $("#operSelectCourseOrga").change(function(){
        changeCondition(paras);
        makePage(1,paras);
    });
});

var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/getUserDataJs";
function makePage(pageNum,userType){    
    var ajax_url_count="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/getUserCountJs";    
    var org=$("#operSelectCourseOrga").val();
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{userType:userType,org:org},
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
                    newData(pageNumber,pageSize,userType);
                    $(this).pagination('loaded'); 
                    makePage(pageNumber,userType);
                }
            });
        },
        error:function(){
            alert("系统出现错误，请重新登录");
            window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/Login/login";
        }
    });
}

function newData(pageNumber,pageSize,userType){    
    var org=$("#operSelectCourseOrga").val();
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{userType:userType,org:org,page:pageNumber,rows:pageSize},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            bindInfoList(resultAnaly,userType);
        },
        error:function(){
            alert("系统发生错误，请重试！");
        }
    });
}

function changeCondition(userType){
    var org=$("#operSelectCourseOrga").val();
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{userType:userType,org:org,page:1,rows:10},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            //alert(resultAnaly[0]["speaker_name"]);
            bindInfoList(resultAnaly,userType);
        }
    });
}

function bindInfoList(data,userType){
    $(".listItemData").empty();
    if(data==""){
        $(".listItemData").html("您好，当前条件下没有信息！");
        return;
    }
    else{
        for(var i=0;i<data.length;i++){
            if(userType==1){
                var infoList=$('<div class="divListItemData">'
                +'<input type="hidden" id="hiddenInfoId_'+i+'" value="'+data[i]["user_id"]+'">'
                +'<input class="inputCheckbox" type="checkbox" id="checkboxUserSelect_'+i+'">'
                +'<div id="dataName" class="itemNameNoBold">'+data[i]["user_name"]+'</div>'
                +'<div id="dataSex" class="itemNameNoBold">'+data[i]["user_sex"]+'</div>'
                +'<div id="dataDuty" class="itemNameNoBold">'+data[i]["duty_name"]+'</div>'
                +'<div id="dataPhone" class="itemNameNoBold">'+data[i]["user_account"]+'</div>'
                +'<div id="dataEmail" class="itemNameNoBold">'+data[i]["phonenum"]+'</div>'
                +'<div id="dataOrg" class="itemNameNoBold">'+data[i]["org_name"]+'</div>'
                +'<div id="dataOperations">'
                    +'<a id="btnEdit" href="showEditTea?id='+data[i]["user_id"]+'" class="button border-blue button-little" style="position:absolute; margin-left: 0px; margin-top: 7px;">修改</a>'                    
                +'</div>'
                +'</div>');
            }
            else if(userType==0){
                var infoList=$('<div class="divListItemData">'
                +'<input type="hidden" id="hiddenInfoId_'+i+'" value="'+data[i]["user_id"]+'">'
                +'<input class="inputCheckbox" type="checkbox" id="checkboxUserSelect_'+i+'">'
                +'<div id="dataName" class="itemNameNoBold">'+data[i]["user_name"]+'</div>'
                +'<div id="dataSex" class="itemNameNoBold">'+data[i]["user_sex"]+'</div>'
                +'<div id="dataDuty" class="itemNameNoBold">'+data[i]["user_num"]+'</div>'
                +'<div id="dataPhone" class="itemNameNoBold">'+data[i]["user_account"]+'</div>'
                +'<div id="dataEmail" class="itemNameNoBold">'+data[i]["phonenum"]+'</div>'
                +'<div id="dataOrg" class="itemNameNoBold">'+data[i]["org_name"]+'</div>'
                +'<div id="dataOperations">'
                    +'<a id="btnEdit" href="showEditStu?id='+data[i]["user_id"]+'" class="button border-blue button-little" style="position:absolute; margin-left: 0px; margin-top: 7px;">修改</a>'                    
                +'</div>'
                +'</div>');
            }
            $(".listItemData").append(infoList);
        }
    }
}
