<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<!--
实验室管理员：意见查看页面
-->
<html>
    <head>
        <title>以升后台管理</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="<?php echo (SURL); ?>Public/Admin/Public/css/publicThr.css">
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Public/js/jquery-1.4.2.js"></script>
        <!--引入自定义函数库-->
        <script type="text/javascript" src="<?php echo (SURL); ?>Public/Admin/Public/js/commonFunc.js"></script>
        <!--获取审核后的审核意见-->
        <script type="text/javascript">
            $(function(){
                var id=psGetUrlParameter("id");
                $.ajax({
                    type:"POST",
                    dataType:"JSON",
                    data:{id:id},
                    url:"/YsInnoCenter/YsInnovation/index.php/Admin/Lecture/getExamAdvice",
                    success:function(result){
                        var resultAnaly=eval(result);
                        $("#divAdvice").text(resultAnaly[0]["lecture_response"]);
                    }
                });
            });
        </script>
    </head>
    <body>
        <div style="position:absolute; margin-left: 10%; margin-top: 5%;">
            <label>审核意见:</label>
            <div id="divAdvice"></div>
        </div>
    </body>
</html>