<?php
	
	//接收数据，做查询，查到了就可以登陆，查不到就是账号或密码不对
	
	$tel = isset($_POST['tel']) ? $_POST['tel'] : '';
	$psw = isset($_POST['psw']) ? $_POST['psw'] : '';
	
	include 'conn.php';
	
	//1.sql语句
	$sql = "SELECT * FROM user WHERE tel='$tel' AND psw='$psw'";
	
	//2.执行语句
	$res = $conn->query($sql);//结果集
	
	//3.找到就返回状态
	if($res->num_rows) {
		//找到，允许登陆
		echo 'yes';
	}else{
		//找不到，不允许登陆
		echo 'no';
	}
	
	//下面可以关闭数据库
	$res->close();
	$conn->close();
	
?>