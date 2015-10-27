<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace Admin\Controller;
use Think\Controller;

class CourseController extends Controller{
    
    
    /*
     * 超级管理员处：
     * 显示添加课程的页面
     */
    public function showAddCourse(){
        $org_rows=  $this->getOrg();
        $this->assign("org_name", $org_rows);   
        $this->display();
        
//        self::$username;
    }
    
    /*
     * 保存课程信息的方法
     * 传入参数：
     *  课程的一系列信息
     * name:courseName,num:courseNum,beginTime:courseBeginTime,endTime:courseEndTime,seme:courseSeme,org:courseOrg,speaker:courseSpeaker,
        period:coursePeriod,score:courseScore,place:coursePlace,hour:courseHour,content:courseContent
     * 提交方式：post 
     * 返回:新添加记录的主键id，以json格式返回
     */
    public function saveCourse(){
        if(IS_POST){
            $name=$_POST["name"];
            $num=$_POST["num"];
            $begin_time=$_POST["beginTime"];
            $end_time=$_POST["endTime"];
            $seme=$_POST["seme"];
            $org=$_POST["org"];
            $speaker=$_POST["speaker"];
            $period=$_POST["period"];
            $score=$_POST["score"];
            $place=$_POST["place"];
            $hour=$_POST["hour"];
            $content=$_POST["content"];
            $arr=array();
            $arr["course_name"]=$name;
            $arr["course_outline"]=$content;
            $arr["course_hourse"]=$hour;
            $arr["course_begin"]=$begin_time;
            $arr["course_end"]=$end_time;
            $arr["course_who_add"]=$_SESSION["user_id"];
            $arr["speaker_id"]=$speaker;
            $arr["semester_id"]=$seme;
            $arr["course_num"]=$num;
            $arr["course_score"]=$score;
            $arr["course_place"]=$place;
            $arr["course_period"]=$period;
            $arr["status_id"]=1;
            $arr["organization_id"]=$org;
            $arr["ordertime"]=date("y-m-d",time());
            $arr["isshow"]=0;
            $return_id=  insert_two("course", $arr);
            $this->ajaxReturn($return_id,"JSON");
        }
    }
    
    /*
     * 获取已审核课程列表页面
     */
    public function showExaminedList(){
        $org_rows=  $this->getOrg();
        $this->assign("org_name", $org_rows);
        $this->display();
    }
    /*
     * 获取课程列表信息
     */
    public function getCourseListData(){
        if(IS_POST){
            $status=$_POST["status"];
            $org=$_POST["org"];
            $page=$_POST["page"];
            $rows=$_POST["rows"];
            $start_record=$rows*($page-1);
            $course_rows=  $this->getCourseList($status,$org,$start_record,$rows);
            $this->ajaxReturn($course_rows,"JSON");
        }
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
     * 得到课程信息数量
     * 参数：
     *  当前课程状态：status
     *  实验室：org
     * 返回：当前课程数量count
     */
    public function getCourseCount(){
        if(IS_POST){
            $status=$_POST["status"];
            $org=$_POST["org"];
            if($org=="all"){
                $sql="select count(*) from t_course where isshow='0' and status_id='{$status}'";
            }
            else{
                $sql="select count(*) from t_course where isshow='0' and status_id='{$status}' and organization_id='{$org}'";
            }            
            $return_count=D()->query($sql);
            $this->ajaxReturn($return_count,"JSON");
        }
    }    
    
    
    /*
     * 按审核状态、实验室id查找课程列表
     * 参数：
     *  课程状态：$_POST['status']
     *  实验室id：$_POST['org']
     * 返回：以json格式返回$rows
     */
    public function getCourseByStatusOrg(){
        if(IS_POST){
            $status_id=$_POST['status'];
            $org_id=$_POST['org'];
            $rows=  $this->getCourseList($status_id, $org_id);
            $this->ajaxReturn($rows,"JSON"); 
        }
    }
    
    /*
     * 根据课程状态id、实验室id获取课程列表的方法
     * 参数：
     *  课程状态：$status_id
     *  实验室id：$org_id
     * 返回：$row
     */
    public function getCourseList($status_id,$org_id,$start_record,$rows){
        if($org_id=="all"){
            //当org_id为all，表示当前查询所有实验室的课程列表
            $sql="select * from t_course where status_id='{$status_id}' and isshow=0 limit $start_record,$rows"; //根据当前状态参数，查询出当前状态下的所有课程            
        }
        else{
            //根据当前状态和实验室id查找出属于此实验室的所以此状态下的课程
            $sql="select * from t_course where status_id='{$status_id}' and organization_id='{$org_id}' and isshow=0 limit $start_record,$rows";
        }
        $course_rows=  fecthAll($sql);
        foreach ($course_rows as $key => $value) {
            //实验室名字获取
            $where1="organization_id={$value['organization_id']}";
            $table1="organization";
            $org_row=  $this->getForeignKeyData($where1, $table1);
            $course_rows[$key]['org_name']=$org_row[0]['organization_name'];
            //主讲人名字获取
            $where2="user_id={$value['speaker_id']}";
            $table2="user";
            $org_row=  $this->getForeignKeyData($where2, $table2);
            $course_rows[$key]['speaker_name']=$org_row[0]['user_name'];
            //课程添加人名字获取
            $where3="user_id={$value['course_who_add']}";
            $table3="user";
            $org_row=  $this->getForeignKeyData($where3, $table3);
            $course_rows[$key]['who_add_name']=$org_row[0]['user_name'];
        }
        return $course_rows;
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
     * 显示修改课程的页面
     */
    public function showEditCourse(){
//        $sql="select * from t_course where course_id='{$id}'";
//        $row=  fecthOne($sql);
//        $this->ajaxReturn($row,"JSON");   
        $org_rows=  $this->getOrg();
        $this->assign("org_name", $org_rows);
        $this->display();
    }
    
     /*
     * 得到课程详细信息
      * 参数：课程主键id
      * 返回：课程基本信息
     */
    public function getCourseDetialById($id){
        $sql="select * from t_course where course_id='{$id}'";
        $row=  fecthOne($sql);
        return $row;
    }
    
    /*
     * 根据课程id得到可选课程的详细信息
     * 参数：课程主键id
     * 返回：可选课程内的一系列信息 
     */
    public function getCourseOptionalDetialById($id){
        $sql="select * from t_course_optional where course_id='{$id}'";
        $row=  fecthOne($sql);
        return $row;
    }
    
    /*
     * 根据可选课程id得到课程的选择人数
     * 参数：可选课程主键id
     * 返回：本课程的选择人数
     */
    public function getCourseOptionalSelectCount($id){
        $sql="select count(*) from t_course_selected where course_optional_id='{$id}'";
        $rows_count=D()->query($sql);
        return $rows_count;
    }
    
    /*
     * 点击课程修改后得到课程信息的方法
     * 参数：信息id
     * 提交方式：post
     * 返回：课程的全部信息
     */
    public function getCourseById(){
        if(IS_POST){
            $id=$_POST['id'];
            $row=  $this->getCourseDetialById($id);
            $this->ajaxReturn($row,"JSON");
        }
    }
    
    
    /*
     * 课程修改的方法
     * 参数：课程的一系列信息
     * 返回：受影响的行数
     */
    public function updateCourse(){
        if(IS_POST){
            $id=$_POST["id"];
            $course_detial=  $this->getCourseDetialById($id);//根据课程主键id得到课程的详细信息        
            $name=$_POST["name"];
            $num=$_POST["num"];
            $begin_time=$_POST["beginTime"];
            $end_time=$_POST["endTime"];
            $seme=$_POST["seme"];
            $org=$_POST["org"];
            $speaker=$_POST["speaker"];
            $period=$_POST["period"];
            $score=$_POST["score"];
            $place=$_POST["place"];
            $hour=$_POST["hour"];
            $content=$_POST["content"];
            $arr=array();
            $arr["course_name"]=$name;
            $arr["course_outline"]=$content;
            $arr["course_hourse"]=$hour;
            $arr["course_begin"]=$begin_time;
            $arr["course_end"]=$end_time;
            $arr["course_who_add"]=$course_detial[0]["course_who_add"];
            $arr["speaker_id"]=$speaker;
            $arr["semester_id"]=$seme;
            $arr["course_num"]=$num;
            $arr["course_score"]=$score;
            $arr["course_place"]=$place;
            $arr["course_period"]=$period;
            $arr["status_id"]=$course_detial[0]["status_id"];
            $arr["organization_id"]=$org;
            $arr["ordertime"]=date('y-m-d',time());
            $arr["isshow"]=0;
            $where="course_id='{$id}'";
            $return_affected_id=  update("course", $arr, $where);
            $this->ajaxReturn($return_affected_id);
        }
    }
    
    /*
     * 课程删除的方法
     * 参数：课程信息id
     * 提交方式：post
     * 返回：受影响的行数
     */
    public function deleteCourse(){
        if(IS_POST){
            $id=$_POST["id"];
            $sql="update t_course set isshow='1' where course_id='{$id}'";
            $return_id=D()->execute($sql);
            $this->ajaxReturn($return_id,"JSON");
        }
    }
    
    /*
     * 实验室批量删除的方法
     * 参数：所有被选中的ids
     * 提交方式：post
     * 返回：受影响行数
     */
    public function delBatchCourse(){
        if(IS_POST){
            $ids_post=$_POST['ids'];
            $ids_exp=  explode("|", $ids_post);
            $return_ids=array();
            foreach($ids_exp as $key=>$value){
                $sql="update t_course set isshow=1 where course_id='{$value}'";
                $return_ids=D()->execute($sql);
            }
            $this->ajaxReturn($return_ids,"JSON");
        }
    }
    
    /*
     * 待审核课程列表页面显示
     */
    public function showNoExamineList(){
        $org_rows=  $this->getOrg();
        $this->assign("org_name", $org_rows);
        $this->display();
    }
    
    /*
     * 审核操作方法
     * 参数：
     *  课程信息id
     *  审核后状态：statusId
     * 提交方式：post
     * 返回：受影响的行数
     */
    public function  examinePassCourse(){
        if(IS_POST){
            $id=$_POST["id"];
            $status_id=$_POST["statusId"];
            $sql="update t_course set status_id='{$status_id}' where course_id='{$id}'";
            $return_id=D()->execute($sql);
            $this->ajaxReturn($return_id,"JSON");
        }
    }
    
    /*
     * 实验室管理员：课程添加页面显示
     */
    public function showOrgAddCourse(){
        $this->display();
    }
    
    /*
     * 实验室管理员：课程保存
     */
    public function orgSaveCourse(){
        if(IS_POST){
            $name=$_POST["name"];
            $begin_time=$_POST["beginTime"];
            $end_time=$_POST["endTime"];
            $seme=$_POST["seme"];
            $speaker=$_POST["speaker"];
            $period=$_POST["period"];
            $place=$_POST["place"];
            $hour=$_POST["hour"];
            $content=$_POST["content"];
            $arr=array();
            $arr["course_name"]=$name;
            $arr["course_outline"]=$content;
            $arr["course_hourse"]=$hour;
            $arr["course_begin"]=$begin_time;
            $arr["course_end"]=$end_time;
            $arr["course_who_add"]=$_SESSION["user_id"];
            $arr["speaker_id"]=$speaker;
            $arr["semester_id"]=$seme;
            $arr["course_place"]=$place;
            $arr["course_period"]=$period;
            $arr["status_id"]=2;
            $arr["organization_id"]=$_SESSION["user_orgnization"];
            $arr["ordertime"]=date("y-m-d",time());
            $arr["isshow"]=0;
            $return_id=  insert_two("course", $arr);
            $this->ajaxReturn($return_id,"JSON");
        }
    }
    
    /*
     * 实验室管理员：审核未通过页面显示
     */
    public function showExamineNotPassList(){
        $org_rows=  $this->getOrg();
        $this->assign("org_name", $org_rows);
        $this->display();
    }
    
    /*
     * 实验室管理员：待审核课程页面显示
     */
    public function showOrgNoExamineList(){
        $org_rows=  $this->getOrg();
        $this->assign("org_name", $org_rows);
        $this->display();
    }
    
    /*
     * 实验室管理员：审核未通过修改页面显示
     */
    public function showOrgEditCourse(){
        $this->display();
    }    
   
    /*
     * 实验室管理员：修改保存方法
     * 参数：
     *  课程的基本信息
     *  被修改课程的主键id信息
     * 返回：受影响课程的id信息
     */
    public function orgCourseEditSave(){
        if(IS_POST){
            $id=$_POST["id"];
            $course_detial=  $this->getCourseDetialById($id);//根据课程主键id得到课程的详细信息                                
            
            $name=$_POST["name"];
            $begin_time=$_POST["beginTime"];
            $end_time=$_POST["endTime"];
            $seme=$_POST["seme"];
            $speaker=$_POST["speaker"];
            $period=$_POST["period"];
            $place=$_POST["place"];
            $hour=$_POST["hour"];
            $content=$_POST["content"];
            $arr=array();
            $arr["course_name"]=$name;
            $arr["course_outline"]=$content;
            $arr["course_hourse"]=$hour;
            $arr["course_begin"]=$begin_time;
            $arr["course_end"]=$end_time;
            $arr["course_who_add"]=$course_detial[0]["course_who_add"];
            $arr["speaker_id"]=$speaker;
            $arr["semester_id"]=$seme;
            $arr["course_place"]=$place;
            $arr["course_period"]=$period;
            $arr["status_id"]=2;   //将退后修改后的信息保存时保存成待审核状态
            $arr["organization_id"]=$course_detial[0]["organization_id"];
            $arr["ordertime"]=date("y-m-d",time());
            $arr["isshow"]=0;
            $where="course_id='{$id}'";
            $return_affected_id=  update("course", $arr, $where);
            $this->ajaxReturn($return_affected_id);
        }
    }
    
    /*
     * 中心管理员：审核页面显示
     */
    public function showExamineCourse(){
        $org_rows=  $this->getOrg();
        $this->assign("org_name", $org_rows);
        $this->display();
    }
    
    /*
     * 实验室管理员：课程审核方法
     * 参数：
     *  课程基本信息
     *  被修改课程id
     * 返回：受影响的行数
     */ 
    public function examineCourseSave(){
        if(IS_POST){
            $id=$_POST["id"];
            $course_detial=  $this->getCourseDetialById($id);//根据课程主键id得到课程的详细信息          
            $name=$_POST["name"];
            $num=$_POST["num"];
            $begin_time=$_POST["beginTime"];
            $end_time=$_POST["endTime"];
            $seme=$_POST["seme"];
            $org=$_POST["org"];
            $speaker=$_POST["speaker"];
            $period=$_POST["period"];
            $score=$_POST["score"];
            $place=$_POST["place"];
            $hour=$_POST["hour"];
            $content=$_POST["content"];
            $status_id=$_POST["status"];
            $arr=array();
            $arr["course_name"]=$name;
            $arr["course_outline"]=$content;
            $arr["course_hourse"]=$hour;
            $arr["course_begin"]=$begin_time;
            $arr["course_end"]=$end_time;
            $arr["course_who_add"]=$course_detial[0]["course_who_add"];
            $arr["speaker_id"]=$speaker;
            $arr["semester_id"]=$seme;
            $arr["course_num"]=$num;
            $arr["course_score"]=$score;
            $arr["course_place"]=$place;
            $arr["course_period"]=$period;
            $arr["status_id"]=$status_id;
            $arr["organization_id"]=$org;
            $arr["ordertime"]=date('y-m-d',time());
            $arr["isshow"]=0;
            $where="course_id='{$id}'";
            $return_affected_id=  update("course", $arr, $where);
            $this->ajaxReturn($return_affected_id);
        }
    }
    
    /*
     * 中心管理员：开放选课页面显示
     */
    public function showOpenSelectCourse(){
        $this->display();
    }
    
    /*
     * 根据学期信息得到此学期的总数量
     * 参数：学期id
     * 返回：学期的总数量
     */
    public function getCourseCountBySeme(){
        if(IS_POST){
            $seme_id=$_POST["semeId"];
            $sql="select count(*) from t_course where status_id='1' and isshow='0' and semester_id='{$seme_id}'";
            $row=D()->query($sql);
            $this->ajaxReturn($row,"JSON");
        }
    }
    
    /*
     * 根据课程开课学期id，选出所有此学期课程
     * 参数：学期id
     * 返回：此条课程的全部信息
     */
    public function getCourseBySemeId(){
        if(IS_POST){
            $seme_id=$_POST["semeId"];
            $page_num=$_POST["page"];
            $page_size=$_POST["rows"];
            $start_record=$page_size*($page_num-1);
            $sql="select * from t_course where isshow='0' and status_id='1' and semester_id='{$seme_id}' limit $start_record,$page_size";
            $course_rows=  fecthAll($sql);
            
            foreach ($course_rows as $key => $value) {
                //实验室名字获取
                $where1="organization_id={$value['organization_id']}";
                $table1="organization";
                $org_row=  $this->getForeignKeyData($where1, $table1);
                $course_rows[$key]['org_name']=$org_row[0]['organization_name'];
                //主讲人名字获取
                $where2="user_id={$value['speaker_id']}";
                $table2="user";
                $org_row=  $this->getForeignKeyData($where2, $table2);
                $course_rows[$key]['speaker_name']=$org_row[0]['user_name'];
                //课程添加人名字获取
                $where3="user_id={$value['course_who_add']}";
                $table3="user";
                $org_row=  $this->getForeignKeyData($where3, $table3);
                $course_rows[$key]['who_add_name']=$org_row[0]['user_name'];
            }
        
            $this->ajaxReturn($course_rows,"JSON");
        }
    }
    
    /*
     * 根据获得ids信息将这些课程加入到可选课程中
     * 参数：
     *  课程的ids
     * 返回：受影响的行数
     */
    public function joinCourseSelectedOptional(){
        if(IS_POST){
            $ids_post=$_POST['ids'];
            $ids_exp=  explode("|", $ids_post);
            $return_ids=array();
            foreach($ids_exp as $key=>$value){
                if($value==""){
                    continue;
                }
                $sql="update t_course set status_id='4' where course_id='{$value}'";
                $return_ids=D()->execute($sql);
                $sql2="select * from t_course where course_id='{$value}'";
                $course_row= fecthOne($sql2);
                $selectd_optional=array();
                $selectd_optional["course_id"]=$value;
                $selectd_optional["status_id"]='4';
                $selectd_optional["semester_id"]=$course_row[0]["semester_id"];
                $selectd_optional["course_place"]=$course_row[0]["course_place"];
                $selectd_optional["score"]=$course_row[0]["course_score"];
                $selectd_optional["is_gave"]='1';  //1表示当前没有给学分
                $affect_id=insert_two("course_optional", $selectd_optional);
            }
            $this->ajaxReturn($return_ids,"JSON");
        }
    }
    
    /*
     * 开放选课列表的页面显示
     */
    public function showOpenSelectCourseList(){
        $this->display();
    }
    
    /*
     * 得到当前正在开放选课中的课程，且分页显示
     * 参数：
     *  每页显示的条数
     *  当前页码数 
     */
    public function getCurrentCourseSelected(){
        if(IS_POST){
            $page_num=$_POST["page"];
            $page_size=$_POST["rows"];
            $start_record=$page_size*($page_num-1);
            $sql="select t_course_optional.*,t_course.* from t_course_optional,t_course where t_course_optional.status_id=4 and t_course_optional.course_id=t_course.course_id";
            $course_rows=  fecthAll($sql);
            
            foreach ($course_rows as $key => $value) {
                //实验室名字获取
                $where1="organization_id={$value['organization_id']}";
                $table1="organization";
                $org_row=  $this->getForeignKeyData($where1, $table1);
                $course_rows[$key]['org_name']=$org_row[0]['organization_name'];
                //主讲人名字获取
                $where2="user_id={$value['speaker_id']}";
                $table2="user";
                $org_row=  $this->getForeignKeyData($where2, $table2);
                $course_rows[$key]['speaker_name']=$org_row[0]['user_name'];
                //课程添加人名字获取
                $where3="user_id={$value['course_who_add']}";
                $table3="user";
                $org_row=  $this->getForeignKeyData($where3, $table3);
                $course_rows[$key]['who_add_name']=$org_row[0]['user_name'];
            }
        
            $this->ajaxReturn($course_rows,"JSON");
        }
    }
    
    /*
     * 得到当前正在开放选课中的课程的数量
     */
    public function getCurrentCourseSelectedCount(){
        if(IS_POST){
            $sql="select count(*) from t_course_optional where status_id=4";
            $rows_count=D()->query($sql);
            $this->ajaxReturn($rows_count,"JSON");
        }
    }
    
    /*
     * 显示课程详细信息的页面
     */
    public function showCourseDetial(){
        $org_rows=  $this->getOrg();
        $this->assign("org_name", $org_rows);
        $this->display();
    }
    
    /*
     * 得到课程的详细信息，包括课程的选择人数
     * 此方法有问题！
     */
    public function getCourseDetial(){
        if(IS_POST){
            $id=$_POST["id"];
            var_dump($id);
            $course_return=array();
            $course_row=  $this->getCourseDetialById($id);
            $course_optional_row=  $this->getCourseOptionalDetialById($id);
            $course_select_count=  $this->getCourseOptionalSelectCount($course_optional_row[0]["course_optional_id"]);
            $course_return=  array_merge($course_row.$course_optional_row.$course_select_count);
            var_dump($course_optional_row);
            $this->ajaxReturn($course_return,"JSON");
        }
    }
}
