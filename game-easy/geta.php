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
	$sql_request = "SELECT * FROM subj WHERE ID = 1 FOR UPDATE";
	$stmt = $conn->query($sql_request);
		echo "good after\n";
	$result = $stmt->fetch();
	echo "good after 2\n";
	$newsubnum = $result['subNum']+1;
	echo $newsubnum;
	echo "good after 4\n";
	$sql_request = "UPDATE subj SET subNum = $newsubnum WHERE ID = 1";
	$stmt = $conn->prepare($sql_request);
		echo "good after 3\n";
		if (!$stmt) {
    echo "\nPDO::errorInfo():\n";
    print_r($dbh->errorInfo());
  }
	$stmt = $conn->execute();
		if (!$stmt) {
    echo "\nPDO::errorInfo():\n";
    print_r($dbh->errorInfo());
  }
		echo "good after 7";
	
	if($stmt){
	echo "update success\n";
	$conn->commit();
	
	}
	
	else{
	
		$conn->rollBack();
		echo "update fail\n";
	}
	
	


	
	
?>