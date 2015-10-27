<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace Admin\Controller;
use Think\Controller;

class SemesterController extends Controller{
    //学期列表展示方法
    public function showSemesterList(){
        $this->display();     
    }
    
    //得到所有数据,并以json格式返回
    public function getAllSemesterData(){
        if(IS_POST){
            $page=$_POST["page"];
            $rows=$_POST["rows"];
            var_dump($rows);
            $startRecord=$rows*($page-1);
            $semester_rows=  $this->getSemesterDate($rows,$startRecord);
            $semester_rows_to_json= $this->ajaxReturn($semester_rows,'JSON');
            return $semester_rows_to_json;
        }
    }  
    
    public function getAllData(){
        if(IS_GET){
            $page=$_GET["page"];
            $rows=$_GET["rows"];
            $startRecord=$rows*($page-1);
            $semester_rows=  $this->getSemesterDate($rows, $startRecord);
            $semester_rows_to_json=  $this->ajaxReturn($semester_rows,"JSON");
            return $semester_rows_to_json;
        }
    }
    
    /*
    得到所有数据的方法
     * 返回：$semester_rows数组
     */
    public function getSemesterDate($rows,$startRecord){
        $sql="select * from t_semester where isshow='0' limit $startRecord,$rows";
        var_dump($sql);
        $semester_rows=  fecthAll($sql);
        return $semester_rows;
    }
    
    /*
        转换为json格式数据的方法
     * 参数$arr：数组
     * 返回：json格式$arr_to_json
     */
    public function transJson($arr){
        $arr_to_json= json_encode($arr);
        return $arr_to_json;
    }  
    
    /*
     * 计算所有数据的条数的方法
     * 返回：json格式
     */
    public function getAllSemesterDataCount(){
        if(IS_GET){
            $sql="select count(*) from t_semester where isshow='0'";
            $seme_count=  getResultNum($sql);
            $this->ajaxReturn($seme_count,"JSON");
        }      
    }
    
    public function getNum(){
        if(IS_POST){
            $sql="select count(*) from t_semester where isshow='0'";
            $rows=  fecthAll($sql);
            $this->ajaxReturn($rows,"JSON");
        }
    }
    
    //显示添加学期的页面
    public function showAddSemester(){
        $this->display();
    }
    
    /*
     * 保存学期的方法
     * js采用post方式提交数据
     * 需提交数据：
     *  学期名称：$_POST['name']、学期周数：$_POST['week']、学期开始时间：$_POST['time']
     *  返回：新添加记录的主键id，以json格式返回
     */
    public function saveSemester(){
        if(IS_POST){
            $arr=array();
            $semeName=$_POST['name'];
            $arr['semester_name']=$semeName;
            $arr['semester_week_num']=$_POST['week'];
            $arr['semester_begin_time']=$_POST[time];
            $arr['status_id']=1;
            $arr['isshow']=0;
            $return_id=  insert_two("semester", $arr);
            $this->ajaxReturn($return_id,"JSON");
        }
    }
    
    /*
     * 得到学期名称的方法
     */
    public function getSemeName(){
        if(IS_POST){
            $sql="select semester_id,semester_name from t_semester where isshow='0' and status_id='1'";
            $rows=  fecthAll($sql);        
            $this->ajaxReturn($rows,"JSON");
        }
    }
    
    /*
     * 根据学期名称得到学期id的方法
     * 参数：学期名称
     * 返回：本条学期对应的主键id
     */
    public function getSemeByName(){
        if(IS_POST){
            $name=$_POST["semeName"];
            $sql="select * from t_semester where semester_name='{$name}'";
            $row=  fecthOne($sql);
            $this->ajaxReturn($row,"JSON");
        }
    }
}
