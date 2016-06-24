<?php
	
	//回傳random的一些tag跟他對應的篇數給bubble chart顯示
	//格式
	// [
	//   {
	//     "tag": "China",
	//     "value": 731149966.56273,
	//   },
	//   {
	//     "tag": "India",
	//     "value": 492897584.25067,
	//   }
	// ]

	include("../db_connect.php");
	
	$sql="SELECT * FROM `tag_news_count`"; 
	$result = $conn->query($sql) or die($conn->error);

	$arr = [];
	$i = 0;
	while($row = $result -> fetch_assoc()){
		$arr[$i] = array(
			"tag" => $row["tag"],
			"value" => $row["count"],
		);
		$i++;
	}	

	//隨機取一定數量的tag
	//要做randommmmm
	shuffle($arr); //讓array亂掉

    $json_arr = array(); //存到新的json陣列 
    $limit = 3; //總共只存limit的筆數
    for ($i = 0; $i <$limit; $i++) 
    {
        $json_arr[$i] = $arr[$i];
    }

	echo json_encode($json_arr, JSON_UNESCAPED_UNICODE);

?>