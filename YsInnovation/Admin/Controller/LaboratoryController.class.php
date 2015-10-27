<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace Admin\Controller;
use Think\Controller;

class LaboratoryController extends Controller{
    
    /*
     * 请求获取实验室列表的方法
     * js中以post方式请求数据
     */
    public function getLaboratory(){
        if(IS_POST){
            $sql="select organization_id,organization_name from t_organization where organization_type='2' and isshow='0'";
            $rows=  fecthAll($sql);
            $this->ajaxReturn($rows,"JSON");
        }
    }
    
    /*
     * 得到实验室所有成员的方法
     * 参数：1、实验室id 2、用户类型userType
     */
    public function getLaboratoryUser(){
        if(IS_POST){
            $orgId=$_POST['orgId'];
            $userType=$_POST['userType'];
            $user_rows=  $this->getUserByOrgIdAndUserType($orgId, $userType);
            $this->ajaxReturn($user_rows,"JSON");
        }
    }
    
    /*
     * 根据实验室id获取实验室账号
     * 参数：实验室id
     */
    public function getAccountByLabo($orgId){
        $sql="select * from t_user_account where organization_id='{$orgId}'";
        $account_rows=  fecthAll($sql);
        return $account_rows;
    }
    
    /*
     * 根据实验室id和用户类型获取实验室所属类型的人员
     * 参数：实验室id：orgId
     *      用户类型：userType
     */
    public function getUserByOrgIdAndUserType($orgId,$userType){
        $sql="select t_user.* from t_user,t_user_account where t_user_account.organization_id='{$orgId}' and t_user.user_id=t_user_account.user_id and t_user.is_tea_or_stu='{$userType}'";
        $user_rows=  fecthAll($sql);
        return $user_rows;
    }
    
    /*
     * 根据实验室id获取实验室创新号段的js调用的方法
     * 参数：实验室id
     * 返回：实验室号段
     */
    public function getInnoNumByOrgJs(){
        if(IS_POST){
            $org_id=$_POST["orgId"];
            $row=  $this->getInnoNumByOrg($org_id);
            $this->ajaxReturn($row,"JSON");
        }
    }
    /*
     * 根据实验室id获取实验室创新号段的方法
     * 参数：实验室id
     * 返回：实验室号段
     */
    public function getInnoNumByOrg($org_id){
        $sql="select organization_inno_num from t_organization where organization_id={$org_id}";
        $row=  fecthOne($sql);
        return $row;
    }
    /*
     * 实验室添加页面的显示
     */
    public function showAddLaboratory(){
        $this->display();
    }
    /*
     * 实验室保存js调用的方法
     * 参数：一系列信息
     * 返回：受影响的行数
     */
    public function saveLaboratoryJs(){
        if(IS_POST){
            $name=$_POST["name"];
            $eng_name=$_POST["engName"];
            $idea=$_POST["idea"];
            $purpose=$_POST["purpose"];
            $picture=$_POST["picture"];
            $location=$_POST["location"];
            $inno_num=$_POST["innoNum"];
            $phone=$_POST["phone"];
            $remark=$_POST["remark"];
            $college=$_POST["college"];
            $desc=$_POST["desc"];
            $affect_id=  $this->saveLaboratory($name, $eng_name, $college, $picture, $desc, $idea, $purpose, $location, $inno_num, $phone, $remark);
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
     * 实验室保存的方法
     * 参数：实验室添加的基本信息
     * 返回：受影响的行数
     */
    public function saveLaboratory($name,$eng_name,$college,$image,$desc,$idea,$purpose,$location,$inno_num,$phone,$remark){
        $arr=array();
        $arr["organization_name"]=$name;
        $arr["organization_english_name"]=$eng_name;
        $arr["organization_type"]=2;
        $arr["lead_college_id"]=$college;
        $arr["organization_image"]=$image;
        $arr["organization_desc"]=$desc;
        $arr["organization_idea"]=$idea;
        $arr["organization_purpose"]=$purpose;
        $arr["organization_loc"]=$location;
        $arr["organization_inno_num"]=$inno_num;
        $arr["organization_tel"]=$phone;
        $arr["remark"]=$remark;
        $arr["isshow"]=0;
        $affect_id=insert_two("organization", $arr);
        return $affect_id;
    }
    /*
     * 实验室列表页的显示
     */
    public function showLaboratoryList(){
        $this->display();
    }
    /*
     * 得到实验室数量的方法
     * 参数：实验室id
     * 返回：查询得到的实验室信息
     */
    public function  getLaboratoryCountJs(){
        if(IS_POST){
            $org=$_POST["org"];
            $count=  $this->getLabotoryCount($org);
            $this->ajaxReturn($count,"JSON");
        }
        else{
            $this->ajaxReturn("提交方式错误，请确认！","JSON");
        }
    }
    /*
     * 根据实验室信息得到对应实验室的数量
     */
    public function getLabotoryCount($org){
        if($org=="all"){
            $sql="select count(*) from t_organization where organization_type=2 and isshow=0";
        }
        else{
            $sql="select count(*) from t_organization where organization_type=2 and isshow=0 and organization_id={$org}";
        }
        $count=D()->query($sql);
        return $count;
    }
    /*
     * 根据条件得到实验室的信息
     * 参数：实验室、当前页码数、每页显示的条数
     * 返回：符合条件的实验室信息
     */
    public function getLaboratoryListJs(){
        if(IS_POST){
            $org=$_POST["org"];
            $page=$_POST["page"];
            $rows=$_POST["rows"];
            $start_record=$rows*($page-1);
            $get_rows=  $this->getLaboratoryData($org, $start_record, $rows);
            
            foreach ($get_rows as $key => $value) {
                $tea_in_charge_row=$this->getLaboratoryInCharge(1,$value['organization_id']);
                if($tea_in_charge_row){
                    $get_rows[$key]['tea_in_charge_name']=$tea_in_charge_row[0]['user_name'];
                }
                else{
                    $get_rows[$key]['tea_in_charge_name']="";
                }
                
                $stu_in_charge_row=$this->getLaboratoryInCharge(0,$value['organization_id']);
                if($stu_in_charge_row){
                    $get_rows[$key]['stu_in_charge_name']=$stu_in_charge_row[0]['user_name'];
                }
                else{
                    $get_rows[$key]['stu_in_charge_name']="";
                }
                
                //得到实验室所属学院的名称
                $where3="college_id={$value['lead_college_id']}";
                $table3="college";
                $col_row=  getForeignKeyData($where3, $table3);
                $get_rows[$key]['college_name']=$col_row[0]['college_name'];
                
            }  
            //var_dump($get_rows);
            $this->ajaxReturn($get_rows,"JSON");
        }
        else{
            $this->ajaxReturn("提交方式错误，请确认！","JSON");
        }
    }
    /*
     * 根据条件得到实验室的信息
     * 参数：实验室、开始的数量、查询的条数
     * 返回：符合条件的实验室信息
     */
    public function getLaboratoryData($org,$start_record,$rows){
        if($org=="all"){
            $sql="select * from t_organization where organization_type=2 and isshow=0 limit $start_record,$rows";
        }
        else{
            $sql="select * from t_organization where organization_type=2 and isshow=0 and organization_id={$org} limit $start_record,$rows";
        }
        $get_rows=  fecthAll($sql);
        return $get_rows;
    }
    /*
    得到实验室负责人信息
    参数：负责人类型（0：学生  1：教师）、实验室主键id
    返回：负责人信息
    */
    public function getLaboratoryInCharge($in_charge_type,$org){
        if($in_charge_type==0){
                $account_sql="select * from t_user_account where organization_id={$org} and user_role_id=3";
        }
        else if($in_charge_type=1){
                $account_sql="select * from t_user_account where organization_id={$org} and user_role_id=2";
        }
        $row=  fecthOne($account_sql);
        if($row){
        $user_id=$row[0]["user_id"];
        $user_sql="select * from t_user where user_id={$user_id}";
        $in_charge_row=fecthOne($user_sql);
        }
        else{
            $in_charge_row="";
        }
        return $in_charge_row; 
    }
    /*
     * 实验室修改页面的显示
     */
    public function showEditOrg(){
        $this->display();
    }
    /*
     * 获取某个实验室的详细信息的js调用方法
     * 参数：主键id
     * 返回：某个实验室的详细信息
     */
    public function getOrgDetialByIdJs(){
        if(IS_POST){
            $id=$_POST["id"];
            $row=  $this->getOrgDetialById($id);
            $this->ajaxReturn($row,"JSON");
        }
    }
    /*
     * 获取某个实验室的详细信息的方法
     * 参数：主键id
     * 返回：某个实验室的详细信息
     */
    public function getOrgDetialById($id){
        $sql="select * from t_organization where organization_id={$id}";
        $row=  fecthOne($sql);
        return $row;
    }
    /*
     * 实验室修改的js调用的方法
     * id:id,name:name,engName:engName,idea:idea,purpose:purpose,picture:picture,
     * location:location,innoNum:innoNum,phone:phone,remark:remark,college:college,desc:desc
     */
    public function labEditSaveJs(){
        if(IS_POST){
            $id=$_POST["id"];
            $name=$_POST["name"];
            $eng_name=$_POST["engName"];
            $idea=$_POST["idea"];
            $purpose=$_POST["purpose"];
            $picture=$_POST["picture"];
            $location=$_POST["location"];
            $inno_num=$_POST["innoNum"];
            $phone=$_POST["phone"];
            $remark=$_POST["remark"];
            $college=$_POST["college"];
            $desc=$_POST["desc"];
            $affect_id=  $this->labEditSave($id, $name, $eng_name, $college, $picture, $desc, $idea, $purpose, $location, $inno_num, $phone, $remark);
            if($affect_id==1){
                $this->ajaxReturn("success","JSON");
            }
            else{
                $this->ajaxReturn("error","JSON");
            }
        }
        else{
            $this->ajaxReturn("数据提交方式错误，请确认！","JSON");
        }
    }
    public function labEditSave($id,$name,$eng_name,$college,$image,$desc,$idea,$purpose,$location,$inno_num,$phone,$remark){
        $arr=array();
        $arr["organization_name"]=$name;
        $arr["organization_english_name"]=$eng_name;
        $arr["lead_college_id"]=$college;
        $arr["organization_image"]=$image;
        $arr["organization_desc"]=$desc;
        $arr["organization_idea"]=$idea;
        $arr["organization_purpose"]=$purpose;
        $arr["organization_loc"]=$location;
        $arr["organization_inno_num"]=$inno_num;
        $arr["organization_tel"]=$phone;
        $arr["remark"]=$remark;
        $where="organization_id={$id}";
        $affect_id=  update("organization", $arr, $where);
        return $affect_id;
    }
    /*
     * 实验室管理员：实验室维护页面显示
     */
    public function showLabMaintain(){
        $this->display();
    }
    /*
     * 实验室管理员：实验室完善页面显示
     */
    public function showMaintainOrg(){
        $this->display();
    }
}

