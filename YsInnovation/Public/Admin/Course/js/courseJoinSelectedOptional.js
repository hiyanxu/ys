/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Course/joinCourseSelectedOptional"
    $("#btnSelectAll").click(function(){
        if($(".inputCheckbox").attr("checked")){
            $(".inputCheckbox").removeAttr("checked","checked");
        }
        else{
            $(".inputCheckbox").attr("checked",true);
        }
    });
    $("#inputAddCourse").click(function(){
        var ids="";
        for(var i=0;i<10;i++)
        {
            if($("#checkboxUserSelect_"+i).attr("checked"))
            {
                ids=ids+"|"+$("#hiddenInfoId_"+i).val();
            }
        }
        if(ids==""){
            alert("请选择删除项！");
            return;
        }        
        if(confirm("确定将这些课程加入可选课程中吗？")){
            $.ajax({
                type:"POST",
                dataType:"JSON",
                data:{ids:ids},
                url:ajax_url,
                success:function(result){
                    if(result==1){
                        alert("加入开放选课列表成功！");
                        window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/Course/showOpenSelectCourse";
                    }
                },
                error:function(){
                    alert("系统出错，请重试！");
                }
            });
        }
        else{
            return;
        }
    });
});

