<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace Admin\Controller;
use Think\Controller;

class LectureController extends Controller{
    /*
     * 显示添加讲座的页面
     */
    public function showAddLecture(){
        $this->display();
    }
    /*
     * 保存讲座的js调用方法
     * 参数：一些列信息  name:name,time:time,
     * speaker:speaker,speakerDuty:speakerDuty,speakerCollege:speakerCollege,ubderTake:ubderTake,scope:scope,place:place,org:org,desc:desc
     * 返回：受影响的行数
     */
    public function saveLectureJs(){
        if(IS_POST){
            $name=$_POST["name"];
            $time=$_POST["time"];
            $speaker=$_POST["speaker"];            
            if($_POST["speakerDuty"]==0){
                $speaker_duty="";
            }
            else{
                $speaker_duty=$_POST["speakerDuty"];
            }            
            if($_POST["speakerCollege"]==0){
                $speaker_college="";
            }
            else{
                $speaker_college=$_POST["speakerCollege"];
            }
            $ubdertake_college=$_POST["ubdertakeCollege"];
            $scope=$_POST["scope"];
            $place=$_POST["place"];
            $org=$_POST["org"];
            $desc=$_POST["desc"];
            $lecture_who_add=$_SESSION["user_id"];
            $affect_id=  $this->saveLecture($name, $time,"", $lecture_who_add, $speaker, $speaker_duty, 
                    $speaker_college, $ubdertake_college, $desc, $scope, 1, $place,"","","", "", $org);
            $lecture_optional_affect_id=  $this->saveLectureOptional($affect_id, 4, $time, $place, $scope, $ubdertake_college);
            if(!$affect_id||!$lecture_optional_affect_id){
                $this->ajaxReturn("error","JSON");
            }
            else{
                $this->ajaxReturn("success","JSON");
            }
        }
    }
    /*
     * 讲座保存的方法
     * 参数：讲座表的一系列信息
     * 返回：受影响的行数
     */
    public function saveLecture($name,$time,$fee,$lecture_who_add,$speaker,$speaker_duty,$speaker_college,$ubdertake_college,
            $desc,$scope,$status,$place,$news_url,$picture,$ppt_url,$response,$org){
        $arr=array();
        $arr["lecture_name"]=$name;
        $arr["lecture_time"]=$time;
        $arr["lecture_fee"]=$fee;
        $arr["lecture_who_add"]=$lecture_who_add;
        $arr["speaker"]=$speaker;
        $arr["speaker_duty_id"]=$speaker_duty;
        $arr["speaker_college"]=$speaker_college;
        $arr["lecture_college"]=$ubdertake_college;
        $arr["lecture_desc"]=$desc;
        $arr["lecture_scope"]=$scope;
        $arr["lecture_status_id"]=$status;
        $arr["lecture_place"]=$place;
        $arr["lecture_news_url"]=$news_url;
        $arr["lecture_picture"]=$picture;
        $arr["lecture_ppt_url"]=$ppt_url;
        $arr["lecture_response"]=$response;
        $arr["organization_id"]=$org;
        $arr["ordertime"]=date("y-m-d",time());
        $arr["isshow"]=0;
        $affect_id=  insert_two("lecture", $arr);
        return $affect_id;
    }
    /*
     * 将讲座信息保存到可选讲座表中
     * 参数：可选讲座信息
     * 返回：受影响的行数
     */
public function saveLectureOptional($lecture_id,$lecture_status_id,$lecture_time,$lecture_place,$lecture_scope,$organization_id){
    $arr=array();
    $arr["lecture_id"]=$lecture_id;
    $arr["lecture_status_id"]=$lecture_status_id;
    $arr["lecture_time"]=$lecture_time;
    $arr["lecture_place"]=$lecture_place;
    $arr["lecture_scope"]=$lecture_scope;
    $arr["organization_id"]=$organization_id;
    $arr["isshow"]=0;
    $affect_id=  insert_two("lecture_optional", $arr);
    return $affect_id;
}
    /*
     * 已审核讲座列表页面显示
     */
    public  function showExaminedLectureList(){
        $org_rows=  $this->getOrg();
        $this->assign("org_name", $org_rows);   
        $this->display();
    }
     /*
     * 得到实验室的方法
     * 返回：$rows
     */
    public function getOrg(){
        $sql="select * from t_organization where isshow='0' and organization_type=2";
        $rows=D()->query($sql);
        return $rows;
    }
    /*
     * 得到指定条件下讲座的数量
     * 参数：实验室id、当前状态
     * 返回：符合条件的讲座信息的数量
     */
    public function getLectureCountJs(){
        if(IS_POST){
            $status=$_POST["status"];
            $org_id=$_POST["org"];
            $lecture_count=  $this->getLectureCount($status, $org_id);
            $this->ajaxReturn($lecture_count,"JSON");
        }
    }
    /*
     * 得到指定条件下讲座的数量
     * 参数：实验室id、当前状态status
     * 返回：符合条件的信息的数量
     */
    public function getLectureCount($status,$org_id){
        if($org_id=="all"){
            $sql="select count(*) from t_lecture where isshow=0 and lecture_status_id={$status}";
        }
        else{
            $sql="select count(*) from t_lecture where isshow=0 and lecture_status_id={$status} and organization_id={$org_id}";
        }
        $lecture_count=D()->query($sql);
        return $lecture_count;
    }
    /*
     * 获取符合条件的讲座信息的js调用的方法
     * 参数：当前状态、实验室id、当前页码数、每页显示的条数
     * 返回：符合条件的讲座信息
     */
    public function getLectureListDataJs(){
        if(IS_POST){
            $status=$_POST["status"];
            $org=$_POST["org"];
            $page=$_POST["page"];
            $rows=$_POST["rows"];
            $start_record=$rows*($page-1);
            $lecture_rows=  $this->getLectureData($start_record, $rows, $status, $org);
            foreach ($lecture_rows as $key => $value) {
            //实验室名字获取
            $where1="organization_id={$value['organization_id']}";
            $table1="organization";
            $org_row=  $this->getForeignKeyData($where1, $table1);
            $lecture_rows[$key]['org_name']=$org_row[0]['organization_name'];
            //面向范围信息转换
            if($value["lecture_scope"]==0){
                $lecture_rows[$key]["lecture_scope"]="全部学生";
            }
            else{
                $lecture_rows[$key]["lecture_scope"]="所属实验室学生";
            }
        }
            $this->ajaxReturn($lecture_rows,"JSON");
        }
    }
    /*
     * 获取符合条件的讲座信息的方法
     * 参数：当前状态、实验室id、当前开始的记录数、查询的条数
     * 返回：符合条件的讲座信息
     */
    public function getLectureData($start_record,$rows,$status,$org){
        if($org=="all"){
            $sql="select * from t_lecture where isshow=0 and lecture_status_id={$status} limit $start_record,$rows";
        }
        else{
            $sql="select * from t_lecture where isshow=0 and lecture_status_id={$status} and organization_id={$org} limit $start_record,$rows";
        }
        $lecture_rows=  fecthAll($sql);
        return $lecture_rows;
    }
    /*
     * 根据外键得到相应外键数据
     * 参数：条件：$where
     *      对应表名：$table_name 
     */
    public function getForeignKeyData($where,$table_name){
        $table=D("{$table_name}");
        $rows=$table->where($where)->select();
        return $rows;
    }
    /*
     * 超级管理员：待审核讲座列表的显示
     */
    public function showNoExamineLectureList(){
        $org_rows=  $this->getOrg();
        $this->assign("org_name", $org_rows);   
        $this->display();
    }
    /*
     * 讲座修改页面的显示
     */
    public function showEditLecture(){
        $this->display();
    }
    /*
     * 根据主键id得到讲座的详细信息的js调用的方法
     * 参数：主键id
     * 返回：本条信息的详细信息
     */
    public function getLectureDetialJs(){
        if(IS_POST){
            $id=$_POST["id"];
            $row=  $this->getLectureDetialById($id);
            if($row[0]["speaker_duty_id"]==""){
                $row[0]["speaker_duty_id"]=0;
            }
            if($row[0]["speaker_college"]==""){
                $row[0]["speaker_college"]=0;
            }
            $this->ajaxReturn($row,"JSON");
        }
    }
    /*
     * 根据主键id得到讲座的详细信息的js调用的方法
     * 参数：主键id
     * 返回：本条信息的详细信息
     */
    public function getLectureDetialById($id){
        $sql="select * from t_lecture where lecture_id={$id}";
        $row=  fecthOne($sql);
        return $row;
    }
    /*
     * 讲座信息修改后保存的js调用的方法
     * 参数：修改后一系列信息、被修改信息主键id 
     */
    public function editSaveJs(){
        if(IS_POST){
            $id=$_POST["id"];
            $name=$_POST["name"];
            $time=$_POST["time"];
            $speaker=$_POST["speaker"];
            if($_POST["speakerDuty"]==0){
                $speaker_duty="";
            }
            else{
                $speaker_duty=$_POST["speakerDuty"];
            }
            if($_POST["speakerCollege"]==0){
                $speaker_college="";
            }
            else{
                $speaker_college=$_POST["speakerCollege"];
            }
            $ubtake_college=$_POST["ubtakeCollege"];
            $scope=$_POST["scope"];
            $place=$_POST["place"];
            $org=$_POST["org"];
            $desc=$_POST["desc"];
            $lecture_who_add=$_SESSION["user_id"];
            $lecture_affect_id=  $this->editSave($id, $name, $time, $lecture_who_add, $speaker, 
                    $speaker_duty, $speaker_college, $ubtake_college, $desc, $scope, $place, $org);
            $bool_is_exist=  $this->isExist($id);
            if($bool_is_exist==0){
                $lecture_optional_affect_id=  $this->editSaveLectureOptional($id, $time, $place, $scope, $org);
                if($lecture_affect_id=="1"||$lecture_optional_affect_id=="1"){
                    $this->ajaxReturn("success","JSON");
                }
                else{
                    $this->ajaxReturn("error","JSON");
                }
            }
            else{
                if($lecture_affect_id=="1"){
                    $this->ajaxReturn("success","JSON");
                }
                else{
                    $this->ajaxReturn("error","JSON");
                }
            }
        }
    }
    /*
     * 可选讲座表中是否有记录的方法
     * 参数：id
     * 返回：0：存在，1：不存在
     */
    public function isExist($id){
        $sql="select * from t_lecture_optional where lecture_id={$id}";
        $row=  fecthOne($sql);
        if(!$row){
            return 1;
        }
        else{
            return 0;
        }
    }
    /*
     * 讲座的修改保存方法
     * 参数：修改后信息、主键id
     * 返回：受影响的记录条数
     */
    public  function editSave($id,$name,$time,$lecture_who_add,$speaker,$speaker_duty,$speaker_college,$ubdertake_college,$desc,$scope,$place,$org){
        $arr=array();
        $arr["lecture_name"]=$name;
        $arr["lecture_time"]=$time;
        $arr["lecture_who_add"]=$lecture_who_add;
        $arr["speaker"]=$speaker;
        $arr["speaker_duty_id"]=$speaker_duty;
        $arr["speaker_college"]=$speaker_college;
        $arr["lecture_college"]=$ubdertake_college;
        $arr["lecture_desc"]=$desc;
        $arr["lecture_scope"]=$scope;
        $arr["lecture_place"]=$place;
        $arr["organization_id"]=$org;
        $arr["ordertime"]=date("y-m-d",time());
        $where="lecture_id={$id}";
        $affect_id= update("lecture", $arr, $where);
        return $affect_id;
    }
    /*
     * 可选讲座表修改后保存的方法
     * 参数：修改后保存的方法
     * 返回：受影响的行数
     */
    public function editSaveLectureOptional($lecture_id,$lecture_time,$lecture_place,$lecture_scope,$organization_id){
        $arr=array();
        $arr["lecture_id"]=$lecture_id;
        $arr["lecture_time"]=$lecture_time;
        $arr["lecture_place"]=$lecture_place;
        $arr["lecture_scope"]=$lecture_scope;
        $arr["organization_id"]=$organization_id;
        $arr["isshow"]=0;
        $where="lecture_id={$lecture_id}";
        $affect_id=  update("lecture_optional", $arr, $where);
        return $affect_id;
    }
    /*
     * 审核页面显示
     */
    public function showExamineLecture(){
        $this->display();
    }
    /*
     * 讲座审核的js调用的方法
     */
    public function examineLecture(){
        if(IS_POST){
            $id=$_POST["id"];
            $back_info=$_POST["backInfo"];
            $status=$_POST["status"];       
            $arr=array();
            if($status=="1"){                
                $lecture_detial_row=  $this->getLectureDetialById($id);
                $lecture_optional_affect_id=  $this->saveLectureOptional($id, 4,$lecture_detial_row[0]["lecture_time"], 
                        $lecture_detial_row[0]["lecture_place"],$lecture_detial_row[0]["lecture_scope"] , $lecture_detial_row[0]["organization_id"]);
            }
            else if($status=="3"){
                $arr["lecture_response"]=$back_info;
            }            
            $arr["lecture_status_id"]=$status;
            $where="lecture_id={$id}";
            $update_lecture_affect=  update("lecture", $arr, $where);
            if($update_lecture_affect==1){
                $this->ajaxReturn("success","JSON");
            }
            else{
                $this->ajaxReturn("error","JSON");
            }
        }
    }
    /*
     * 讲座添加的页面显示
     */
    public function showOrgAddLecture(){
        $this->display();
    }
    /*
     * 实验室管理员：讲座保存的方法
     */
    public function orgSaveLectureJs(){
        if(IS_POST){
            $name=$_POST["name"];
            $time=$_POST["time"];
            $speaker=$_POST["speaker"];            
            if($_POST["speakerDuty"]==0){
                $speaker_duty="";
            }
            else{
                $speaker_duty=$_POST["speakerDuty"];
            }            
            if($_POST["speakerCollege"]==0){
                $speaker_college="";
            }
            else{
                $speaker_college=$_POST["speakerCollege"];
            }
            $ubdertake_college=$_POST["ubdertakeCollege"];
            $scope=$_POST["scope"];
            $place=$_POST["place"];
            $org=$_POST["org"];
            $desc=$_POST["desc"];
            $lecture_who_add=$_SESSION["user_id"];
            $affect_id=  $this->saveLecture($name, $time,"", $lecture_who_add, $speaker, $speaker_duty, 
                    $speaker_college, $ubdertake_college, $desc, $scope,2, $place,"","","", "", $org);
            if(!$affect_id){
                $this->ajaxReturn("error","JSON");
            }
            else{
                $this->ajaxReturn("success","JSON");
            }
        }
        else{
            $this->ajaxReturn("提交方式错误，请确认！","JSON");
        }
    }
    /*
     * 实验室管理员：待审核讲座列表显示
     */
    public function showOrgNoExamList(){
        $this->display();
    }
    /*
     * 审核未通过讲座列表
     */
    public function showOrgExamNotPassList(){
        $this->display();
    }
    /*
     * 获取审核意见的方法
     * 参数：主键id
     * 返回：对应主键id的讲座的审核回执信息
     */
    public function getExamAdvice(){
        if(IS_POST){
            $id=$_POST["id"];
            $sql="select lecture_response from t_lecture where t_lecture.lecture_id={$id}";
            $row=  fecthOne($sql);
            $this->ajaxReturn($row,"JSON");
        }
        else{
            $this->ajaxReturn("请求提交方式错误，请确认！","JSON");
        }
    }
    /*
     * 实验室管理员：提交审核的方法
     * 参数：主键id
     * 返回：是否成功
     */
    public function postExamine(){
        if(IS_POST){
            $id=$_POST["id"];
            $arr=array();
            $arr["lecture_status_id"]=2;
            $where="lecture_id={$id}";
            $affect_id=  update("lecture", $arr, $where);
            if($affect_id){
                $this->ajaxReturn("success","JSON");
            }
            else{
                $this->ajaxReturn("error","JSON");
            }
        }
        else{
            $this->ajaxReturn("提交方式错误，请确认！","JSON");
        }
    }
    /*
     * 实验室管理员：已审核讲座列表
     */
    public function showOrgExaminedList(){
        $this->display();
    }
}
