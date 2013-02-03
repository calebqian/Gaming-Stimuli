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
session_start();
unset($_SESSION['uid']);
  header('Location: index.php'); 

?>