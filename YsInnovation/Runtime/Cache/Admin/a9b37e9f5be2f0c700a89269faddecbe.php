<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>以升后台管理</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="<?php echo (SURL); ?>Public/Admin/Course/css/showExaminedList.css">
        <link rel="stylesheet" href="<?php echo (SURL); ?>Public/Admin/Public/css/publicThr.css">
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Public/js/jquery-1.4.2.js"></script>
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/jquery-easyui-1.3.6/jquery.easyui.min.js"></script>
        <link rel="stylesheet" type="text/css" href="<?php echo (SURL); ?>Public/jquery-easyui-1.3.6/themes/default/easyui.css">
        <link rel="stylesheet" type="text/css" href="<?php echo (SURL); ?>Public/jquery-easyui-1.3.6/themes/icon.css">   
        <!--根据当前所在学期得到所在学期的课程-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Course/js/getCurrentSemeCourse.js"></script>
        <!--全选按钮以及对加入可选课程的操作js-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Course/js/courseJoinSelectedOptional.js"></script>
    </head>
    <body>
        <div id="divCourseList">
            <div class="listHead">
                <strong>可开放选课课程列表</strong>
            </div>
            <div class="listOper">
                <input id="btnSelectAll" type="button" value="全选" class="button button-small checkall">      
                <input id="inputAddCourse" type="button" value="加入可选课程" class="button button-small border-green">                 
            </div>
            <div class="listItemName">
                <div id="selected" class="itemName">选择</div>
                <div id="name" class="itemName">课程名</div>
                <div id="speaker" class="itemName">主讲人</div>
                <div id="period" class="itemName">学时</div>
                <div id="score" class="itemName">学分</div>
                <div id="place" class="itemName">授课地点</div>
                <div id="organization" class="itemName">所属实验室</div>
                <div id="whoAdd" class="itemName">添加人</div>
                <div id="status" class="itemName">当前状态</div>
            </div>
            <div class="listItemData">
                         
            </div>
            <div id="semePageList" class="easyui-pagination"></div>
        </div>
    </body>
</html>