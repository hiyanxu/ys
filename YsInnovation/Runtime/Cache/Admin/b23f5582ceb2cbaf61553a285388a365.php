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
    </head>
    <frameset border=0 framespacing=0 rows="90, *" frameborder=0>
        <frame name="head" src="<?php echo ($think["const"]["/YsInnoCenter/YsInnovation/index.php/Admin/Index"]); ?>head" frameborder=0 noresize scrolling=no>
        <frameset cols="190,*">
            <frame name="left" src="<?php echo ($think["const"]["/YsInnoCenter/YsInnovation/index.php/Admin/Index"]); ?>left" frameborder=0 noresize scrolling=no >
            <frame name="right" src="<?php echo ($think["const"]["/YsInnoCenter/YsInnovation/index.php/Admin/Index"]); ?>right" frameborder=0 noresize scrolling=yes>
        </frame>
    </frameset>
    <noframes>
    </noframes>    
</html>