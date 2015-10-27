<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<!--
实验室管理员：讲座添加页面
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
        <!--引入自定义的公共函数库-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Public/js/commonFunc.js"></script>
        <!--获取基本信息下拉列表的js文件-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Lecture/js/getBasicInfo.js"></script>
        <!--添加保存的js文件-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Lecture/js/orgSaveLecture.js"></script>
    </head>
    <body>
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
        <div id="divLectureDesc">
            <label>内容大纲：</label>
            <textarea style="margin-left: 160px;" cols="80" rows="15" id="areaLectureDesc"></textarea>
        </div>
        <div id="divCourseButton">
            <input id="btnSave" type="button" class="button button-small border-green" value="保存">
            <input type="button" class="button button-small border-yellow" value="重置">
        </div>
    </body>
</html>