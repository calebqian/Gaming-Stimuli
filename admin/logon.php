<html>
<head>
<Title>Management Portal Logon</Title>
<style type="text/css">
    body { background-color: #fff; border-top: solid 10px #000;
        color: #333; font-size: .85em; margin: 20; padding: 20;
        font-family: "Segoe UI", Verdana, Helvetica, Sans-Serif;
    }
	
		input { background-color: #fff; border-top: solid 10px #000;
        color: #333; font-size: .85em; margin: 20; padding: 0;
        font-family: "Segoe UI", Verdana, Helvetica, Sans-Serif;
    }
    h1, h2, h3,{ color: #000; margin-bottom: 0; padding-bottom: 0; }
    h1 { font-size: 2em; }
    h2 { font-size: 1.75em; }
    h3 { font-size: 1.2em; }
    table { margin-top: 0.75em; }
    th { font-size: 1.2em; text-align: left; border: none; padding-left: 0; }
    td { padding: 0.25em 2em 0.25em 0em; border: 0 none; }
</style>
</head>
<body>
<h1>Management Portal Logon</h1>
<p>Fill in your username and password, then click <strong>Log on</strong> to log on.</p>
<form method="post" action="logon.php" enctype="multipart/form-data" >
      Username  <input type="text" name="name" id="name"/></br>
      Password <input type="password" name="password" id="password"/></br>
      <input type="submit" name="submit" value="Log on" />
</form>
<?php
    // DB connection info
    //TODO: Update the values for $host, $user, $pwd, and $db
    //using the values you retrieved earlier from the portal.
    $host = "us-cdbr-azure-west-b.cleardb.com";
    $user = "b8f4d17ca45332";
    $pwd = "fb083c22";
    $db = "gamestiAiNKRp4I2";
    // Connect to database.
    try {
        $conn = new PDO( "mysql:host=$host;dbname=$db", $user, $pwd);
        $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    }
    catch(Exception $e){
        die(var_dump($e));
    }
	
	//echo "good herE";
    // Insert registration info
    if(!empty($_POST)) {
	
	// echo "not empty";
    try {
        $name = $_POST['name'];
        $passwd = $_POST['password'];
       // $date = date("Y-m-d");
        // Insert data
        $sql_insert = "SELECT * FROM user";
        $stmt = $conn->query($sql_insert);
		$arrValues = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$num =  count($arrValues);
		
		//echo $num;
		
		
		   $salt = "Civilization5";
		if($num==0)
		{
		  echo "no users yet";
		  
		   $passwd = hash('sha256', $salt.$_POST['password']);  
			$sql = "INSERT INTO user (username, passhash) VALUES('$name', '$passwd')";
			$stmt = $conn->query($sql);
		}
		
		else{
	//	echo $name;
		$sql = "SELECT * FROM user WHERE username = '$name'";
		 $stmt = $conn->query($sql_insert);
		 $arrValues = $stmt->fetchAll();
		    $passwd = hash('sha256', $salt.$_POST['password']);
			//echo $arrValues;
			//echo $arrValues[0]['passhash'];
			//$auth_user = hash('sha256', $salt.$password);
			if($arrValues[0]['passhash'] == $passwd){
			
			echo "Logged in";
			session_start();

			//echo 'Welcome to page #1';

			$_SESSION['uid'] = $arrValues[0]['uid'];
		
			//echo $_SESSION['uid'];
			header("Location: index.php?id=".$_SESSION['uid']);
} 			else {
			echo "Not logged in";
			}
		
		
		}
     
    }
    catch(Exception $e) {
        die(var_dump($e));
    }
    //echo "<h3>Your're registered!</h3>";
    }
    // Retrieve data  
?>
</body>
</html>