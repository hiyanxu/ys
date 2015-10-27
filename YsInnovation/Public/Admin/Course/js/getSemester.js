/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    getSemester();
});
//得到学期信息的函数
function getSemester(){
    $("#selectCourseSeme").empty();
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Semester/getSemeName";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);//得到解析后的json数据，以对象或数组的方式进行访问
            //alert(resultAnaly[0]['semester_id']);
            for(var i=0;i<resultAnaly.length;i++){
                var semeName=trans(resultAnaly[i]["semester_name"]);
                var infoList=$("<option value="+resultAnaly[i]["semester_id"]+">"+semeName+"</option>");
                $("#selectCourseSeme").append(infoList);
            }
        }
    });
}
/*
    将学期格式进行转换的函数
    参数形式：2014-2015/0
*/
function trans(str){
    var strTrans=str.split("/");
    var strTransYear=strTrans[0];
    var strTransSeas=strTrans[1];
    if(strTransSeas=="0"){
        strTransSeas="春";
    }
    else{
        strTransSeas="秋";
    }
    var strReturn=strTransYear+strTransSeas;
    return strReturn;
}


