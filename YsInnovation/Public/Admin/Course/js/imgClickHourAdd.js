/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    var i=1;
    $("#imgHourAdd").click(function(){
        var info=$('<div id="courseSelect'+i+'" class="divCourseHourSelect" style="position:relative; margin-left:150px; margin-top: 0px; width: 400px; height: 30px;">'
        +'第<select id="week1">'
            +'<option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option>'
            +'<option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option>'
            +'<option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option>'
            +'<option>19</option>'
        +'</select>周-第'
        +'<select id="week2">'
            +'<option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option>'
            +'<option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option>'
            +'<option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option>'
            +'<option>19</option>'
        +'</select>周&nbsp;'
        +'第<select id="section1">'
            +'<option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option>'
            +'<option>7</option><option>8</option>'
        +'</select>节-第'
        +'<select id="section2">'
            +'<option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option>'
            +'<option>7</option><option>8</option>'
        +'</select>节'
        +'<img id="imgHourReduce" onclick="reduce()" class="imgAdd" src="/YsInnoCenter/YsInnovation/Public/Admin/Course/img/imgReduce.png"></div>');
        $("#divCourseHours").append(info);
        i++;
    }); 

});
/*
 * 点击减少时间安排部分的方法
 */
function reduce(){
    var len=$("#divCourseHours").children("div").length;
    $("div.divCourseHourSelect:last").remove();
}




