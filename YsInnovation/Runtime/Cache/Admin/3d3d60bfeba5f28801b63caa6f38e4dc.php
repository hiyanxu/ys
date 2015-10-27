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
        <link rel="stylesheet" href="<?php echo (SURL); ?>Public/Admin/Course/css/showAddCourse.css">
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Public/js/jquery-1.4.2.js"></script>
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Public/My97DatePicker/WdatePicker.js"></script>
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/kingeditor/kindeditor.js"></script>
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/kingeditor/lang/zh_CN.js"></script>
        <!--获取学期的js文件-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Course/js/getSemester.js"></script>
        <!--获取实验室下拉列表的js文件-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Course/js/getOrganization.js"></script>
        <!--点击时间安排部分增加-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Course/js/imgClickHourAdd.js"></script>
        <!--保存课程信息-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Course/js/saveCourse.js"></script>
        
        <!--kindeditor编辑器显示-->
        <script type="text/javascript">
        var editor;
        KindEditor.ready(function (z) {
            editor = z.create('#areaCourseOutline', {
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
        <div id="divCourseName">
            <label>课程名：</label>
            <input id="inputCourseName" type="text" class="input" style="border-radius: 4px;">
        </div>
        <div id="divCourseNum">
            <label>课程号：</label>
            <input id="inputCourseNum" type="text" class="input">
        </div>
        <div id="divCourseBeginTime">
            <label>课程开始时间：</label>
            <input id="inputCourseBeginTime" type="text" class="input" onclick="WdatePicker()">
        </div>
        <div id="divCourseEndTime">
            <label>课程结束时间：</label>
            <input id="inputCourseEndTime" type="text" class="input" onclick="WdatePicker()">
        </div>
        <div id="divCourseSemester">
            <label>开课学期：</label>
            <select id="selectCourseSeme" class="input">
                
            </select>
        </div>
        <div id="divCourseWorkShop">
            <label>所属实验室：</label>            
            <select id="selectCourseOrga" class="input">
                <?php if(is_array($org_name)): foreach($org_name as $key=>$orgVal): ?><option value="<?php echo ($orgVal["organization_id"]); ?>"><?php echo ($orgVal["organization_name"]); ?></option><?php endforeach; endif; ?>
            </select>
        </div>
        <div id="divCourseSpeaker">
            <label>主讲人：</label>
            <select id="selectCourseSpeaker" class="input">
                
            </select>
        </div>
        <div id="divCoursePeriod">
            <label>学时：</label>
            <input id="inputCoursePeriod" type="text" class="input">
        </div>
        <div id="divCourseScore">
            <label>学分：</label>
            <input id="inputCourseScore" type="text" class="input">
        </div>
        <div id="divCoursePlace">
            <label>授课地点：</label>
            <input id="inputCoursePlace" type="text" class="input">
        </div>
        <div id="divCourseHours">
            <label>时间安排：</label>
            <div id="courseSelect0" class="divCourseHourSelect" style="position:relative; margin-left:150px; margin-top: 0px; width: 400px; height: 30px;">
                第<select id="week1">
                    <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option>
                    <option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option>
                    <option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option>
                    <option>19</option>
                </select>
                周-第<select id="week2">
                    <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option>
                    <option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option>
                    <option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option>
                    <option>19</option>
                </select>周
                第<select id="section1">
                    <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option>
                    <option>7</option><option>8</option>  
                </select>节-第
                <select id="section2">
                    <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option>
                    <option>7</option><option>8</option>  
                </select>节
                <img id="imgHourAdd" class="imgAdd" src="<?php echo (SURL); ?>Public/Admin/Course/img/addAchieveUser.png">
            </div>                            
        </div>
        <div id="divCourseOutline">
            <label>课程大纲：</label>
            <textarea id="areaCourseOutline"></textarea>
        </div>
        <div id="divCourseButton">
            <input id="btnSave" type="button" class="button button-small border-green" value="保存">
            <input type="button" class="button button-small border-yellow" value="重置">
        </div>               
    </body>
</html>