/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    var date=new Date();
    var semeCurren;  //当前学期
    var semeNext; //下个学期
    var yearNow=date.getFullYear();//得到当前年份
    var yearNext=yearNow+1;
    var yearNextTwo=yearNext+1;
    var mouthNow=date.getMonth();//得到当前月份
    if(mouthNow>=3&&mouthNow<=8){  //根据月份将划分出当前为春季学期还是秋季学期
        semeCurren=yearNow+"-"+yearNext+"/"+"0";
        semeNext=yearNow+"-"+yearNext+"/"+"1";
    }
    else{
        semeCurren=yearNow+"-"+yearNext+"/"+"1";
        semeNext=yearNext+"-"+yearNextTwo+"/"+"0";
    }
    getSemeIdByName(semeNext);
});

/*
 * 根据下一个学期得到下一学期在表中对应的主键id
 * 参数：下一个学期的学期名称
 */
function getSemeIdByName(semeName){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Semester/getSemeByName"
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{semeName:semeName},
        url:ajax_url,
        success:function(result){
            var resultAnaly=eval(result);
            //alert(resultAnaly[0]["semester_id"]);
            //getCourseBySemeNextId(resultAnaly[0]["semester_id"]);            
            newData(1,10,resultAnaly[0]["semester_id"]);
            makePage(1,resultAnaly[0]["semester_id"]);
        }
    });
}

function makePage(pageNum,semeId){    
    var ajax_url_count="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Course/getCourseCountBySeme";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{semeId:semeId},
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
                    newData(pageNumber,pageSize,semeId);
                    $(this).pagination('loaded'); 
                    makePage(pageNumber,semeId);
                }
            });
        },
        error:function(){
            alert("系统出现错误，请重新登录");
            window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/Login/login";
        }
    });
}

function newData(pageNumber,pageSize,semeId){
    var ajax_url="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Course/getCourseBySemeId";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{semeId:semeId,page:pageNumber,rows:pageSize},
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
                +'<div id="dataStatus" class="itemNameNoBold">审核通过</div>'                
                +'</div>');
            $(".listItemData").append(infoList);
        }
    }
}

/*
 * 根据学期id得到所有即将作为学期开设的课程
 * 参数：下一学期的主键id
 * 返回：所有属于下一学期开设的课程
 * 目前没有用到这个方法
 */
function getCourseBySemeNextId(id){
    var ajax_url_course="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/Course/getCourseBySemeId";
    $.ajax({
        type:"POST",
        dataType:"JSON",
        data:{id:id},
        url:ajax_url_course,
        success:function(result){
            alert(result);
        },
        error:function(){
            alert("系统出错，请重试！");
        }
    });
}
