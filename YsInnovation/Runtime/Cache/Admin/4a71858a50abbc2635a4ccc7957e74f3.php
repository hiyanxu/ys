<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>以升后台管理系统</title>        
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="renderer" content="webkit">        
        <link rel="stylesheet" href="<?php echo (SURL); ?>Public/Admin/Pintuer/css/pintuer.css">
        <link rel="stylesheet" href="<?php echo (SURL); ?>Public/Admin/Pintuer/css/admin.css">        
        <script src="<?php echo (SURL); ?>Public/Admin/Pintuer/js/jquery.js"></script>
        <!--<script src="js/pintuer.js"></script>-->
        <script src="<?php echo (SURL); ?>Public/Admin/Pintuer/js/respond.js"></script>
        <script src="<?php echo (SURL); ?>Public/Admin/Pintuer/js/admin.js"></script>               
        <script src="<?php echo (SURL); ?>Public/Admin/Pintuer/js/pintuer.js"></script>              
        <link type="image/x-icon" href="/favicon.ico" rel="shortcut icon" />
        <link href="/favicon.ico" rel="bookmark icon" />
        <script type="text/javascript">
            $(function(){
                $(".button button-little bg-yellow").click(function(){
                    if(confirm("确定要退出吗？")){
                        return true;
                    }
                    else{
                        return false;
                    }
                });
            });
        </script>
    </head>
    <body>
        <div class="lefter">
            <div class="logo" style="height:87px;"><img style="margin-top:-10px;" src="<?php echo (SURL); ?>Public/Admin/Pintuer/images/logo5.png" alt="后台管理系统" /></div>
        </div>
        <div class="righter nav-navicon" id="admin-nav">
            <div class="mainer">
                <div class="admin-navbar">
                    <span class="float-right">
                        <a class="button button-little bg-main" href="#" target="_blank">前台首页</a>
                        <a class="button button-little bg-yellow" href="<?php echo (SURL); ?>index.php/Admin/Login/login">注销登录</a>
                    </span>
                    <ul class="nav nav-inline admin-nav">
                        <li class="active"><a href="index.html" class="icon-home"> 开始</a>                            
                        </li>                        
                    </ul>
                </div>
            </div>
            <div class="admin-bread">
                <span>您好，<?php echo ($userName); ?>，欢迎您的光临。</span>
                <ul class="bread" style="margin-left:180px;">
                    <li><a href="index.html" class="icon-home"> 开始</a></li>
                    <li>后台首页</li>
                </ul>
            </div>
        </div>
    </body>
</html>