<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<!--
实验室修改页面
-->
<html>
    <head>
        <title>以升后台管理</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="<?php echo (SURL); ?>Public/Admin/Public/css/publicThr.css">
        <link rel="stylesheet" href="<?php echo (SURL); ?>Public/Admin/Laboratory/css/showAddLaboratory.css">
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Public/js/jquery-1.4.2.js"></script>
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Public/My97DatePicker/WdatePicker.js"></script>
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/kingeditor/kindeditor.js"></script>
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/kingeditor/lang/zh_CN.js"></script>
        <!--自己封装js公共函数库引入-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Public/js/commonFunc.js"></script>
        <!--获取所属学院下拉列表的js文件-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Laboratory/js/getCollege.js"></script>
        <!--根据主键id获取详细信息的js文件-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Laboratory/js/getOrgDetialById.js"></script>
        <!--修改后保存的js文件-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Laboratory/js/labEditSave.js"></script>
        <!--kindeditor编辑器显示-->
        <script type="text/javascript">
        var editor;
        KindEditor.ready(function (z) {
            editor = z.create('#areaLaboratoryDesc', {
                width: '300px', height: '300px',
                uploadJson: '../tool/editor/asp.net/upload_json.ashx',
                fileManagerJson: '../tool/editor/asp.net/file_manager_json.ashx',
                allowFileManager: true,
                afterBlur: function () { this.sync(); },
                aftetCreate: function () { this.sync(); }
            });
        });
        $(function () {
            if ($("#Cb_url").attr("checked") == true) {
                $(".GoUrl").show();
            } else {
                $(".GoUrl").hide();
            }
            $("#Cb_url").bind("click", function () {
                if ($(this).attr("checked") == true) {
                    $(".GoUrl").show();
                } else {
                    $(".GoUrl").hide();
                }
            });
        });
        </script>                   
    </head>
    <body>
        <input type="hidden" id="inputHiddenId">
        <div id="divLaboratoryName">
            <label>实验室名称：</label>
            <input id="inputLaboratoryName" type="text" class="input" style="border-radius: 4px;">
        </div>
        <div id="divLaboratoryEngName">
            <label>实验室英文名称：</label>
            <input id="inputLaboratoryEngName" type="text" class="input">
        </div>
        <div id="divLaboratoryEngIdea">
            <label>理念：</label>
            <input id="inputLaboratoryIdea" type="text" class="input">
        </div>
        <div id="divLaboratoryPurpose">
            <label>宗旨：</label>
            <input type="text" id="inputLaboratoryPurpose" class="input">
        </div>
        <div id="divLecturePicture">
            <label>实验室图标：</label>
            <input type="file" id="inputOrgPicture" class="input">
        </div>
        <div id="divLaboratoryLocation">
            <label>实验室地理位置：</label>
            <input type="text" id="inputLaboratoryLocation" class="input">
        </div>
        <div id="divLaboratoryInnoNum">
            <label>创新号码号段：</label>            
            <input type="text" id="inputLaboratoryInnoNum" class="input">
        </div>
        <div id="divLaboratoryPhone">
            <label>实验室电话：</label>
            <input type="text" id="inputLaboratoryPhone" class="input">
        </div>
        <div id="divLaboratoryRemark">
            <label>备注信息：</label>
            <input id="inputLaboratoryRemark" type="text" class="input">
        </div>
        <div id="divLaboratoryCollege">
            <label>所属学院：</label>
            <select id="selectLaboratoryCollege" class="input">
                
            </select>
        </div>      
        <div id="divLaboratoryDesc">
            <label>实验室简介：</label>
            <textarea id="areaLaboratoryDesc"></textarea>
        </div>
        <div id="divLaboratoryButton">
            <input id="btnSave" type="button" class="button button-small border-green" value="保存">
            <input type="button" class="button button-small border-yellow" value="重置">
        </div>
    </body>
</html>