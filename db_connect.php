<?php
	header("Content-Type:text/html; charset=utf-8");

	//connect to db
	$dbhost = '140.112.107.113';
    $dbuser = 'root';
    $dbpass = '';
    $dbname = 'tdt_news';
    $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
	
	// Change character set to utf8
	mysqli_set_charset($conn,"utf8");
    
    // Check connection
	if (!$conn) {
	    die("Connection failed: " . mysqli_connect_error());
	}
?>