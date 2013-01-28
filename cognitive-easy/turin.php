<meta charset="UTF-8">
<?php
    $host = "us-cdbr-azure-west-b.cleardb.com";
    $user = "b8f4d17ca45332";
    $pwd = "fb083c22";
    $db = "gamestiAiNKRp4I2";
//echo "Helllo world from PHP!";
  try {
        $conn = new PDO( "mysql:host=$host;dbname=$db", $user, $pwd);
        $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    } 
    catch(Exception $e){
        die(var_dump($e));
    }
	
	if(!empty($_POST)){
		try{
			$sql_insert = "INSERT INTO survey (GameType, Pairs, Total, Percent, HaveAd) VALUES ('cognitive-easy', 4, 8, 0.37, TRUE)";
			$gametype=$_POST['gametype'];
			$pairs = intval($_POST['Pairs']);
			$total = intval($_POST['Total']);
			$percent = floatval($_POST['Percent']);
			$havead_str = boolval(intval($_POST['HaveAd']));
			
				
				
			 $stmt = $conn->prepare($sql_insert);
			$stmt->bindValue(1, $gametype);
			$stmt->bindValue(2, $pairs);
			$stmt->bindValue(3, $total);
			$stmt->bindValue(4, $percent);
			$stmt->bindValue(5, $havead);
			$stmt->execute();
		
		}
	   catch(Exception $e) {
        die(var_dump($e));
    }
	
	
	}
	
	



// some code
?>