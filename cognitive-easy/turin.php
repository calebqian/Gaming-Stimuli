<meta charset="UTF-8">
<?php
//echo "Helllo world from PHP!"; 
$con = mysql_connect("us-cdbr-azure-west-b.cleardb.com","b8f4d17ca45332","fb083c22");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_select_db("gamestiAiNKRp4I2", $con);

$STR = "cognitive-easy";
mysql_query("INSERT INTO survey (game_type, pairs, total, percent, ad)
VALUES ('cognitive-easy', 40,8, 0.5, TRUE)");


// some code
?>