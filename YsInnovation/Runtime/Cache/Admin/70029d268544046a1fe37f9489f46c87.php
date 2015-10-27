<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<!--
讲座审核页面显示
-->
<html>
    <head>
        <title>以升后台管理</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="<?php echo (SURL); ?>Public/Admin/Public/css/publicThr.css">
        <link rel="stylesheet" href="<?php echo (SURL); ?>Public/Admin/Lecture/css/showAddLecture.css">
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Public/js/jquery-1.4.2.js"></script>
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Public/My97DatePicker/WdatePicker.js"></script>
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/kingeditor/kindeditor.js"></script>
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/kingeditor/lang/zh_CN.js"></script>
        <!--自己封装js公共函数库引入-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Public/js/commonFunc.js"></script>
        <!--获取实验室下拉列表的js文件-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Lecture/js/getBasicInfo.js"></script>
        <!--根据id得到本条讲座的详细信息-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Lecture/js/getLectureDetialById.js"></script>
        <!--讲座审核的js文件-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Lecture/js/examineLecture.js"></script>
        <!--kindeditor编辑器显示-->
        <script type="text/javascript">
        var editor;
        KindEditor.ready(function (z) {
            editor = z.create('#areaLectureDesc', {
                width: '300px', height: '300px',
                uploadJson: '../tool/editor/asp.net/upload_json.ashx',
                fileManagerJson: '../tool/editor/asp.net/file_manager_json.ashx',
                allowFileManager: true,
                afterBlur: function () { this.sync(); },
                aftetCreate: function () { this.sync(); }
            });
        });
        $(function () {
            if ($("#Cb_url").attr("checked") == true) {
                $(".GoUrl").show();
            } else {
                $(".GoUrl").hide();
            }
            $("#Cb_url").bind("click", function () {
                if ($(this).attr("checked") == true) {
                    $(".GoUrl").show();
                } else {
                    $(".GoUrl").hide();
                }
            });
        });
        </script>   
        <!--当退回修改时，显示修改意见区域-->
        <script type="text/javascript" >
            $(function(){
                $("#selectExamineLecture").change(function(){
                    var examStatus=$("#selectExamineLecture").val();
                    if(examStatus=="1"){
                        $("#divLectureBackInfo").css("display","none");
                    }
                    else if(examStatus=="3"){
                        $("#divLectureBackInfo").css("display","block");
                    }
                });
            });
        </script>
    </head>
    <body>
        <input type="hidden" id="inputHiddenId">
        <div id="divLectureName">
            <label>讲座名称：</label>
            <input id="inputLectureName" type="text" class="input" style="border-radius: 4px;">
        </div>
        <div id="divLectureTime">
            <label>讲座时间：</label>
            <input id="inputLectureTime" type="text" class="input"  onclick="WdatePicker()">
        </div>
        <div id="divLectureSpeaker">
            <label>主讲人：</label>
            <input id="inputLectureSpeaker" type="text" class="input">
        </div>
        <div id="divLectureSpeakerDuty">
            <label>主讲人职称：</label>
            <select id="selectLectureSpeakerDuty" class="input">
                <option value="0">无</option>
            </select>
        </div>
        <div id="divLectureSpeakerCollege">
            <label>主讲人所在学院：</label>
            <select id="selectLectureSpeakerCollege" class="input">
                <option value="0">无</option>
            </select>
        </div>
        <div id="divLectureUndertakeCollege">
            <label>承办学院：</label>            
            <select id="selectLectureUbdertakeCollege" class="input">
                
            </select>
        </div>
        <div id="divLectureScope">
            <label>讲座面向范围：</label>
            <select id="selectLectureScope" class="input">
                <option value="0">全部学生</option>
                <option value="1">所属实验室学生</option>
            </select>
        </div>
        <div id="divLecturePlace">
            <label>讲座地点：</label>
            <input id="inputLecturePlace" type="text" class="input">
        </div>
        <div id="divLectureOrg">
            <label>所属实验室：</label>
            <select id="selectLectureOrg" class="input">
                
            </select>
        </div>        
        <div id="divLectureDesc">
            <label>内容大纲：</label>
            <textarea id="areaLectureDesc"></textarea>
        </div>
        <div id="divLectureExamined" style="position:relative; margin-left: 2%; margin-top: 10px; width: 90%; height: 30px;">
            <label>审核：</label>
            <select id="selectExamineLecture" class="input">
                <option value="1">审核通过</option>
                <option value="3">退回修改</option>
            </select>
        </div>
        <div id="divLectureBackInfo" style=" display: none;">
            <label>修改意见：</label>
            <textarea style="margin-left: 150px;" id="areaLectureBackInfo"></textarea>
        </div>
        <div id="divCourseButton">
            <input id="btnSave" type="button" class="button button-small border-green" value="保存">
            <input type="button" class="button button-small border-yellow" value="重置">
        </div>
    </body>
</html>