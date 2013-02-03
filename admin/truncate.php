<form method="post" action="index.php" enctype="multipart/form-data" >
 <input type = 'submit' value = 'Back'/>  
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
    // Insert registration info
	//echo "good here";
	
	$sql_request = "TRUNCATE TABLE survey";
	$stmt = $conn->query($sql_request);
	//$result = $stmt->fetchAll();
	//$num =  count($result);

	echo "ALL DATA ENTRIES DELETED!";
	
	//echo $num;
	//echo "good here";

	
?>