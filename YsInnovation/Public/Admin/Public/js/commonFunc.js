/* 
 * 对常用js方法的封装
 */

/*
 * 分析url获取参数的方法
 */
function psGetUrlParameter(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

/*
 * 读取当前cookie的方法
 * 获取当前登录人的实验室id信息
*/
function getCookie(c_name)
{
    if (document.cookie.length>0)
      {
            c_start=document.cookie.indexOf(c_name + "=")
            if (c_start!=-1)
            { 
                c_start=c_start + c_name.length+1 
                c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) c_end=document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end))
            } 
      }
    return "";
}

/*
 * 定义接口公共函数访问路径
 */
var ajax_url_common="http://localhost/YsInnoCenter/YsInnovation/index.php/Admin/";

/*
 * 提示信息和跳转的方法
 */
function alertMes(mes,url){
    alert(mes);
    window.location.href=url;
}
