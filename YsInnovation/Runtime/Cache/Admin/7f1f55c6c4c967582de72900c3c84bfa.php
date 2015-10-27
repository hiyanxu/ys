<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>以升后台管理系统</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Index/js/jquery.cookie.js"></script>
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Index/js/jquery.js"></script>
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Index/js/jquery.treeview.js"></script>
        <link href="<?php echo (SURL); ?>Public/Admin/Index/css/left.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript">
            $(function(){
                $("#modularAdminLeftTree").treeview({
                    collapsed: true,
                    unique: true
                });
            });
        </script>
    </head>
    <body>
        <div id="left">
            <div style="position:absolute; margin-left:15px; margin-top:5px; width:150px; height:180px;">
                <ul id="modularAdminLeftTree" class="manageTree">
                    <?php if(is_array($menuItem_pRows)): foreach($menuItem_pRows as $key=>$pv): ?><li><span class="folder"><?php echo ($pv["menuitem_name"]); ?></span>
                            <ul>
                                <?php if(is_array($menuItem_sRows)): foreach($menuItem_sRows as $key=>$sv): if($sv["top_menuitem_id"] == $pv["menuitem_id"]): ?><li><a href="<?php echo (SURL); ?>index.php/Admin/<?php echo ($sv["menuitem_controller"]); ?>/<?php echo ($sv["menuitem_function"]); ?>" target="right" class="folder" ><?php echo ($sv["menuitem_name"]); ?></a></li><?php endif; endforeach; endif; ?>
                            </ul>                            
                        </li><?php endforeach; endif; ?>
                </ul>
            </div>
        </div>
    </body>
</html>