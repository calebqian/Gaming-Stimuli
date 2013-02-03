<html>
<head>
<Title>Administration Portal</Title>

</head>
<body>


<form method="post" action="truncate.php" enctype="multipart/form-data" >
 <input type = 'submit' value = 'Clear All Data'/>  
</form>
<form method = "post" action = "export.php" enctype="multipart/form-data"> 
<input type = 'submit' value = 'Export'/> 
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
	
	$sql_request = "SELECT * FROM survey";
	$stmt = $conn->query($sql_request);
	//$result = $stmt->fetchAll();
	//$num =  count($result);
	$arrValues = $stmt->fetchAll(PDO::FETCH_ASSOC);
// open the table
print "<table wdith=\"100%\">\n";
print "<tr>\n";
// add the table headers
foreach ($arrValues[0] as $key => $useless){
    print "<th>$key</th>";
}
print "</tr>";
// display data
foreach ($arrValues as $row){
    print "<tr>";
    foreach ($row as $key => $val){
        print "<td align='center'>$val</td>";
    }
	print "<td><input type='button' value='delete'/></td>";
    print "</tr>\n";
}
// close the table
print "</table>\n";
	
	
	
	//echo $num;
	//echo "good here";

	
?>
</body>
</html>