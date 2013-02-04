<meta charset="UTF-8">
<?php
    $host = "us-cdbr-azure-west-b.cleardb.com";
    $user = "b8f4d17ca45332";
    $pwd = "fb083c22";
    $db = "gamestiAiNKRp4I2";
//echo "Helllo world from PHP!";
  try {
        $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pwd);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } 
    catch(Exception $e){
        die(var_dump($e));
    }
	
	//echo "so far so good";
	
	if(!empty($_POST)){
		try{
		
		//	echo "reached here 1";
			$gametype= $_POST['gametype'];
			//echo "reached here 2";
			$pairs = $_POST['Pairs'];
				//		echo "reached here 3";
			$total = $_POST['Total'];
			//	echo "reached here 4";
			$percent = $_POST['Percent'];
					//	echo "reached here 5";
			$havead = intval($_POST['HaveAd']);
					//	echo "reached here 6";
			$sql_insert = "INSERT INTO survey (GameType, Pairs, Total, Percent, HaveAd, submitdate, IP, subNum) VALUES (?, ?, ?, ?, ?, ?,?,?)";
			
			//echo "sql_insert sentence created.";
			//echo $gametype;
			//echo $pairs;
			//echo $total;
			//echo $havead;
			date_default_timezone_set('America/Chicago');
			$ip=$_SERVER['REMOTE_ADDR'];
			$subNUM = $_POST['sub'];
			var_dump($ip);
			
			$current_time = date('Y-m-d H:i:s');
			 $stmt = $conn->prepare($sql_insert);
			$stmt->bindValue(1, $gametype);
			$stmt->bindValue(2, $pairs);
			$stmt->bindValue(3, $total);
			$stmt->bindValue(4, $percent);
			$stmt->bindValue(5, $havead);
			$stmt->bindValue(6, $current_time);
			$stmt->bindValue(7, $ip);
			$stmt->bindValue(8, $subNUM);
			$stmt->execute();
		
		}
	   catch(Exception $e) {
        die(var_dump($e));
		}
	
	}
	
	
// some code
?>