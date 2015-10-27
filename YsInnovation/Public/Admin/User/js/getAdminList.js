/* 
 * 得到管理员列表的js文件
 */
$(function(){
    newData(1,10);
    makePage(1);
});
var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/getAdminListJs";

function makePage(pageNum){    
    var ajax_url_count="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/getAdminCountJs";    
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
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{page:pageNumber,rows:pageSize},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            bindInfoList(resultAnaly);
        },
        error:function(){
            alert("系统发生错误，请重试！");
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
            +'<input type="hidden" id="hiddenInfoId_'+i+'" value="'+data[i]["user_id"]+'">'
            +'<input class="inputCheckbox" type="checkbox" id="checkboxUserSelect_'+i+'">'
            +'<div id="dataName" class="itemNameNoBold">'+data[i]["user_name"]+'</div>'
            +'<div id="dataSex" class="itemNameNoBold">'+data[i]["user_account"]+'</div>'
            +'<div id="dataDuty" class="itemNameNoBold" style="margin-left:35%;">'+data[i]["user_account_pwd"]+'</div>'
            +'<div id="dataPhone" class="itemNameNoBold" style="margin-left: 50%;">'+data[i]["role_name"]+'</div>'
            +'<div id="dataOperations">'
                +'<a id="btnEdit" href="showEditAdmin?id='+data[i]["user_account_id"]+'" class="button border-blue button-little" style="position:absolute; margin-left: 0px; margin-top: 7px;">修改</a>'    
                +'<a href="" onclick="del('+data[i]["user_account_id"]+');" class="button border-yellow button-little" style="position:absolute; margin-left: 16%; margin-top: 7px;">删除</a>'
            +'</div>'
            +'</div>');            
            $(".listItemData").append(infoList);
        }
    }
}


/*
 * 得到管理员列表
 */
function getAdminList(){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/getAdminListJs";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
        }
    });
}

/*
 * 删除按钮的事件
 */
function del(id){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/delAdminByIdJs";
    if(confirm("确定要删除吗？")){
        $.ajax({
            type:"POST",
            dataType:"JSON",
            data:{id:id},
            url:ajax_url,
            success:function(result){
                var resultAnaly=eval(result);
                //alert(resultAnaly);
                if(resultAnaly=="success"){
                    alert("删除成功！");
                    window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showAdminList";
                }
                else if(resultAnaly=="error"){
                    alert("删除失败！");
                    window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showAdminList";
                }
            }
        });
    }
    else{
        return false;
    }    
}

