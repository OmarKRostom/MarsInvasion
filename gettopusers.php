<?php

	$user = "root";
	$password = "";
	$database = "game";
	$table = "user";
	$host = "localhost";
	$conn = mysqli_connect($host, $user, $password, $database);
	if(mysqli_connect_errno()) {
		echo "FAILED TO CONNECT " . mysqli_connect_error();
	}
	else{
		//echo "done";
	}
	$query="SELECT * FROM user ORDER BY score DESC LIMIT 10;";
	$result= mysqli_query($conn,$query);
	$jsonData = array();
	while ($array = mysqli_fetch_assoc($result)) {
	    $jsonData[] = $array;
	}
	echo json_encode($jsonData,true);

?>