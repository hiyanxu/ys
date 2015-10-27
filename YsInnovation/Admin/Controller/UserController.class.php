<?php

/* 
 * 用户部分的控制器
 */
namespace Admin\Controller;
use Think\Controller;

class UserController extends Controller{
    /*
     * 显示教师列表的方法
     */
    public function showTeaList(){
        $org_rows=  $this->getOrg();
        $this->assign("org_name", $org_rows);   
        $this->display();
    }        
    /*
     * 显示添加用户的页面
     */
    public function showAddTea(){
        $this->display();
    }    
    /*
     * 得到教师职称的js调用的方法
     */
    public function getTeaDutyJs(){
        if(IS_POST){
            $rows=  $this->getTeaDuty();
            $this->ajaxReturn($rows,"JSON");
        }
    }    
    /*
     * 得到教师职称的方法
     */
    public function getTeaDuty(){
        $sql="select * from t_tea_duty where isshow=0";
        $rows=  fecthAll($sql);
        return $rows;
    }    
    /*
     * 得到实验室的js调用的方法
     */
    public function getOrgJs(){
        if(IS_POST){
            $rows=  $this->getOrg();
            $this->ajaxReturn($rows,"JSON");
        }
    }    
    /*
     * 得到实验室
     */
    public function getOrg(){
        $sql="select * from t_organization where isshow='0' and organization_type=2";
        $rows=D()->query($sql);
        return $rows;
    }    
    /*
     * 得到学院js调用的方法
     */
    public function getCollegeJs(){
        if(IS_POST){
            $rows=  $this->getCollege();
            $this->ajaxReturn($rows,"JSON");
        }
    }    
    /*
     * 得到学院的方法
     */
    public function getCollege(){
        $sql="select * from t_college where isshow=0";
        $rows=  fecthAll($sql);
        return $rows;
    }    
    /*
     * 得到用户角色的js调用的方法
     */
    public function getRolesJs(){
        if(IS_POST){
            $rows=  $this->getRoles();
            $this->ajaxReturn($rows,"JSON");
        }
    }    
    /*
     * 得到用户角色的方法
     */
    public function getRoles(){
        $sql="select * from t_role where isshow=0";
        $rows=  fecthAll($sql);
        return $rows;
    }
    /*
     * 超级管理员：保存教师的方法
     * 参数：
     *  教师添加的基本信息    
     * 返回：
     *  受影响的行数主键id
     */
    public function saveTeaBySuperAdmin(){
        if(IS_POST){
            $name=$_POST["name"];
            $sex=$_POST["sex"];
            $account=$_POST["account"];
            $pwd=$_POST["pwd"];
            $jobNum=$_POST["jobNum"];
            $duty=$_POST["duty"];
            $idCardNum=$_POST["idCardNum"];
            $phone=$_POST["phone"];
            $email=$_POST["email"];
            $weixin=$_POST["weiXin"];
            $qq=$_POST["QQ"];
            $org=$_POST["org"];
            $college=$_POST["college"];
            $role=$_POST["role"];
            $bool_repeat=$this->checkRepeat($jobNum);
            if($bool_repeat==1){
                    $this->ajaxReturn("重复添加，请确认后在添加！","JSON");
                    return;
            }
            $user_affect_id=  $this->saveUser(1, $name, $sex,$jobNum,$duty,$idCardNum,$college, $email, $weixin, $phone, $qq, "");
            $user_account_affect_id=  $this->saveUserAccount($user_affect_id, $account, $pwd, $role, $org);
            if($user_affect_id!="0"&&$user_account_affect_id!="0"){
                $this->ajaxReturn("success","JSON");
            }
            else{
                $this->ajaxReturn("error","JSON");
            }
        }
    }
	/*
	* 超级管理员：保存学生的方法
	* 参数：学生的基本信息
	* 返回：受影响的行数id
	*/
	public function saveStuBySuperAdmin(){
            if(IS_POST){
            $name=$_POST["name"];
            $sex=$_POST["sex"];
            $account=$_POST["account"];
            $pwd=$_POST["pwd"];
            $stu_num=$_POST["stuNum"];
            $duty=$_POST["duty"];
            $idCardNum=$_POST["idCardNum"];
            $phone=$_POST["phone"];
            $email=$_POST["email"];
            $weixin=$_POST["weiXin"];
            $qq=$_POST["QQ"];
            $org=$_POST["org"];
            $inno_num=$_POST["innoNum"];
            $college=$_POST["college"];
            $role=$_POST["role"];
            $bool_repeat=$this->checkRepeat($stu_num);
            if($bool_repeat==1){
                $this->ajaxReturn("重复添加，请确认后在添加！","JSON");
                return;
            }
            $user_affect_id=$this->saveUser(0,$name,$sex,$stu_num,"",$idCardNum,$college,$email,$weixin,$phone,$qq,$inno_num);
            $user_account_affect_id=$this->saveUserAccount($user_affect_id,$account,$pwd,$role,$org);
            if($user_affect_id!="0"&&$user_account_affect_id!="0"){
                $this->ajaxReturn("success","JSON");
            }
            else{
                $this->ajaxReturn("error","JSON");
            }
	}
}
	/*
	* 一个学生只允许在一个实验室的验证方法
	* 参数：用户账号、实验室id
	* 返回：true：目前学生可添加   false：学生不可添加
	*/
	public function checkStuOrg($account,$org_id){
		$sql="select * from t_user_account where t";
	}
    /*
     * 保存用户的方法
     * 参数：
     *  用户类型、用户基本信息
     * 返回：
     *  受影响的行数主键id
     */
    public  function saveUser($userType,$name,$sex,$user_num,$user_duty,$user_idcard_num,$college,$email,$weixin,$phone,$qq,$innovation_num){
        $arr=array();
        $arr["user_name"]=$name;
        $arr["user_sex"]=$sex;
        $arr["is_tea_or_stu"]=$userType;
        $arr["user_num"]=$user_num;
        $arr["user_duty"]=$user_duty;
        $arr["user_idcard_num"]=$user_idcard_num;
        $arr["college_id"]=$college;
        $arr["email"]=$email;
        $arr["weixin"]=$weixin;
        $arr["phonenum"]=$phone;
        $arr["qq"]=$qq;
        $arr["innovation_num"]=$innovation_num;
        $arr["addtime"]=  date("y-m-d",  time());
        $affect_id=  insert_two("user", $arr);
        return $affect_id;
    }
    /*
     * 保存用户账号的方法
     * 参数：
     *  用户账号的基本信息
     * 返回：
     *  受影响的行数的主键id
     */
    public function saveUserAccount($user_id,$account,$pwd,$role,$organization){
        $arr=array();
        $arr["user_id"]=$user_id;
        $arr["user_account"]=$account;
        $arr["user_account_pwd"]=$pwd;
        $arr["user_role_id"]=$role;
        $arr["organization_id"]=$organization;        
        $affect_id=  insert_two("user_account", $arr);
        return $affect_id;
    }
	/*
	* 添加查重方法
	* 参数：工号或学号
	* 返回：true：无重复   false：重复
	*/
	public function checkRepeat($num){
		$sql="select * from t_user where user_num={$num}";
		$row=fecthOne($sql);
		if(!$row){
			return 0;
		}
		else{
			return 1;
		}
	}
    /*
     * 得到当前数量的js调用的方法
     * 参数：
     *  用户类型、实验室id
     * 返回：
     *  当前数量count
     */
    public function getUserCountJs(){
        if(IS_POST){
            $user_type=$_POST["userType"];
            $org=$_POST["org"];
            $count=  $this->getUserCount($user_type, $org);
            $this->ajaxReturn($count,"JSON");
        }
    }
    /*
     * 得到当前用户数量的方法
     * 参数：
     *  用户类型、实验室id
     * 返回：
     *  当前用户数量count
     */
    public function getUserCount($userType,$org){
        if($org=="all"){
            $sql="select count(*) from t_user_account,t_user"
                    . " where t_user_account.user_id=t_user.user_id and t_user.is_tea_or_stu={$userType}";
        }
        else{
            $sql="select count(*) from t_user_account,t_user"
                    . " where t_user_account.user_id=t_user.user_id and t_user.is_tea_or_stu={$userType} and t_user_account.organization_id='{$org}'";
        }
        $count=D()->query($sql);
        return $count;
    }
    /*
     * 超级管理员：得到用户数据的js调用党法
     * 参数：
     *  用户类型、实验室id、当前页码数、每页显示的条数
     * 返回：
     *  此条件下的用户信息
     */
    public function getUserDataJs(){
        if(IS_POST){
            $user_type=$_POST["userType"];
            $org=$_POST["org"];
            $page=$_POST["page"];
            $rows=$_POST["rows"];
            $start_record=$rows*($page-1);
            $user_rows=  $this->getUserData($user_type, $org, $start_record, $rows);
            foreach ($user_rows as $key => $value) {
                //教师职称获取
                $dutyWhere="tea_duty_id={$value["user_duty"]}";
                $dutyTable="tea_duty";
                $duty_row=  $this->getForeignKeyData($dutyWhere, $dutyTable);
                $user_rows[$key]["duty_name"]=$duty_row[0]["tea_duty_name"];
                //所属实验室获取
                $orgWhere="organization_id={$value['organization_id']}";
                $orgTable="organization";
                $org_row=  $this->getForeignKeyData($orgWhere, $orgTable);
                $user_rows[$key]['org_name']=$org_row[0]['organization_name'];
                //将性别数字换成文字
                if($value["user_sex"]==0){
                    $user_rows[$key]["user_sex"]="男";
                }
                else{
                    $user_rows[$key]["user_sex"]="女";
                }
            }
            //var_dump($user_rows);
            $this->ajaxReturn($user_rows,"JSON");
        }
        else{
            $this->ajaxReturn("非法请求！","JSON");
        }
    }
    /*
     * 得到用户数据的方法
     * 参数：
     *  用户类型、实验室id、当前页码数、每页显示的条数
     * 返回：
     *  此条件下的用户信息
     */
    public function getUserData($user_type,$org,$start_record,$rows){
        if($org=="all"){
            $sql="select t_user_account.*,t_user.* from t_user,t_user_account "
                    . "where t_user.is_tea_or_stu='{$user_type}' and t_user_account.user_id=t_user.user_id limit $start_record,$rows";
        }
        else{
            $sql="select t_user_account.*,t_user.* from t_user,t_user_account "
                    . "where t_user.is_tea_or_stu='{$user_type}' and t_user_account.user_id=t_user.user_id and t_user_account.organization_id='{$org}' limit $start_record,$rows";
        }
        $get_rows=  fecthAll($sql);
        return $get_rows;
    }
    
    /*
     * 根据课程表外键得到相应外键数据
     * 参数：条件：$where
     *      对应表名：$table_name 
     */
    public function getForeignKeyData($where,$table_name){
        $table=D("{$table_name}");
        $rows=$table->where($where)->select();
        return $rows;
    }
    /*
     * 显示学生列表页面
     */
    public function showStuList(){
        $org_rows=  $this->getOrg();
        $this->assign("org_name", $org_rows);
        $this->display();
    }
    /*
     * 添加学生页面的显示
     */
    public function showAddStu(){
        $this->display();
    }
    /*
     * 显示修改教师的页面
     */
    public function showEditTea(){
        $this->display();
    }
    /*
     * 得到详细信息的js调用的方法
     * 参数：得到主键信息的id
     * 返回：本条的详细信息
     */
    public function getUserDetialByIdJs(){
        if(IS_POST){
            $id=$_POST["id"];
            $row=  $this->getUserDetialById($id);
            $this->ajaxReturn($row,"JSON");
        }
    }
    /*
     * 得到详细信息的方法
     * 参数：得到主键信息的id
     * 返回：本条的详细信息
     */
    public function getUserDetialById($id){
        $sql="select t_user.*,t_user_account.* from t_user,t_user_account where t_user.user_id={$id} and t_user_account.user_id=t_user.user_id";
        $row=  fecthOne($sql);
        return $row;
    }
    /*
     * 修改的保存按钮的js调用的方法
     * 参数：修改后的信息，被修改信息的id
     * 返回：受影响的行数
     */
    public function userEditSaveJs(){
        if(IS_POST){
            $user_id=$_POST["userId"];
            $user_account_id=$_POST["userAccountId"];
            $user_type=$_POST["userType"];
            $name=$_POST["name"];
            $sex=$_POST["sex"];
            $account=$_POST["account"];
            $pwd=$_POST["pwd"];
            //根据当前用户类型的不同，分别进行赋值
            if($user_type==1){
                $user_num=$_POST["jobNum"];
                $duty=$_POST["duty"];
                $inno_num="";
            }
            else{
                $user_num=$_POST["stuNum"];
                $duty="";
                $inno_num=$_POST["innoNum"];
            }
            $idcard_num=$_POST["idCardNum"];
            $phone=$_POST["phone"];
            $email=$_POST["email"];
            $weixin=$_POST["weixin"];
            $qq=$_POST["qq"];
            $org=$_POST["org"];
            $college=$_POST["college"];
            $role=$_POST["role"];
            $user_affect_id=  $this->userEditSave($user_id, $name, $sex, $user_type, $user_num, $duty, $idcard_num, $college, $email, $weixin, $phone, $qq, $inno_num);
            $user_account_affect_id=  $this->userAccountEditSave($user_account_id, $user_id, $account, $pwd, $role, $org);
            if($user_affect_id!="0"||$user_account_affect_id!="0"){
                $this->ajaxReturn("success","JSON");
            }
            else{
                $this->ajaxReturn("error","JSON");
            }
        }
    }
    /*
     * 用户修改后保存的方法
     * 参数：修改后信息、主键id
     */
    public function userEditSave($user_id,$name,$sex,$user_type,$user_num,$duty,$idcard_num,$college,$email,$weixin,$phone,$qq,$inno_num){
        $arr=array();
        $arr["user_name"]=$name;
        $arr["user_sex"]=$sex;
        $arr["is_tea_or_stu"]=$user_type;
        $arr["user_num"]=$user_num;
        $arr["user_duty"]=$duty;
        $arr["user_idcard_num"]=$idcard_num;
        $arr["college_id"]=$college;
        $arr["email"]=$email;
        $arr["weixin"]=$weixin;
        $arr["phonenum"]=$phone;
        $arr["qq"]=$qq;
        $arr["innovation_num"]=$inno_num;
        $arr["addtime"]=date("y-m-d",time());
        $where="user_id='{$user_id}'";
        $affect_id=  update("user", $arr, $where);
        return $affect_id;
    }
    /*
     * 用户账号修改后的保存方法
     * 参数：修改后的信息、主键id
     * 返回：受影响的行数
     */
    public function userAccountEditSave($user_account_id,$user_id,$user_account,$user_account_pwd,$user_role_id,$organization_id){
        $arr=array();
        $arr["user_id"]=$user_id;
        $arr["user_account"]=$user_account;
        $arr["user_account_pwd"]=$user_account_pwd;
        $arr["user_role_id"]=$user_role_id;
        $arr["organization_id"]=$organization_id;        
        $where="user_account_id='{$user_account_id}'";
        $affect_id=  update("user_account", $arr, $where);
        return $affect_id;
    }
    /*
     * 修改学生页面的显示
     */
    public function showEditStu(){
        $this->display();
    }
    /*
     * 角色列表的显示
     */
    public function showRoleList(){
        $this->display();
    }
    /*
     * 角色添加页面的显示
     */
    public function showAddRole(){
        $this->display();
    }
    /*
     * 角色添加保存的方法
     * 参数：角色名称
     * 返回：受影响的行数
     */
    public function saveRole(){
        if(IS_POST){
            $role_name=$_POST["roleName"];
            $arr=array();
            $arr["role_name"]=$role_name;
            $arr["isshow"]=0;
            $affect_id=  insert_two("role", $arr);
            if($affect_id){
                $this->ajaxReturn("success","JSON");
            }
            else{
                $this->ajaxReturn("error","JSON");
            }
        }
    }
    /*
     * 显示修改角色的页面
     */
    public function showEditRole(){
        $this->display();
    }
    /*
     * 根据id得到角色的详细信息
     * 参数：角色的主键id
     * 返回：角色的详细信息
     */
    public function getRoleDetialByIdJs(){
        if(IS_POST){
            $id=$_POST["id"];
            $sql="select * from t_role where role_id={$id}";
            $row=  fecthOne($sql);
            $this->ajaxReturn($row,"JSON");
        }
    }
    /*
     * 角色信息修改的保存方法
     * 参数：角色id、角色信息
     * 返回：受影响的行数id
     */
    public function editRoleSave(){
        if(IS_POST){
            $id=$_POST["id"];
            $role_name=$_POST["roleName"];
            $arr=array();
            $arr["role_name"]=$role_name;
            $arr["isshow"]=0;
            $where="role_id={$id}";
            $affect_id=  update("role", $arr, $where);
            if(!$affect_id){
                $this->ajaxReturn("success","JSON");
            }
            else{
                $this->ajaxReturn("error","JSON");
            }
        }
    }
    /*
     * 权限分配页面的显示
     */
    public function showMenuDistri(){
        $this->display();
    }
    /*
     * 实验室管理员：教师管理页面（列表页）
     */
    public function showOrgTeaList(){
        $this->display();
    }
    /*
     * 实验室管理员：教师添加页面
     */
    public function showOrgAddTea(){
        $this->display();
    }
    /*
     * 实验室管理员：教师修改页面
     */
    public function showOrgEditTea(){
        $this->display();
    }
    /*
     * 实验室管理员：学生管理页面（列表页）
     */
    public function showOrgStuList(){
        $this->display();
    }
    /*
     * 实验室管理员：学生添加页面
     */
    public function showOrgAddStu(){
        $this->display();
    }
    /*
     * 实验室管理员：修改页面的显示
     */
    public function showOrgEditStu(){
        $this->display();
    }
    /*
     * 超级管理员：管理员添加页面
     */
    public function showAddAdmin(){
        $this->display();
    }
    /*
     * 得到所有教师的方法
     */
    public function getAllTea(){
        if(IS_POST){
            $sql="select * from t_user where is_tea_or_stu='1'";
            $user_row=  fecthOne($sql);
            $this->ajaxReturn($user_row,"JSON");
        }
    }
    /*
     * 管理员添加保存的方法
     * 参数：一系列post的参数   teaId:tea,role:role,account:account,pwd:pwd
     * 返回：受影响的行数
     */
    public function saveAdmin(){
        if(IS_POST){
            $user_id=$_POST["teaId"];
            $role=$_POST["role"];
            $account=$_POST["account"];
            $pwd=$_POST["pwd"];
            $user_account_row=  $this->getUseAccountByUserId($user_id);
            $arr=array();
            $arr["user_id"]=$user_id;
            $arr["user_account"]=$account;
            $arr["user_account_pwd"]=$pwd;
            $arr["user_role_id"]=$role;
            $arr["organization_id"]=$user_account_row[0]["organization_id"];
            $affect_id=insert_two("user_account", $arr);
            if($affect_id!=0){
                $this->ajaxReturn("success","JSON");
            }
            else{
                $this->ajaxReturn("error","JSON");
            }
        }
    }
    /*
     * 根据用户表主键id，得到用户账号信息的方法
     * 参数：用户表主键id
     * 返回：用户账号表中的一条信息
     */
    public function getUseAccountByUserId($user_id){
        $sql="select * from t_user_account where user_id={$user_id}";
        $row=  fecthOne($sql);
        return $row;
    }
    /*
     * 管理员列表页面
     */
    public function showAdminList(){
        $this->display();
    }
    /*
     * 得到管理员数量的方法
     */
    public  function getAdminCountJs(){
        if(IS_POST){
            $sql="select count(*) from t_user_account where user_role_id in (1,2,3)";
            $row=D()->query($sql);
            $this->ajaxReturn($row,"JSON");
        }
    }
    /*
     * 得到管理员的方法
     * 参数：当前页码数、每页的条数
     * 返回：符合条件内的信息
     */
    public  function getAdminListJs(){
        if(IS_POST){
            $page=$_POST["page"];
            $rows=$_POST["rows"];
            $start_record=$rows*($page-1);
            $admin_rows=  $this->getAdminList($start_record, $rows);
            $this->ajaxReturn($admin_rows,"JSON");
        }
    }
    /*
     * 得到管理员的方法
     */
    public function getAdminList($start_record,$rows){
        $sql="select t_user_account.*,t_user.user_name,t_role.role_name from t_user_account,t_user,t_role where t_user_account.user_role_id in (1,2,3) and t_user.user_id=t_user_account.user_id and t_role.role_id=t_user_account.user_role_id limit $start_record,$rows";
        $feach_rows=  fecthAll($sql);
        return $feach_rows;
    }
    /*
     * 管理员修改页面的显示
     */
    public function showEditAdmin(){
        $this->display();
    }
    /*
     * 根据主键id得到详细信息的方法
     * 参数：主键id
     * 返回：此条信息的详细信息
     */
    public function getAdminDetialJs(){
        if(IS_POST){
            $id=$_POST["id"];
            $row=  $this->getAdminDetial($id);
            $this->ajaxReturn($row,"JSON");
        }
    }
    /*
     * 根据主键id得到详细信息
     */
    public function getAdminDetial($id){
        $sql="select t_user_account.*,t_user.user_name from t_user_account,t_user where t_user_account.user_account_id={$id} and t_user_account.user_id=t_user.user_id";
        $row=  fecthOne($sql);
        return $row;
    }
    /*
     * 管理员修改后保存的方法id:id,name:name,role:role,account:account,pwd:pwd
     */
    public function editSaveAdmin(){
        if(IS_POST){
            $id=$_POST["id"];
            $name=$_POST["name"];
            $role=$_POST["role"];
            $account=$_POST["account"];
            $pwd=$_POST["pwd"];
            $arr=array();
            $arr["user_account"]=$account;
            $arr["user_account_pwd"]=$pwd;
            $arr["user_role_id"]=$role;
            $where="user_account_id={$id}";
            $affect_id=  update("user_account", $arr, $where);
            $this->ajaxReturn($affect_id,"JSON");
        }
    }
    /*
     * 根据用户账号表id删除某个账号
     * 参数：主键id
     */
    public function delAdminByIdJs(){
        if(IS_POST){
            $id=$_POST["id"];
            $return_prompt=  $this->delAdminById($id);
            $this->ajaxReturn($return_prompt,"JSON");
        }
    }
    /*
     * 根据用户主键id删除用户账号
     */
    public function delAdminById($id){
        $sql="select * from t_user_account where user_account_id={$id}";
        $row=  fecthOne($sql);
        $arr=array();
        $arr["user_id"]=$row[0]["user_id"];
        $arr["user_account_id"]=$row[0]["user_account_id"];
        $arr["user_account"]=$row[0]["user_account"];
        $arr["user_account_pwd"]=$row[0]["user_account_pwd"];
        $arr["user_role_id"]=$row[0]["user_role_id"];
        $his_affect_id=  insert_two("his_user_account", $arr);
        $where="user_account_id={$id}";
        $user_account=D("user_account");
        $del_affect_id=$user_account->where($where)->delete();   //成功后返回受影响的记录数
        $return_prompt;
        if($his_affect_id!=0&&$del_affect_id==1){
            $return_prompt="success";
            return $return_prompt;
        }
        else{
            $return_prompt="error";
            return $return_prompt;
        }        
    }
}