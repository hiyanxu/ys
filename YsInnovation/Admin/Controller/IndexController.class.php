<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace Admin\Controller;
use Think\Controller;

class IndexController extends Controller{
    public function head(){
        $userName=$_SESSION['userName'];
        $this->assign('userName',$userName);
        $this->display();
    }
    
    //加载右边具体页面
    public function right(){
        $this->display();
    }
    
    //加载左边操作权限页
    public function left(){
        //根据用户登录后session信息得到用户角色id信息
        $userAccount_row=  $this->getAccountBySess();
        $userAccount_role_id=$userAccount_row[0]['user_role_id'];
        
        //根据用户角色id信息得到角色对应权限信息
        $roleMenu_rows=$this->getRoleMenuByRoleId($userAccount_role_id);
        foreach ($roleMenu_rows as $value) {
            $menuitem_ids[]=$value['menuitem_id'];
        }
        $menuitem_ids_str=  implode(',', $menuitem_ids);

        //根据用户角色对应的角色权限ids的信息得到对应权限记录
        $menuItem_pRows=$this->getMenuByIds($menuitem_ids_str,1);
        $menuItem_sRows=$this->getMenuByIds($menuitem_ids_str,2);
        
        //将得到的角色权限信息传到html页面中
        $this->assign("menuItem_pRows",$menuItem_pRows);
        //var_dump($menuItem_sRows);
        $this->assign("menuItem_sRows",$menuItem_sRows);
        //var_dump($menuItem_sRows);
        
        $this->display();
    }
    
    //加载index.html页面
    public function index(){
        $this->checkLogined();
        $this->display();
    }
    
    function checkLogined(){
        if($_SESSION['userAccount_id']==null){
            alertMes("请先登录", "Login/login");
        }
    }
    //根据用户session信息得到用户账号信息
    public function getAccountBySess(){
        $userAccount=D("user_account");
        $sql="select * from t_user_account where user_account_id='".$_SESSION['userAccount_id']."'";
        $userAccount_row=$userAccount->query($sql);
        return $userAccount_row;
    }
    
    //根据角色id信息得到角色对应的权限信息
    function getRoleMenuByRoleId($id){
        $roleMenu=D("role_menu");
        $sql="select * from t_role_menu where role_id='".$id."'";
        $userMenu_rows=$roleMenu->query($sql);
        return $userMenu_rows;
    }
    
    //根据权限ids信息得到权限对应记录
    function getMenuByIds($ids,$level){
        $menuItem=D('frmmenuitem');
        $sql="select * from t_frmmenuitem where menuitem_id in ($ids) and menuitem_level='$level'";
        $menuItem_rows=$menuItem->query($sql);   
        return $menuItem_rows;
    }
    /*
     * 得到权限的js调用的方法
     */
    public function getTreeViewJs(){
        if(IS_POST){
            $type=$_POST["treeType"];
            $sql="select * from t_frmmenuitem where menuitem_level='{$type}'";
            $rows=D()->query($sql);
            $this->ajaxReturn($rows,"JSON");
        }
    }
}
