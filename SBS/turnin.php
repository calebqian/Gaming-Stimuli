<?php
$con = mysql_connect("server22.000webhost.com","a8416280_homie","Tech3xcel");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
$result = mysql_list_tables("a8416280_home");
$num_rows = mysql_num_rows($result);
for ($i = 0; $i < $num_rows; $i++) {
    echo "Table: ", mysql_tablename($result, $i), "\n";
}

mysql_free_result($result);
// some code
?>