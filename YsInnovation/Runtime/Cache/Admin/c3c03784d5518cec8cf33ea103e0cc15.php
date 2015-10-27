<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<!--
管理员修改页面
-->
<html>
    <head>
        <title>以升后台管理</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="<?php echo (SURL); ?>Public/Admin/Public/css/publicThr.css">
        <link rel="stylesheet" href="<?php echo (SURL); ?>Public/Admin/User/css/showAddAdmin.css">
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Public/js/jquery-1.4.2.js"></script>
        <!--得到所有基础信息的js文件-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/User/js/getBasicsInfo.js"></script>
        <!--得到所有教师下拉菜单的事件-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/User/js/getAllTea.js"></script>
        <!--得到本条详细信息的js文件-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/User/js/getAdminDetial.js"></script>
        <!--保存按钮的点击事件-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/User/js/editSaveAdmin.js"></script>
    </head>
    <body>
        <input type="hidden" id="inputId">
        <div id="divTeaList">
            <label>教师名称：</label>
            <input type="text" id="inputAdminName" class="input">
        </div>             
        <div id="divTeaRole">
            <label>管理员角色：</label>
            <select id="selectTeaRole" class="input">
                
            </select>
        </div>
        <div id="divTeaAccount">
            <label>用户账号：</label>
            <input id="inputTeaAccount" type="text" class="input">
        </div>
        <div id="divTeaPwd">
            <label>密码：</label>
            <input id="inputTeaPwd" type="text" class="input">
        </div>
        <div id="divTeaButton">
            <input id="btnSave" type="button" class="button button-small border-green" value="保存">
            <input type="button" class="button button-small border-yellow" value="重置">
        </div>               
    </body>
</html>