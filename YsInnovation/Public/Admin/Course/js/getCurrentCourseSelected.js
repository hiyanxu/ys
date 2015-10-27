/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * 得到正在被选的课程的课程列表
 */
$(function(){
    makePage(1);
    newData(1,10);
});

function makePage(pageNum){    
    var ajax_url_count="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Course/getCurrentCourseSelectedCount";
    $.ajax({
        type:"POST",
        dataType:"JSON",
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
                    newData(pageNumber,pageSize);
                    $(this).pagination('loaded'); 
                    makePage(pageNumber);
                }
            });
        },
        error:function(){
            alert("系统出现错误，请重新登录");
            window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/Login/login";
        }
    });
}

function newData(pageNumber,pageSize){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Course/getCurrentCourseSelected";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{page:pageNumber,rows:pageSize},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            //alert(resultAnaly[0]["speaker_name"]);
            bindInfoList(resultAnaly);
        }
    });
}

function bindInfoList(data){
    $(".listItemData").empty();
    if(data==""){
        $(".listItemData").html("您好，当前条件下没有信息！");
        return;
    }
    else{
        for(var i=0;i<data.length;i++){
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
                +'<div id="dataStatus" class="itemNameNoBold">开放选课中</div>'  
                +'<div id="dataOperations">'
                    +'<a id="btnEdit" href="showCourseDetial?id='+data[i]["course_id"]+'" class="button border-blue button-little" style="position:absolute; margin-left: 0px; margin-top: 7px;">详细信息</a>'                    
                +'</div>'
                +'</div>');
            $(".listItemData").append(infoList);
        }
    }
}

/*
 * 得到当前正在被选的课程的课程列表
 */
function getCurrentCourseSelected(){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Course/examineCourseSave";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        url:ajax_url,
        success:function(result){
            alert(result);
        }
    });
}

