<?php
?>

<!DOCTYPE html>
<html>
<head prefix="og: http://ogp.me/ns#">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error</title>
  

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
              <a class="navbar-brand" href="index.html">NEWS-VISUALIZATION</a>
          </div>
      </div>
      <!-- /.container -->
  </nav>

  <!-- Page Content -->
  <div class="container">
      <div class="row">
          <div class="col-lg-12 text-center">
              <h1 id="title" style="font-family: 'Noto Sans TC', sans-serif;font-size:36px;margin-bottom:20px;"></h1>
              <p class="lead">無效的tag:(</p>
          </div>
      </div>
      <!-- /.row -->
      <hr> <!-- bootstrap的分隔線 -->
      <div class="row">
          <div class="col-lg-12 text-center">
            <button type="button" class="btn btn-danger btn-block btn-lg" onclick="javascript:location.href='index.html'">回到首頁</button>
          </div>
      </div>
  </div>
  <!-- /.container -->


  <!-- 縱向時間軸 向右 -->
  <section id="cd-timeline" class="cd-container">
    <div id="tl"></div>
  </section>


  <!-- jQuery Version 1.11.1 -->
  <script src="js/jquery.js"></script>
</body>






