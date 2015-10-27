/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    makePage(1);
});       
var ajax_url_all='http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Semester/getAllSemesterData';
var ajax_url_count="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Semester/getAllSemesterDataCount";

//EasyUI分页的实现
function makePage(pageNum){
    $.ajax({
        type:"POST",
        url:ajax_url_count,
        dataType:"JSON",
        success:function(result){
            var semeSum=result[0]["count(*)"];
            alert(semeSum);
            $("#semePageList").pagination({
                total:semeSum,
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
        }
    });
}

//初始加载时信息显示
function newData(pageNumber,pageSize){
    $.ajax({
        type:"POST",
        url:ajax_url,
        data:{page:pageNumber,rows:pageSize},
        dataType:"JSON",
        success:function(result){
            bindInfoList(result);
        }
    });
}

//将获得的信息添加到页面进行显示
function bindInfoList(data){
    $("#listItemData").empty();
    if(data==""){
        $("#listItemData").append("您好，当前条件下没有任何信息。");
        return;
    }
    else{
        for(var i=0; i<data.length;i++){
            var infoList=$('<div class="divListItemData">'
            +'<input type="checkbox" id='+i+'>'
            +'<div id="dataName" class="itemNameNoBold">'+data[i]['semester_name']+'</div>'
            +'<div id="dataWeek" class="itemNameNoBold">'+data[i]['semester_week_num']+'</div>'
            +'<div id="dataTime" class="itemNameNoBold">'+data[i]['semester_begin_time']+'</div>'
            +'<div id="dataOperations">'
                +'<a href="" class="button border-blue button-little" style="position:absolute; margin-left: 0px; margin-top: 7px;">修改</a>'
                +'<a href="" class="button border-yellow button-little" style="position:absolute; margin-left: 16%; margin-top: 7px;">删除</a>'
            +'</div>'
            +'</div>');
            $("#listItemData").append(infoList);
        }
    }
    
}

         

