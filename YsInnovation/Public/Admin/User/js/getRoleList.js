/* 
 * 获取角色列表的js文件
 */
$(function(){
    getRoles();
});
/*
 * 获取所有角色信息的方法
 */
function getRoles(){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/User/getRolesJs";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            //alert(resultAnaly);
            bindInfo(resultAnaly);
        }
    });
}
/*
 * 将信息进行填充的方法
 */
function bindInfo(data){
    $(".listItemData").empty();
    if(data==""){
        $(".listItemData").html("您好，当前条件下没有信息！");
        return;
    }
    for(var i=0;i<data.length;i++){
        var infoList=$('<div class="divListItemData">'
            +'<input type="hidden" id="hiddenInfoId_'+i+'" value="'+data[i]["role_id"]+'">'
            +'<input class="inputCheckbox" type="checkbox" id="checkboxUserSelect_'+i+'">'
            +'<div id="dataName" class="itemNameNoBold" style="position:absolute; margin-left:25%;">'+data[i]["role_name"]+'</div>'                
            +'<div id="dataOperations" style="position:absolute; margin-left:80%;">'
                +'<a href="showEditRole?id='+data[i]["role_id"]+'" class="button border-green button-little" style="position:absolute; margin-left: 0px; margin-top: 7px;">修改</a>'
                +'<a id="btnEdit" href="showMenuDistri?id='+data[i]["role_id"]+'" class="button border-blue button-little" style="position:absolute; margin-left: 16%; margin-top: 7px;">权限分配</a>'
                +'<a href="" onclick="del('+data[i]["role_id"]+');" class="button border-yellow button-little" style="position:absolute; margin-left: 42%; margin-top: 7px;">删除</a>'         
            +'</div>'
            +'</div>');
        $(".listItemData").append(infoList);
    }
}
