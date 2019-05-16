<?php
	include 'conn.php';
	$user = isset($_POST['user'])? $_POST['user'] : '';
	$type = isset($_POST['type'])? $_POST['type'] : '';
	$id = isset($_POST['id'])? $_POST['id'] : '';
	$num = isset($_POST['num'])? $_POST['num'] : '';
	if($type){
		if($type == 'remove'){
			$sql = "DELETE FROM carts WHERE `user` = $user AND id = $id";
			$res = $conn->query($sql);
		}else if($type == 'update'){
			$sql = "UPDATE carts SET number=$num WHERE `user`=$user AND id=$id";
			$res = $conn->query($sql);
		}else if($type == 'add'){
			$sql = "SELECT * FROM carts WHERE id = $id AND `user` = $user";
			$res = $conn->query($sql);
			if($res->num_rows == 1){
				$sql2 = "UPDATE carts SET number=$num WHERE `user`=$user AND id=$id";
				$res2 = $conn->query($sql2);
			}else{
				$sql2 = "INSERT INTO carts (`user`,id,number) VALUES($user,$id,$num)";
				$res2 = $conn->query($sql2);
			}
		}
	}else{
		$sql = "SELECT carts.id,list.price,list.title,list.img,carts.number,carts.`user` FROM carts ,list WHERE carts.id = list.id AND carts.user = $user";	
		$res = $conn->query($sql);
		$content = $res->fetch_all(MYSQLI_ASSOC);
		echo json_encode($content,JSON_UNESCAPED_UNICODE);
	}
?>