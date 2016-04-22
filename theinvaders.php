<!DOCTYPE HTML>	
<html>

<head>
	<title>The Invaders</title>
	<meta charset=utf-8>
	<meta name=description content="">
	<meta name=viewport content="width=device-width, initial-scale=1">
	<script src="dist/vue.js"></script>
	<script src="dist/vue-resource.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
	<script src="dist/sweetalert.min.js"></script> 
	<script src="dist/bootstrap.js"></script> 
	<link rel="stylesheet" type="text/css" href="dist/sweetalert.css">
	<link rel="stylesheet" type="text/css" href="dist/bootstrap.css">
	<script src="phaser.min.js" type="text/javascript"></script>
	<script src="The Invaders.js" type="text/javascript"></script>
	<style>
		body {
			background: url('assets/old_moon.png');
		}
	</style>
   	<!--<script type="text/javascript" src="menu.js"></script>-->
</head>
<body>
	<div>
		<center style="margin-top:8%;" >
			<div id="gameContainer" style="height: 512px;
    width: 512px;
    box-shadow: 0px 5px 32px 0px #3a3a3a;">
				
			</div>
		</center>
	</div>
	<!-- <dialog id="myDialog">
		<form action="score.php" id="form" method="post">
			<p>Your Score is : <span class="score"></span>
		</p>
		  Name:<br>
		 	<input type="text" name="username" id="username" ><br>
			<button type="submit">submit</button>
		</form>
	</dialog> -->
	
	<div id="topten" class="modal fade" role="dialog">
	  <div class="modal-dialog">

	    <!-- Modal content-->
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal">&times;</button>
	        <h4 class="modal-title">Top 10 Users</h4>
	      </div>
	      <div class="modal-body">
	        <table class="table table-bordered">
	        	<thead>
	        		<tr>
	        			<th>#</th>
	        			<th>Name</th>
	        			<th>Score</th>
	        		</tr>
	        	</thead>
	        	<tr v-for="item in topusers">
	        		<th>{{$index+1}}</th>
	        		<th>{{item.name}}</th>
	        		<th>{{item.score}}</th>
	        	</tr>
	        </table>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal" id="closeModel">Close</button>
	      </div>
	    </div>

	  </div>
	</div>


</body>

</html>