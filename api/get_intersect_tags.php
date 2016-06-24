<?php
  include("../db_connect.php");
  //原始tag
  $origin_tag = $_POST["origin_tag"];
  //第一次 取得get上的主tag 抓出有這個tag的cluster的所有tag印在畫面上
  $tag_arr = $_POST["tag_arr"];
  // $tag_arr = ["中信兄弟", "桃猿"];

  //撈出傳過來tag他們所屬的cluster 存成array 準備取交集
  $all_arr = [];
  foreach ($tag_arr as $count => $tag) {
    $sql="SELECT `cluster_id` FROM `cluster_tag` WHERE tag = '".$tag."'"; 
    $result = $conn->query($sql) or die($conn->error);
    // echo $requslt;
    $arr = [];
    $i = 0;
    while($row = $result -> fetch_assoc()){
      // echo $row["tag"];
      $arr[$i] = $row["cluster_id"];
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




  //用陣列去反搜尋有什麼其他tag關鍵字
  //同樣的要合併
  $sql="SELECT * FROM `cluster_tag` WHERE ";
  $arr_len = count($intersect_cluster);
  $count = 0;
  foreach($intersect_cluster as $c){
    if($arr_len-1 != $count){ 
      $sql .= "cluster_id = '" . $c . "' OR ";
    }
    else{ //如果是最後一輪 不用加OR
      $sql .= "cluster_id = '" . $c . "'";
    }
    $count++;
  }

  // echo $sql;

  $result = $conn->query($sql) or die($conn->error);
  //排除所選的tag 印出其他的tag 要把重複的去掉
  $final_tag_arr = [];
  $count = 0;
  while($row = $result -> fetch_assoc()){
    $t = $row["tag"];
    if(!in_array($t, $final_tag_arr) && $t!=$origin_tag){
      $final_tag_arr[$count] = $t;
      $count++;
    }
  }

  echo json_encode($final_tag_arr, JSON_UNESCAPED_UNICODE);


  // //印出最後的tag
  // foreach ($final_tag_arr as $t) {
  //   // <div class='checkbox'>
  //   echo "<label><input type='checkbox' class='chk' value='".$t."'>".$t."</label>";
  //   // echo $t." ";
  // }
?>