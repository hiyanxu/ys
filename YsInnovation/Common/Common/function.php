<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function alertMes($mes,$url){
    echo "<script>alert('{$mes}')</script>";
    //echo "<script>window.location.href='{$url}'</script>";
    echo "<script type='text/javascript'>window.location.href="."'".U("$url")."';</script>";
}


//数据库的插入操作
function insert($table,$array){
    $keys=join(",", array_keys($array));
    $value="'".join("','",  array_values($array))."'";
    $sql="insert into {$table}($keys) values({$value})";
    var_dump($sql);
    $id=D()->query($sql);
    return $id;   
    
}

/*
 * 数据库插入操作
 */
function insert_two($table,$array){
    $table_name=D("$table");
    $id=$table_name->add($array);
    return $id;
}

//数据库的更新操作 update imooc_admin set username="haha" where id=1;
function update($table,$array,$where){
//    $str="";
//    $sep=null;
//    foreach($array as $key=>$val)
//    {
//        if($str==null)
//        {
//            $sep="";
//        }
//        else
//        {
//            $sep=",";
//        }
//        $str.=$sep.$key."='".$val."'";
//    }
//    $sql="update {$table} set {$str} ".($where==null?null:" where ".$where);
//    mysql_query($sql);    
//    return mysql_affected_rows();
    $table=D($table);
    $return_affected_id=$table->where("$where")->save($array);
    return $return_affected_id;
}

//数据库删除操作
function delete($table,$where=null){
    $where=$where==null?null:" where ".$where;
    $sql="delete from {$table} {$where}";
    mysql_query($sql);
    return mysql_affected_rows();
}

//数据库查询操作，得到一条记录
function fecthOne($sql,$result_type=MYSQL_ASSOC){  //MYSQL_ASSOC表示从数据库中取得一行作为关联数组
//    $result=  mysql_query($sql);
//    $row=  mysql_fetch_array($result,$result_type);
    $row=D()->query($sql);
    return $row;
}

//数据库查询操作，得到结果集中的所有记录
function fecthAll($sql,$result_type=MYSQL_ASSOC){
//    $result=mysql_query("select * from t_semester");
//    var_dump($result);
//    while(@$row=mysql_fetch_array($result,$result_type)){
//            $rows[]=$row;
//    }
    $rows=D()->query($sql);
    
    return $rows;
}

//得到结果集中记录的条数
function getResultNum($sql){
    $result=  D()->query($sql);
    return mysql_num_rows($result);
}

//得到上一条插入记录的insert的Id
function getInsertId(){
    return mysql_insert_id();
}

 /*
     * 根据课程表外键得到相应外键数据
     * 参数：条件：$where
     *      对应表名：$table_name 
     */
function getForeignKeyData($where,$table_name){
    $table=D("{$table_name}");
    $rows=$table->where($where)->select();
    return $rows;
}
