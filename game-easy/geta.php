<meta charset="UTF-8">
<?php
  $host = "us-cdbr-azure-west-b.cleardb.com";
    $user = "b8f4d17ca45332";
    $pwd = "fb083c22";
    $db = "gamestiAiNKRp4I2";
	
	
 try {
        $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pwd);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } 
    catch(Exception $e){
        die(var_dump($e));
    }
	echo "good here";
	$sql_request = "START TRANSACTION";
	$stmt = $conn->query($sql_request);
	$sql_request = "SELECT subNum FROM subj WHERE ID = 1 FOR UPDATE";
	$stmt = $conn->query($sql_request);
	$result = $stmt->fetch();
	$sql_request = "UPDATE subj SET subNum = subNum+1 WHERE ID = 1; COMMIT";
	$stmt = $conn->prepare($sql_request);
	$stmt = $conn->execute();


	
	
?>