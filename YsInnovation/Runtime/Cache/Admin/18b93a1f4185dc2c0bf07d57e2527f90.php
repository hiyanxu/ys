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
        <link rel="stylesheet" href="<?php echo (SURL); ?>Public/Admin/User/css/showUserList.css">
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Public/js/jquery-1.4.2.js"></script>
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/jquery-easyui-1.3.6/jquery.easyui.min.js"></script>
        <link rel="stylesheet" type="text/css" href="<?php echo (SURL); ?>Public/jquery-easyui-1.3.6/themes/default/easyui.css">
        <link rel="stylesheet" type="text/css" href="<?php echo (SURL); ?>Public/jquery-easyui-1.3.6/themes/icon.css">
        <!--角色添加的点击事件-->
        <script type="text/javascript">
            $(function(){
                $("#inputAddUser").click(function(){
                    window.location.href="/YsInnoCenter/YsInnovation/index.php/Admin/User/showAddRole";
                });
            });
        </script>
        <!--角色列表显示的js文件-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/User/js/getRoleList.js"></script>
    </head>
    <body>
        <div id="divUserList">
            <div class="listHead">
                <strong>角色列表</strong>
            </div>
            <div class="listOper">
                <input id="btnSelectAll" type="button" value="全选" class="button button-small checkall">      
                <input id="inputAddUser" type="button" value="角色添加" class="button button-small border-green">                  
            </div>
            <div class="listItemName">
                <div id="selected" class="itemName">选择</div>
                <div id="name" class="itemName" style="position:absolute; margin-left: 25%;">角色名称</div>                            
                <div id="operations" class="itemName" style="position: absolute; margin-left: 80%;">操作</div>
            </div>
            <div class="listItemData">
                         
            </div>
            <div id="semePageList" class="easyui-pagination"></div>
        </div>
    </body>
</html>