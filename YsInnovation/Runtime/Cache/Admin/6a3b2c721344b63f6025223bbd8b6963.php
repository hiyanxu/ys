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
        <!--得到所有基础信息的js文件-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/User/js/getBasicsInfo.js"></script>
        <!--根据实验室的改变得到实验室创新账号号段的js文件-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/User/js/getInnoNumByOrg.js"></script>
		<!--保存按钮的事件-->
		<script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/User/js/saveStu.js"></script>
    </head>
    <body>
        <div id="divTeaName">
            <label>学生姓名：</label>
            <input id="inputTeaName" type="text" class="input" style="border-radius: 4px;">
        </div>
        <div id="divTeaSex">
            <label>性别：</label>
            <select id="selectSex" class="input">
                <option value="0">男</option>
                <option value="1">女</option>
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
        <div id="divTeaJobNum">
            <label>学生学号：</label>
            <input type="text" id="inputTeaJobNum" class="input">
        </div>        
        <div id="divTeaIdCardNum">
            <label>身份证号：</label>
            <input type="text" id="inputTeaIdCardNum" class="input">
        </div>
        <div id="divTeaPhone">
            <label>联系电话：</label>
            <input id="inputTeaPhone" type="text" class="input">
        </div>
        <div id="divTeaEmail">
            <label>邮箱：</label>
            <input id="inputTeaEmail" type="text" class="input">
        </div>
        <div id="divTeaWeixin">
            <label>微信：</label>
            <input id="inputTeaWeixin" type="text" class="input">
        </div>
        <div id="divTeaQQ">
            <label>QQ：</label>
            <input id="inputTeaQQ" type="text" class="input">
        </div>
        <div id="divTeaOrg">
            <label>所属实验室：</label>
            <select id="selectTeaOrga" class="input">
                
            </select>
        </div>
        <div id="divTeaDuty">
            <label>创新号码：</label>            
            <input type="text" id="inputInnoNum" class="input">
            <label id="labelInnoNum" style="color: red;"></label>
        </div>
        <div id="divTeaCollege">
            <label>所属学院：</label>
            <select id="selectTeaCollege" class="input">
                
            </select>
        </div>
        <div id="divTeaRole">
            <label>用户角色：</label>
            <select id="selectTeaRole" class="input">
                
            </select>
        </div>
        <div id="divTeaButton">
            <input id="btnSave" type="button" class="button button-small border-green" value="保存">
            <input type="button" class="button button-small border-yellow" value="重置">
        </div>               
    </body>
</html>