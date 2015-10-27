<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>TODO supply a title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="<?php echo (SURL); ?>Public/Admin/Public/css/publicThr.css">
        <link rel="stylesheet" href="<?php echo (SURL); ?>Public/Admin/User/css/showAddTea.css">
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Public/js/jquery-1.4.2.js"></script>
        <!--角色添加的js文件-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/User/js/saveRole.js"></script>
    </head>
    <body>
        <div id="divTeaName">
            <label>角色名称：</label>
            <input id="inputRoleName" type="text" class="input" style="border-radius: 4px;">
        </div>                
        <div id="divTeaButton">
            <input id="btnSave" type="button" class="button button-small border-green" value="保存">
            <input type="button" class="button button-small border-yellow" value="重置">
        </div>               
    </body>
</html>