<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<!--
实验室列表页面
-->
<html>
    <head>
        <title>以升后台管理</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="<?php echo (SURL); ?>Public/Admin/Laboratory/css/showLaboratoryList.css">
        <link rel="stylesheet" href="<?php echo (SURL); ?>Public/Admin/Public/css/publicThr.css">
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Public/js/jquery-1.4.2.js"></script>
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/jquery-easyui-1.3.6/jquery.easyui.min.js"></script>
        <link rel="stylesheet" type="text/css" href="<?php echo (SURL); ?>Public/jquery-easyui-1.3.6/themes/default/easyui.css">
        <link rel="stylesheet" type="text/css" href="<?php echo (SURL); ?>Public/jquery-easyui-1.3.6/themes/icon.css"> 
        <!--得到实验室列表的js文件-->
        <script type="text/javascript" id="getLectureListScript" data="sadmin" src="<?php echo (SURL); ?>Public/Admin/Laboratory/js/getLaboratoryList.js"></script>
        <!--添加实验室按钮事件-->
        <script type="text/javascript" >
            $(function(){
                $("#inputAddLecture").click(function(){
                    window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/Laboratory/showAddLaboratory";
                });
            });
        </script>
    </head>
    <body>
        <div id="divLaboratoryList">
            <div class="listHead">
                <strong>实验室列表</strong>
            </div>
            <div class="listOper">
                <input id="btnSelectAll" type="button" value="全选" class="button button-small checkall">      
                <input id="inputAddLecture" type="button" value="添加实验室" class="button button-small border-green">              
            </div>
            <div class="listItemName">
                <div id="selected" class="itemName">选择</div>
                <div id="name" class="itemName">实验室名称</div>
                <div id="engName" class="itemName">实验室英文名称</div>
                <div id="laboratoryTeaInCharge" class="itemName">实验室负责人</div>
                <div id="laboratoryStuInCharge" class="itemName">学生负责人</div>
                <div id="innoNum" class="itemName">创新号段</div>
                <div id="organization" class="itemName">所属学院</div>
                <div id="operations" class="itemName">操作</div>
            </div>
            <div class="listItemData">
                         
            </div>
            <div id="semePageList" class="easyui-pagination"></div>
        </div>
    </body>
</html>