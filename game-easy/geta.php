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
	$conn->beginTransaction();
	echo "good here\n";
	//$stmt = $conn->query($sql_request);
	$sql_request = "SELECT subNum FROM subj WHERE ID = 1 FOR UPDATE";
	$stmt = $conn->query($sql_request);
		echo "good after\n";
	$result = $stmt->fetch();
	echo "good after 2\n";
	$sql_request = "UPDATE subj SET subNum = subNum + ? WHERE ID = ?";
	$stmt = $conn->prepare($sql_request);
	$stmt = $conn->execute(array(1, 1));
	echo "good after 3\n";
	echo $result['subNum']+1;
	echo "good after 4\n";
	if($stmt){
	echo "update success\n";
	$conn->commit();
	
	}
	
	else{
	
		$conn->rollBack();
		echo "update fail\n";
	}
	
	


	
	
?>