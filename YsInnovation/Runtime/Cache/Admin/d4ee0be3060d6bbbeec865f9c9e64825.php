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
        <link rel="stylesheet" href="<?php echo (SURL); ?>Public/Admin/Course/css/showExaminedList.css">
        <link rel="stylesheet" href="<?php echo (SURL); ?>Public/Admin/Public/css/publicThr.css">
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Public/js/jquery-1.4.2.js"></script>
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/jquery-easyui-1.3.6/jquery.easyui.min.js"></script>
        <link rel="stylesheet" type="text/css" href="<?php echo (SURL); ?>Public/jquery-easyui-1.3.6/themes/default/easyui.css">
        <link rel="stylesheet" type="text/css" href="<?php echo (SURL); ?>Public/jquery-easyui-1.3.6/themes/icon.css">   
        <!--得到课程列表的js文件-->
        <script type="text/javascript" id="getCourseListScript" data="2&1" src="<?php echo (SURL); ?>Public/Admin/Course/js/getCourseList.js"></script>
    </head>
    <body>
        <div id="divCourseList">
            <div class="listHead">
                <strong>待审核内容列表</strong>
            </div>
            <div class="listOper">
                <input id="btnSelectAll" type="button" value="全选" class="button button-small checkall">      
                <input id="inputAddCourse" type="button" value="添加课程" class="button button-small border-green">  
                <input id="btnDelBatch" type="button" value="批量删除" class="button button-small border-yellow">
                <label style="margin-left: 10px;">所属实验室</label>
                <select id="operSelectCourseOrga">
                    <option value="all">全部</option>
                <?php if(is_array($org_name)): foreach($org_name as $key=>$valOrg): ?><option value="<?php echo ($valOrg["organization_id"]); ?>"><?php echo ($valOrg["organization_name"]); ?></option><?php endforeach; endif; ?>
                </select>
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
                <div id="operations" class="itemName">操作</div>
            </div>
            <div class="listItemData">
                         
            </div>
            <div id="semePageList" class="easyui-pagination"></div>
        </div>
    </body>
</html>
    </body>
</html>