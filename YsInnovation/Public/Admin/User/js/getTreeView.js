/* 
 * 得到树状显示内容的js文件
 */
$(function(){
    getTreeView();
});
/*
 * 得到树状显示内容的方法
 */
function getTreeView(){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Index/getTreeViewJs";
    var pmenu;
    var smenu;
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{treeType:1},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            pmenu=resultAnaly;
        }
    });
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{treeType:2},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            bindInfo(pmenu,resultAnaly);
        }
    });       
}
/*
 * 将获得的信息填入页面显示
 */
function bindInfo(pmenu,smenu){
    for(var i=0;i<pmenu.length;i++){
        var pInfoList=$('<li><span id="spanPName" class="folder">'+pmenu[i]["menuitem_name"]+'</span><ul id="sul_'+i+'"></ul></li>');
        $("#modularAdminLeftTree").append(pInfoList);
        for(var j=0;j<smenu.length;j++){
            if(smenu[j]["top_menuitem_id"]==pmenu[i]["menuitem_id"]){
                var sInfoList=$('<li><input style="position:absolute; margin-left:3px;" type="checkbox" value='+smenu[j]["menuitem_id"]+'><a target="right" class="folder" >'+smenu[j]["menuitem_name"]+'</a></li>');   
                $("#sul_"+i+"").append(sInfoList);
            }                    
        }      
    }
}


