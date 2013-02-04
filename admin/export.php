<?php
session_start();
if (!(isset($_SESSION['uid']) && $_SESSION['uid']==1)) {
	echo "not logged in";
	//echo isset($_SESSION['uid']);
	//echo isset($_SESSION['uid'];
    header('Location: logon.php'); 
    exit;
}
?>


<?php

	$file = 'export';
	$filename = $file."_".date('Y-m-d H:i:s');
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

/*******YOU DO NOT NEED TO EDIT ANYTHING BELOW THIS LINE*******/
//create MySQL connection
$sql = "Select * from survey";

//select database

//execute query
$stmt = $conn->query($sql);

//$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
$col = $stmt->columnCount();
$rown = $stmt->rowCount();
//echo $col;
//echo $rown;
$file_ending = "xls";

//header info for browser
header("Content-Type: application/xls");

header("Content-Disposition: attachment; filename=$filename.xls");

header("Pragma: no-cache");
	
header("Expires: 0");

/*******Start of Formatting for Excel*******/
//define separator (defines columns in excel & tabs in word)
$sep = "\t"; //tabbed character

//start of printing column names as names of MySQL fields
for ($i = 0; $i < $col; $i++) {
$meta =  $stmt->getColumnMeta($i);
echo $meta['name'] . "\t";

}
print("\n");
//end of printing column names

//start while loop to get data
    while($row = $stmt->fetch(PDO::FETCH_BOTH))
    {
	
        $schema_insert = "";
		$counter = $stmt->columnCount();
	//	echo $counter;
        for($j=0; $j< $counter; $j++)
        {
		//	echo "mark";
            if(!isset($row[$j]))
                $schema_insert .= "NULL".$sep;
            elseif ($row[$j] != "")
                $schema_insert .= "$row[$j]".$sep;
            else
                $schema_insert .= "".$sep;
        }
        $schema_insert = str_replace($sep."$", "", $schema_insert);
 $schema_insert = preg_replace("/\r\n|\n\r|\n|\r/", " ", $schema_insert);
        $schema_insert .= "\t";
        print(trim($schema_insert));
        print "\n";
    }




?>


