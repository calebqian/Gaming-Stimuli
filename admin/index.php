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

<html>
<head>
<Title>Administration Portal</Title>
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
<body><h1>Game Stimuli Management Portal</h1>
<table><tr>
<td>
	<form method='post' action='index.php' enctype='multipart/form-data' >
 <input type = 'submit' value = 'Refresh'/>  
</form>
</td>
<td>
	<form method='post' action='truncate.php' enctype='multipart/form-data' >
 <input type = 'submit' value = 'Clear All Data'/>  
</form>
</td>
<td>
<form method = 'post' action = 'export.php' enctype='multipart/form-data'> 
<input type = 'submit' value = 'Export'/> 
</form>
</td>
<td>
<form method = 'post' action = 'logout.php' enctype='multipart/form-data'> 
<input type = 'submit' value = 'Log out'/> 
</form>
</td>
</tr>
</table>
<?php
	//echo "running here";

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
	//echo "running here";
	

	 

    // Insert registration info
	//echo "good here";
	
	$sql_request = "SELECT * FROM survey";
	$stmt = $conn->query($sql_request);
	//$result = $stmt->fetchAll();
	//$num =  count($result);
	$arrValues = $stmt->fetchAll(PDO::FETCH_ASSOC);
// open the table
  if(count($arrValues)==0)
	echo "No data entries have been found.";

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
	$ID = $row['ID'];
	print "<td><form method= 'POST' action = 'delete.php'><input type='submit' value='delete'/>
					 <input type = 'text' name='index' hidden='hidden' readonly='readonly' value='$ID'/>	</form></td>";
    print "</tr>\n";
}
// close the table
print "</table>\n";
	
	
	
	//echo $num;
	//echo "good here";

	
?>
</body>
</html>