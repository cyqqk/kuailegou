<?php
	include 'conn.php';
	$id = isset($_POST['id'])? $_POST['id'] : '1';
	$message = isset($_POST['message'])? $_POST['message'] : '';
	$time = isset($_POST['time'])? $_POST['time'] : '';
	$user = isset($_POST['user'])? $_POST['user'] : '';
	$mode = isset($_POST['mode'])? $_POST['mode'] : '';

	if($mode){
		if($mode == 'get'){
			$sql = "SELECT * FROM message WHERE listid = '$id'";
			$res = $conn->query($sql);
			$content = $res->fetch_all(MYSQLI_ASSOC);
			echo json_encode($content,JSON_UNESCAPED_UNICODE);
		}else if($mode == 'submit'){
			$sql = "INSERT INTO message(listid, content, dataline,user) VALUES($id, '$message', '$time' ,'$user')";
			$res = $conn->query($sql);
			echo $res;
		}
	}else{
		$sql = "SELECT * FROM list WHERE id = '$id'";
		$res = $conn->query($sql);
		$content = $res->fetch_all(MYSQLI_ASSOC);
		echo json_encode($content[0],JSON_UNESCAPED_UNICODE);
	}
?>