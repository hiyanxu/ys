<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace Admin\Controller;
use Think\Controller;

class LoginController extends Controller{
    
    //登录验证方法
    function login(){
        if(!empty($_POST)){
            //验证验证码
            $boolVerify=$this->checkVerify($_POST['passcode']);
            if(!$boolVerify){
                echo "验证码错误！";
            }
            else{
                //根据用户账号和密码找到用户账号的一条信息
                $userAccount_row=  $this->checkUserAccount($_POST['admin'], $_POST['password']);
                if($userAccount_row==null){
                    echo "<script type='text/javascript'>alert('用户名或密码错误！')</script>";
                }
                else{
                    //根据用户账号的一条信息得到用户信息和角色信息
                    $user_row=$this->getUserByAccount($userAccount_row[0]['user_id']);                    
                    $role_row=$this->getRoleByAccount($userAccount_row[0]['user_role_id']);                    
                    //保存session信息
                    session("userName",$user_row[0]['user_name']);
                    session("userAccountPwd",$userAccount_row[0]['user_account_pwd']);
                    session("userAccount_id",$userAccount_row[0]['user_account_id']);
                    session("user_id",$userAccount_row[0]['user_id']);
                    session("user_orgnization",$userAccount_row[0]['organization_id']);
                    
                    setcookie("user_org",$userAccount_row[0]["organization_id"],time()+4*3600,"/");
                    
                    $userName=$_SESSION['userName'];
                    $this->redirect("Index/index");
                }
            }
        }   
        
        
        $this->display();
    }
    
    //验证码验证的方法
    function checkVerify($verifyCode){
        $verify=new \Think\Verify();
        return $verify->check($verifyCode);
    }
    
    //验证用户账号的方法
    function checkUserAccount($account,$pwd){
        $userAccount=D("user_account");
        $sql="select * from t_user_account where user_account='$account' and user_account_pwd='$pwd'";
        $userAccount_row=$userAccount->query($sql);
        return $userAccount_row;
    }
    
    //根据用户账号信息得到用户信息
    function getUserByAccount($user_id){
        $user=D("user");
        $sql="select * from t_user where user_id='$user_id'";
        $user_row=$user->query($sql);
        return $user_row;
    }
    
    //根据用户账号信息得到角色信息
    function getRoleByAccount($role_id){
        $role=D("role");
        $sql="select * from t_role where role_id='$role_id'";
        $role_row=$role->query($sql);
        return $role_row;
    }
    
    //加载验证码的方法
    function makeVerify(){
        $config=array(
            'imageH'=>32,
            'imageW'=>80,
            'fontSize'  => 11,
            'fontttf'   => '4.ttf',              // 验证码字体，不设置随机获取
            'length'    => 4,    
            'useNoise'=>false,
        );
        $verify=new \Think\Verify($config);
        $verify->entry();
    }     
}
