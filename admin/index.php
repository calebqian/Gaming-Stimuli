<?php
$username="b8f4d17ca45332";
$password="fb083c22";
$database="gamestiAiNKRp4I2";

mysql_connect("us-cdbr-azure-west-b.cleardb.com",$username,$password);
@mysql_select_db($database) or die( "Unable to select database");
$query="SELECT * FROM survey";
$result=mysql_query($query);

$num=mysql_numrows($result);

mysql_close();

echo "<b><center>Database Output</center></b><br><br>";

$i=0;
while ($i < $num) {

$field1-name=mysql_result($result,$i,"field1-name");
$field2-name=mysql_result($result,$i,"field2-name");
$field3-name=mysql_result($result,$i,"field3-name");
$field4-name=mysql_result($result,$i,"field4-name");
$field5-name=mysql_result($result,$i,"field5-name");

echo "<b>$field1-name 
$field2-name2</b><br>$field3-name<br>$field4-name<br>$field5-name<hr><br>";

$i++;
}

?>