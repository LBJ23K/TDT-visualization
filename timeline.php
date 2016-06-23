<?php
    include("db_connect.php");
    //第一次 取得get上的主tag 抓出有這個tag的cluster的所有tag印在畫面上
    $tag = $_GET["tag"];
    $sql="SELECT `cluster_id` FROM `cluster_tag` WHERE tag = '".$tag."'"; 
    $result = $conn->query($sql) or die($conn->error);

    //先抓出主tag所在的所有cluster存進陣列
    $cluster_arr = [];
    $i = 0;
    while($row = $result -> fetch_assoc()){
      // echo $row["tag"];
      $cluster_arr[$i] = $row["cluster_id"];
      $i++;
    }

    //用陣列去反搜尋有什麼其他tag關鍵字
    //同樣的要合併
    $sql="SELECT * FROM `cluster_tag` WHERE ";
    $arr_len = count($cluster_arr);
    $count = 0;
    foreach($cluster_arr as $c){
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
      if(!in_array($t, $final_tag_arr) && $t!=$_GET["tag"]){
        $final_tag_arr[$count] = $t;
        $count++;
      }
    }

    //印出最後的tag
    foreach ($final_tag_arr as $t) {
      // <div class='checkbox'>
      echo "<label><input type='checkbox' value=''>".$t."</label>";
      // echo $t." ";
    }


?>

<!DOCTYPE html>
<html>
<head prefix="og: http://ogp.me/ns#">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Timeline</title>
  <link href="css/bootstrap.min.css" rel="stylesheet">
  <link href="http://fonts.googleapis.com/earlyaccess/notosanstc.css" rel="stylesheet">
  <link href="css/timeline.css" rel="stylesheet">

</head>

<body>
  <!-- Navigation -->
  <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
              <a class="navbar-brand" href="index.html">TDT-NEWS-VISUALIZATION</a>
          </div>
      </div>
      <!-- /.container -->
  </nav>

  <!-- Page Content -->
  <div class="container">
      <div class="row">
          <div class="col-lg-12 text-center">
              <h1 id="title" style="font-family: 'Noto Sans TC', sans-serif;"></h1>
              <p class="lead">新聞事件時間軸</p>
              <!-- <ul class="list-unstyled">
                  <li>About</li>
                  <li>Contact</li>
              </ul> -->
          </div>
      </div>
      <!-- /.row -->
      <hr> <!-- bootstrap的分隔線 -->

  </div>
  <!-- /.container -->


  <!-- 縱向時間軸 向右 -->
  <div class="timeline" id="tl"></div>



  <!-- jQuery Version 1.11.1 -->
  <script src="js/jquery.js"></script>
  <!-- Bootstrap Core JavaScript -->
  <script src="js/bootstrap.min.js"></script>
  <!-- For timeline usage -->
  <script src="js/timeline/d3.min.js"></script>
  <script src="js/timeline/d3kit.min.js"></script>
  <script src="js/timeline/labella.min.js"></script>
  <script src="js/timeline/d3kit-timeline.min.js"></script>
  <!-- /. For timeline usage -->
  <script src="js/timeline/timeline.js"></script>





  <!-- 橫向時間軸 向下 -->
  <!-- <br><div class="timeline" id="timeline4"></div> -->

  <script>
  // var chart4 = new d3KitTimeline('#timeline4', {
  //   direction: 'down',
  //   initialWidth: 804,
  //   margin: {left: 20, right: 20, top: 30, bottom: 20},
  //   textFn: function(d){return d.name;},
  //   layerGap: 40,
  //   dotColor: color,
  //   labelBgColor: color,
  //   linkColor: color,
  //   labella: {
  //     maxPos: 800,
  //     algorithm: 'simple'
  //   }
  // });
  // chart4.data(data).resizeToFit();
  // chart4.on("labelClick", function(obj,count){
  //   console.log(obj); //印出object內容在console上
  //   alert(obj["name"]);
  // });
  </script>

</body>






