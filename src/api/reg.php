<?php
	
	//后端：接收数据，插入到数据库，返回一个状态给前端
	$tel= isset($_POST['tel']) ? $_POST['tel'] : '13414156350';
	$psw = isset($_POST['psw']) ? $_POST['psw'] : '';
	
	//连接数据库
	include 'conn.php';
	//1.写sql语句
	if($tel&&$psw){
		$sql = "INSERT INTO user(tel,psw) VALUES('$tel','$psw')";
		$res = $conn->query($sql);//insert delete update语句返回的是布尔值
//		var_dump($res);
		if($res) {
			//插入成功
			echo 'yes';
		}else{
			echo 'no';
		}
	}else if($tel&&$psw == ''){
		$sql = "SELECT *FROM `user` WHERE tel = $tel;";
		$res = $conn->query($sql);//结果集
		//直接判断返回状态
		if($res->num_rows) {
			//找出，存在，不给注册
			echo 'no';
		}else{
			//找不到，可以注册
			echo 'yes';
		}
	}
	
	
	
	//2.执行语句
	
	
?>