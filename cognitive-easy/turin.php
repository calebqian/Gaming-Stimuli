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

$sql_insert = "INSERT INTO survey (GameType, Pairs, Total, Percent, HaveAd) VALUES ('cognitive-easy', 4, 8, 0.567898093, TRUE)";

$stmt = $conn->query($sql_select);


// some code
?>