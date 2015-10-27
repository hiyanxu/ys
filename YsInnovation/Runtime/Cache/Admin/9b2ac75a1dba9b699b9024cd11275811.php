<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<!--
不同角色权限分配的页面
-->
<html>
    <head>
        <title>TODO supply a title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Public/js/jquery-1.4.2.js"></script>
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Index/js/jquery.cookie.js"></script>
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Index/js/jquery.js"></script>
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Index/js/jquery.treeview.js"></script>
        <link href="<?php echo (SURL); ?>Public/Admin/Index/css/left.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript">
            $(function(){
                $("#modularAdminLeftTree").treeview({
                });
            });
        </script>
        <!--获取树状显示内容-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/User/js/getTreeView.js"></script>
    </head>
    <body>        
        <div id="left">
            <div style="position:absolute; margin-left:15px; margin-top:5px; width:150px; height:180px;">
                <ul id="modularAdminLeftTree" class="manageTree">
                                            
                </ul>
            </div>
        </div>
    </body>
</html>