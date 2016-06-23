<?php
	
	//丟tag(陣列) 撈出這些tag他們所屬的cluster的交集 再用這個交集去select新聞
	//回傳json 除了news 可能順便要丟新的tag

	include("../db_connect.php");
	
	//取得post資料
	$tag_arr = $_POST['tag_arr'];

	// $tag_arr = array("蔡英文","林書豪");


	//撈出傳過來tag他們所屬的cluster 存成array 準備取交集
	$all_arr = [];
	foreach ($tag_arr as $count => $tag) {
		$sql="SELECT `clusterId` FROM `cluster_tag` WHERE tag = '".$tag."'"; 
		$result = $conn->query($sql) or die($conn->error);
		// echo $requslt;
		$arr = [];
		$i = 0;
		while($row = $result -> fetch_assoc()){
			// echo $row["tag"];
			$arr[$i] = $row["clusterId"];
			$i++;
		}	
		// echo $count;
		$all_arr[$count] = $arr;
	}

	//取array之間的交集(就是cluster的交集)
	//大於一個tag再做
	// echo $all_arr[0];
	$intersect_cluster = [];
	if(count($all_arr)>1){
		$intersect_cluster = call_user_func_array('array_intersect', $all_arr);	
	}
	else{ 
		$intersect_cluster = $all_arr[0];
	}
	//印出交集的cluster是哪些
	// echo "交集的cluster為:<br>";
	// foreach ($intersect_cluster as $key) {
	// 	echo $key;
	// 	echo "<br>";
	// }


	//用這些cluster去select他對應的news
	$sql="SELECT * FROM `news` WHERE ";
	$arr_len = count($intersect_cluster);
	$count = 0;
	foreach ($intersect_cluster as $key) {

		if($arr_len-1 != $count){ //如果是最後一輪 不用加OR
			$sql .= "cluster_id = '" . $key . "' OR ";
		}
		else{
			$sql .= "cluster_id = '" . $key . "'";
		}
		$count++;
	}
	// echo $sql;
	$result = $conn->query($sql) or die($conn->error);

	//將新聞存成json格式回傳
	$json_arr = [];
	$count = 0;
	while($row = $result -> fetch_assoc()){ //印出新聞

		// $date = new DateTime($row["time"]);

		$json_arr[$count] = array(
			"title" => $row["title"],
			"content" => $row["content"],
			"cluster_id" => $row["cluster_id"],
			"time" => $row["time"],
		);
		
		$count++;

		//印出所有撈到的文章
		// echo "標題：".$row["title"]."<br>".
		// 	 "內文：".$row["content"]."<br>".
		// 	 "分群id：".$row["cluster_id"]."<br>".
		// 	 "時間：".$row["time"]."<br>".
		// 	 "<br>";
	}
	echo json_encode($json_arr, JSON_UNESCAPED_UNICODE);


?>