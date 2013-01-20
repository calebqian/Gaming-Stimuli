

<!DOCTYPE html>
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 

<script type="text/javascript">
	var hardness = 0;


</script>
<script type="text/javascript" src="cognitive_main.js">

</script>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.8.2.min.js"></script>





</head>
<body>
<!--<p>NOTE: if you are using Firefox Browser, you might enocunter peformance issue. Chrome and IE are recommanded.</p>
-->
<canvas id="myCanvas" width="320" height="320"
>Your browser does not support the HTML5 canvas tag.
</canvas>

<form action="turnin.php" method="post">
 <input type="text"   class="mywidgets"  id="Clock" readonly ="readonly" value="15.000">
<input type = "text"   class="mywidgets"  id = "score" readonly = "readonly" value="0">
<!--<input type = "text" id="totalPairs" readonly= "readonly" value = "0">-->
<input type = "text"   class="mywidgets"  id="discoveryPercent" readonly ="readonly" value = "0"></br>
<input type="submit">
</form>
<!--<input type = "button" id ="startButton" value="start" onClick="startNow();"> -->
<p id="status_count">Game will start in 3 seconds...</p>
</body>

</html>
