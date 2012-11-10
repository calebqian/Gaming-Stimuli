var pairs = 0;
var picasso;
var mousePos="undefined";
var GridCordPrev = "undefined";
var GridCordNext = "undefined";
var imagedata;
var background;
var gridD = 40;
var dimension = 9; //9x9
var TimeLimit = 3000; //in ms
var intervalHandler;
var countDownStart; // the time between Jan 1st, 1970 and the start
var ImagePool;
var EmptyImage;
var hardness = 0; //hardnesss of the game, 0: pair, 1: one between
var threshold = 42;
var args=1;
var score = 0;
function whichGrid()
{
  if(mousePos=="undefined")
	return "undefined";

    var my_x = mousePos.x;
	var my_y = mousePos.y;
 

     return {
      x: Math.floor(my_x/gridD),
      y: Math.floor(my_y/gridD)
    };
	


}
/*
function allClear()
{
    var c = document.getElementById("myCanvas");
   //alert(c);
  var ctx=c.getContext("2d");
  ctx.beginPath();
   ctx.clearRect(0, 0, c.width, c.height);

}
*/

function shadowPreload()
{
   //this function shadows the graphics
	// mark the value in matrix as -1
	// 
	
	//var temp;
  //  var i;
//	var j;
	/*
	temp = context.getImageData(0, 0, 1, 1); 
	temp.data[0] = 0;
    temp.data[1] = 0;
    temp.data[2] = 0;
	for(i=0;i<gridD;i++)
	{
	    for(j=0;j<gridD;j++)
		{
		
		   //draw black pixels here
		    
			
		//	alert(temp);
		   
			//temp.data[3] = 0.5;
			context.putImageData(temp, grid_x*gridD+i, grid_y*gridD+j);
		}
		
	
	}
*/
	EmptyImage = new Image();
	EmptyImage.src = "empty.jpg";  //alert(img);
	EmptyImage.shadowHer = function(x, y)
	{
		var c = document.getElementById("myCanvas");
		var context =  c.getContext('2d');
		context.drawImage(this, x*gridD, y*gridD);
	};
	//empty image to cover the -1 grid
	


}
function unMarkGrid(grid_x, grid_y)
{
 
   MarkGrid(grid_x, grid_y);
}


function MarkGrid(grid_x, grid_y)
{
   //  alert("top of MarkGrid");
  var c = document.getElementById("myCanvas");
   //alert(c);
  var ctx=c.getContext("2d");
  //ctx.globalCompositeOperation = "destination-out";
  //ctx.strokeStyle = "rgba(0,0,0,1)";
  //  ctx.globalCompositeOperation = "destination-out";
 //alert(imagedata);
  var i = 0;
  imagedata.data[0] = 255-imagedata.data[0];
  imagedata.data[1] = 255-imagedata.data[1];
  imagedata.data[2] = 255-imagedata.data[2];
  
 //   imagedata.data[3] = 255;
  //alert("After calculating img data");
 // imagedata.data[0] = 255-imagedata.data[0];
  
  //var j = 0;
  for(i=0;i<gridD;i++)
  {
  
    // alert("wtf");
       ctx.putImageData(imagedata, grid_x*gridD+i, grid_y*gridD);
  }
   for(i=0;i<gridD;i++)
  {
       ctx.putImageData(imagedata, grid_x*gridD+gridD-1, grid_y*gridD+i);
  }
   for(i=0;i<gridD;i++)
  {
       ctx.putImageData(imagedata, grid_x*gridD+gridD-1-i, grid_y*gridD+gridD-1);
  }
  
  for(i=0;i<gridD;i++)
  {
       ctx.putImageData(imagedata, grid_x*gridD, grid_y*gridD+gridD-1-i);
  }
  
   //alert("After spiral painting");
  


}


function IfGappedByOne(GridLeft, GridRight)
{
 if(GridLeft.x == GridRight.x && GridLeft.y == GridRight.y+2)
    return true;
	
 if(GridLeft.x == GridRight.x && GridLeft.y == GridRight.y -2 )
    return true;
	
 if(GridLeft.y == GridRight.y && GridLeft.x == GridRight.x -2)
    return true;
	
  if(GridLeft.y == GridRight.y && GridLeft.x == GridRight.x +2)
    return true;
	
	
	return false;
}

function AdjacentOrNot( GridLeft,  GridRight){

 if(GridLeft.x == GridRight.x && GridLeft.y == GridRight.y+1)
    return true;
	
 if(GridLeft.x == GridRight.x && GridLeft.y == GridRight.y -1 )
    return true;
	
 if(GridLeft.y == GridRight.y && GridLeft.x == GridRight.x -1)
    return true;
	
  if(GridLeft.y == GridRight.y && GridLeft.x == GridRight.x +1)
    return true;
	
	
	return false;

}


function setCountDown()
{
    var d = new Date();
    var n = d.getTime();
   countDownStart = n;


}

function calculateCountDownMSec()
{

 var d = new Date();
    var n = d.getTime(); //the time right now
	
	return n-countDownStart;

}

function checkCountComplete(countDownMSec)
{
    if(TimeLimit - countDownMSec <=0)
	   return true;
	   
	return false;


}


/*function CountDownClockUpdate()
{


}
*/

function updateScoreTest()
{
   


   var c = document.getElementById("score");
   var d = document.getElementById("discoveryPercent");
   var e = document.getElementById("totalPairs");
   pairs = countGaps(args);
   e.value = pairs;
   c.value = score;
   d.value = Math.round((score/(score+pairs))*100)+"%";
   


}
function grayShadow()
{

//http://en.wikipedia.org/wiki/Grayscale
   var c = document.getElementById("myCanvas");
   var i;
  
   var ctx = c.getContext("2d");

	
	//alert("test");
	  var imgd = ctx.getImageData(0, 0, dimension*gridD, dimension*gridD);
    
	 
	 
	 
	var len = imgd.data.length;
    // alert(len);
for(i = 0;i<len;i+=4){


   	 var R =  imgd.data[i];
      var G =  imgd.data[i+1];
      var B =  imgd.data[i+2];
      var luma = 0.2126*R + 0.7152*G+0.0722*B;

	  	 imgd.data[i] = luma;
       imgd.data[i+1] = luma;
      imgd.data[i+2] = luma;

   
   }
     ctx.putImageData(imgd,0,0);

}

function disableControl()
{

   
   var c = document.getElementById ("myCanvas");
    c.removeAttribute("onClick");
	
  //alert("??");
}



function resetGame()
{


}




function makeSelection()
{

  GridCordNext = whichGrid();
  if(GridCordNext=="undefined")
	return;
  if(picasso[GridCordNext.y][GridCordNext.x]== -1)
  {
       return;
  
  }

 // alert("top");
  if(GridCordPrev == "undefined")
  {
      GridCordPrev = whichGrid();
      MarkGrid(GridCordPrev.x, GridCordPrev.y);

	  }

   
   else{
   
   
  unMarkGrid(GridCordPrev.x, GridCordPrev.y);
  // allClear();
  GridCordNext = whichGrid();
   
   MarkGrid(GridCordNext.x, GridCordNext.y);
   var checkfunction = AdjacentOrNot;
   if(hardness == 2)
    checkfunction = IfGappedByOne;
   
   if(checkfunction(GridCordPrev, GridCordNext) == true && picasso[GridCordPrev.y][GridCordPrev.x] == picasso[GridCordNext.y][GridCordNext.x])
   {
       //call function to clear both of these grids
		// yes they are gone
		
	//	unMarkGrid(GridCordNext.x, GridCordNext.y);
	
   // GridCordPrev = "undefined";
	//GridCordNext = "undefined";
     EmptyImage.shadowHer(GridCordPrev.x, GridCordPrev.y);
     EmptyImage.shadowHer(GridCordNext.x, GridCordNext.y);
	 picasso[GridCordPrev.y][GridCordPrev.x] =-1;
	  picasso[GridCordNext.y][GridCordNext.x] = -1;
      score++;
	  
	  updateScoreTest();
	  //alert(score);
	//alert("yahoo!");
    //return;
   }
   
   GridCordPrev = GridCordNext;
   //GridCordNext = "undefined";
   } 
  
   
  //alert(123);
 //alert(GridCord.x);alert("and");alert(GridCord.y);


}
function isUnique(cord_i, cord_j)
{

   if(cord_i-1>=0&&picasso[cord_i][cord_j]==picasso[cord_i-1][cord_j])
     return false;
	 
	if(cord_i+1<dimension&&picasso[cord_i][cord_j]==picasso[cord_i+1][cord_j])
	 return false;
	
	if(cord_j+1<dimension&&picasso[cord_i][cord_j] == picasso[cord_i][cord_j+1])
	 return false;
	 
   if(cord_j-1>=0&&picasso[cord_i][cord_j] == picasso[cord_i][cord_j-1])
     return false;


    return true;	 
	 
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }



function enlightPicasso()
{
    picasso = new Array(dimension);
	
	var i = 0;
	var j = 0;
	  var tank = 0;
	 
    for(i = 0;i<dimension;i++)
   {
   
    picasso[i] = new Array(dimension);
    for(j=0;j<dimension;j++){
	
	//var img = new Image();
	//img.src = "shape"+randomGenerator()+".jpg";  //alert(img);
	//ctx.drawImage(img,j*30,i*30, 30, 30);
	
	 
     picasso[i][j] = randomGenerator();
		
	 
	 }
   }
 if(hardness==0){
   while(tank<30)
   {
   
   
	var i = Math.floor(Math.random()*dimension);
    var j = Math.floor(Math.random()*dimension);
	
	//alert(i+","+j+")"+tank);
   if(picasso[i][j]==-1)
   {
       
   }
   
    else{
	   picasso[i][j] = -1;
	   tank++;
	}
   
   
   }
 
   for(i=0;i<dimension;i++)
   {
	for(j = 0;j<dimension; j++)
	{
	
	   if(picasso[i][j]!=-1&&isUnique(i,j))
		{
			picasso[i][j] = -1;
		
		
		}
	
	}
   
   
   }
 
 
 }
}



function drawPicasso(){
     var c = document.getElementById("myCanvas");
   //alert(c);
      var ctx=c.getContext("2d");
  //alert(ctx);
  ImagePool = new Array(dimension);
  
  for(i = 0;i<dimension;i++)
   {
    ImagePool[i] = new Array(dimension);
    
    for(j=0;j<dimension;j++){
	
	ImagePool[i][j] = new Image();
	if(picasso[i][j]==-1){
	ImagePool[i][j].src = "empty.jpg";  //alert(img);
	ImagePool[i][j].i = i;
	ImagePool[i][j].j = j;
	}
	
	else{
	ImagePool[i][j].src = "shape"+picasso[i][j]+".jpg";  //alert(img);
	ImagePool[i][j].i = i;
	ImagePool[i][j].j = j;
	}
    ImagePool[i][j].onload = function(){
        
      var c = document.getElementById("myCanvas");
   //alert(c);
      var ctx=c.getContext("2d");
      //  alert("Hello");
    //  alert(this);
    


      ctx.drawImage(this,this.j*gridD,this.i*gridD, gridD, gridD);
      if(this.i==0&&this.j==0)
	{


		 imagedata = ctx.getImageData(0, 0, 1, 1); 
	}    


  // execute drawImage statements here
    };
	//alert(img.src);
	/*while(1)
	{
	
	  // alert(img.complete);
	   if(img.complete)
	      break;
	
	}*/
	
       

	
     
	 
	 
	 }
   }

}
/*
function drawRandom()
{

  
   var c = document.getElementById("myCanvas");
   //alert(c);
  var ctx=c.getContext("2d");
 //  alert(ctx);
 
  
  var i = 0;
  var j = 0;
  
  
  for(i = 0;i<9;i++)
  {
    for(j=0;j<9;j++){
	
	 var img = new Image();
	img.src = "shape"+randomGenerator()+".jpg";  //alert(img);
	ctx.drawImage(img,j*gridD,i*gridD, gridD, gridD);
     }
   }


}

*/
function countGaps(distance){

    var counter = 0;
	var i, j;
	for(i=0;i<dimension-distance;i++)
	{
		for(j=0;j<dimension-distance;j++)
		{
			if(picasso[i][j]!=-1)
			{
			
			 if(picasso[i][j] == picasso[i][j+distance]){
				counter++;
				}
			 if(picasso[i][j] == picasso[i+distance][j]){
			    counter++;
			}
			
			}
		
		
		}
	
	
	}
	//manipulate corner cases
	var offset = 1;
	for(offset = 1;offset<=distance;offset++){
	for(j=0;j<dimension-distance;j++)
	{
	   if(picasso[dimension-offset][j]!=-1)
	   {
			if(picasso[dimension-offset][j]==picasso[dimension-offset][j+distance])
				counter++;
	   
	   
	   }
	
	}
	for(i=0;i<dimension-distance;i++)
	{
		if(picasso[i][dimension-offset]!=-1)
		{
			if(picasso[i][dimension-offset]==picasso[i+distance][dimension-offset])
				counter++;
		
		
		}
	
	
	
	}
	}
	return counter;


}

function countPairs()
{
    var counter = 0;
	var i,j;
	for(i=0;i<dimension-1;i++)
	{
		for(j=0;j<dimension-1;j++)
		{
		
		   if(picasso[i][j]!=-1){
		    if(picasso[i][j] == picasso[i][j+1]){
				counter++;
				}
			 if(picasso[i][j] == picasso[i+1][j]){
			    counter++;
			}
			
			}
		}
	
	
	
	}
	
	for(j=0;j<dimension-1;j++)
	{
	   if(picasso[dimension-1][j]!=-1)
	   {
			if(picasso[dimension-1][j]==picasso[dimension-1][j+1])
				counter++;
	   
	   
	   }
	
	}
	for(i=0;i<dimension-1;i++)
	{
		if(picasso[i][dimension-1]!=-1)
		{
			if(picasso[i][dimension-1]==picasso[i+1][dimension-1])
				counter++;
		
		
		}
	
	
	
	}
	
	//if(picasso[dimension-1][dimension-1]==picasso[dimension-2][dimension-1]&&picasso[dimension-1][dimension-1]==picasso[dimension-1][dimension-2])
		//counter--;
	
	
     
	return counter;



}



function randomGenerator()
{

	var module = 3;
	if(hardness == 0)
	   module = 2;
    var randomnumber=Math.floor(Math.random()*module);

    return randomnumber+1;
}
function startNow()
{



}
 function writeMessage(canvas, message) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '18pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 10, 25);
      }
	  
function StartCountDownThreadForCoolDown() {
   // var c = document.getElementById("myCanvas");
	//var context = c.getContext("2d");
	
		var count = calculateCountDownMSec();
	if(checkCountComplete(count)==true)
	{
	
		
		//c.value = "Game will start in"+ count +"seconds...";
	   //alert("check");
	   window.clearInterval(intervalHandler);
	   $('#status_count').hide();
	   //$('#continue').hide();
	    setCountDown();
		
		TimeLimit = 15000;
		
		if(hardness==0)
		  TimeLimit = 10000;
		 
		intervalHandler = setInterval(function(){StartCountDownThread();}, 0); 
	  // grayShadow();
	   //disableControl();
	   var c = document.getElementById("myCanvas");
	var context = c.getContext('2d');

	c.addEventListener('mousemove', function(evt) {
           mousePos = getMousePos(c, evt);
          //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
         // writeMessage(c, message);
        }, false);

	c.setAttribute('onClick', 'makeSelection();');
		    return;
	}
	//var c = document.getElementById("status_count");

	var diff = TimeLimit - count;
var sec = Math.round(diff/1000);
	$('#status_count').text("Game will start in "+sec.toString()+" seconds...");
	
	
	
//	alert("ready");
}
function StartCountDownThread() {
   // var c = document.getElementById("myCanvas");
	//var context = c.getContext("2d");
	
		var count = calculateCountDownMSec();
	if(checkCountComplete(count)==true)
	{
	   //alert("check");
	   window.clearInterval(intervalHandler);
	   grayShadow();
	   disableControl();
	    return;
	
	}
	var inputText = document.getElementById("Clock");

	var diff = TimeLimit - count;
var sec = diff/1000;
	inputText.value = sec.toString();
	
	
	
//	alert("ready");
}


function onloadHelper(event)
{


     
   //insert function to draw the matrix
   // NxN, where N = 9
   // pixel width 976, height 445
  //var countFunction = countPairs;
  //if(hardness==1)
//	countFunction = countGaps;
	
  $('.mywidgets').hide();
  
  if(hardness==2)
	args = 2;
//do{
  enlightPicasso();
 // }
 // while((pairs=countGaps(args))<threshold);
   pairs=countGaps(args);
   
 //  alert("test");
  // drawRandom();
  shadowPreload();
   drawPicasso();

  
  
   var display = document.getElementById("totalPairs");
   display.value = pairs;
   var p = document.getElementById("discoveryPercent");
   p.value = Math.round((score/(score+pairs))*100)+"%";
   
   if(hardness==0)
   {
   display = document.getElementById("Clock");
   display.value = "10.000";
   }
   setCountDown();
   intervalHandler = setInterval(function(){StartCountDownThreadForCoolDown();}, 0);
  
   
   // this creates a new "thread," but doesn't make much sense to the untrained eye.
//alert("123");
//background =  Color(imagedata[0], imagedata[1], imagedata[2], imagedata[3]);
 // alert("test2");


}


window.onload = onloadHelper;
