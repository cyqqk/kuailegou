<?php
	include 'conn.php';
//	初始化为第一页 ，一页有十条数据
	$page = isset($_POST['page'])? $_POST['page'] : '1';
	$num = isset($_POST['num']) ? $_POST['num'] : '8';
	$type = isset($_POST['type']) ? $_POST['type'] : '';
	$istrue = isset($_POST['istrue']) ? $_POST['istrue'] : '';
	$keywork = isset($_POST['keywork']) ? $_POST['keywork'] : '';
	$min = isset($_POST['min']) ? $_POST['min'] : '0';
	$max = isset($_POST['max']) ? $_POST['max'] : '';
//	从第几条数据开始拿,拿几条数据
	$index = ($page - 1) * $num;


	if($keywork && $istrue!= '' && $max){
		if($istrue == 'true'){	
			$sql = "SELECT * FROM list WHERE price BETWEEN $min AND $max AND  title LIKE '%$keywork%' ORDER BY  $type ASC LIMIT $index,$num";
		}else{
			$sql = "SELECT * FROM list WHERE price BETWEEN $min AND $max AND  title LIKE '%$keywork%' ORDER BY  $type DESC LIMIT $index,$num";
		}
		$sql2 = "SELECT * FROM list WHERE price BETWEEN $min AND $max AND  title LIKE '%$keywork%' ORDER BY  $type";
//		12
	}else if($keywork && $istrue!= '' && $max == ''){
		if($istrue == 'true'){	
			$sql = "SELECT * FROM list WHERE title LIKE '%$keywork%' ORDER BY  $type ASC LIMIT $index,$num";
		}else{
			$sql = "SELECT * FROM list WHERE title LIKE '%$keywork%' ORDER BY  $type DESC LIMIT $index,$num";
		}
		$sql2 = "SELECT * FROM list WHERE title LIKE '%$keywork%' ORDER BY  $type";
//		13
	}else if($keywork && $istrue== '' && $max){
		$sql = "SELECT * FROM  list WHERE title LIKE '%$keywork%' AND  $type BETWEEN $min AND $max  LIMIT $index,$num";
		$sql2 = "SELECT * FROM list WHERE $type BETWEEN $min AND $max AND  title LIKE '%$keywork%'";
//		23
	}else if($keywork == '' && $istrue!= '' && $max){
		if($istrue == 'true'){	
			$sql = "SELECT * FROM list WHERE $type BETWEEN $min AND $max  ORDER BY  $type ASC LIMIT $index,$num";
		}else{
			$sql = "SELECT * FROM list WHERE $type BETWEEN $min AND $max  ORDER BY  $type DESC LIMIT $index,$num";
		}
		$sql2 = "SELECT * FROM list WHERE $type BETWEEN $min AND $max ";
//		3
	}else if ($keywork =='' && $istrue== '' && $max){
		$sql = "SELECT * FROM list WHERE $type BETWEEN $min AND $max  ORDER BY  $type ASC LIMIT $index,$num";
		$sql2 = "SELECT * FROM list WHERE $type BETWEEN $min AND $max ORDER BY  $type";
//		2
	}else if($keywork=='' && $istrue!= '' && $max == ''){
		if($istrue == 'true'){
				$sql = "SELECT * FROM list ORDER BY $type ASC LIMIT $index,$num";				
			}else{
				$sql = "SELECT * FROM list ORDER BY $type DESC LIMIT $index,$num";
			}
		$sql2 = "SELECT * FROM list ";
	}else if($keywork && $istrue == '' && $max == ''){
		$sql = "SELECT * FROM list WHERE title LIKE '%$keywork%' LIMIT $index,$num";
		$sql2 = "SELECT * FROM list WHERE title LIKE '%$keywork%'";
	}else if($keywork == '' && $istrue== '' && $max == ''){
		$sql = "SELECT * FROM list LIMIT $index ,$num";
		$sql2 = 'SELECT * FROM list';
	}
	
//	echo $sql;
//	echo $sql2;
//	执行语句
	$res = $conn->query($sql);
	
//	获取结果集里面的内容
	$content = $res->fetch_all(MYSQLI_ASSOC);
//	获取总条数
	
	
	//执行语句
	$res2 = $conn->query($sql2);

//	var_dump($res2);

	//关联数组：存多一点数据再给前端
	$data = array(
		'total' => $res2->num_rows,
		'goodslist' => $content,
		'page' => $page,
		'num' => $num
	);
	
	echo json_encode($data,JSON_UNESCAPED_UNICODE);
	
?>