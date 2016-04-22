
<?php 
	session_start();
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
		echo "done";
	}
	$_SESSION['username'] = $_POST['username'];

	$query="SELECT name FROM user WHERE name='{$_POST['username']}'";
	$checkuser= mysqli_query($conn,$query);

	if(mysqli_num_rows($checkuser)>=1)
	{
		
		echo "this user name is already used";
	}	
	else {
		mysqli_query($conn,"INSERT INTO `user`( `name`,`score`) VALUES ('" . $_POST['username'] . "','".$_POST['score']."')");
	}
	$_SESSION['username'] = $_POST['username'];

	
	
 ?>

