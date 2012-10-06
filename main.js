
var picasso;
var mousePos;
var GridCordPrev = "undefined";
var GridCordNext = "undefined";
var imagedata;
var background;
var gridD = 40;
var TimeLimit = 15000; //in ms
var intervalHandler;
var countDownStart; // the time between Jan 1st, 1970 and the start



var score = 0;
function whichGrid()
{


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

function shadow(grid_x, grid_y)
{
   //this function shadows the graphics
	// mark the value in matrix as -1
	// 
	var c = document.getElementById("myCanvas");
	var context =  c.getContext('2d');
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
var img = new Image();
	img.src = "empty.jpg";  //alert(img);
	
	//empty image to cover the -1 grid
	context.drawImage(img, grid_x*gridD, grid_y*gridD);


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
function AdjacentOrNot( GridLeft,  GridRight){


 
 //return true if adjacent
 //reture false if not adjacent
 //four checked, north, east, west, south
 
 //North
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
   c.value = score;
   
   


}

function makeSelection()
{

  GridCordNext = whichGrid();
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
   if(AdjacentOrNot(GridCordPrev, GridCordNext) == true && picasso[GridCordPrev.y][GridCordPrev.x] == picasso[GridCordNext.y][GridCordNext.x])
   {
       //call function to clear both of these grids
		// yes they are gone
		
	//	unMarkGrid(GridCordNext.x, GridCordNext.y);
	
   // GridCordPrev = "undefined";
	//GridCordNext = "undefined";
     shadow(GridCordPrev.x, GridCordPrev.y);
     shadow(GridCordNext.x, GridCordNext.y);
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

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }



function enlightPicasso()
{
    picasso = new Array(9);
	
	var i = 0;
	var j = 0;
	
	 
    for(i = 0;i<9;i++)
   {
   
    picasso[i] = new Array(9);
    for(j=0;j<9;j++){
	
	//var img = new Image();
	//img.src = "shape"+randomGenerator()+".jpg";  //alert(img);
	//ctx.drawImage(img,j*30,i*30, 30, 30);
     picasso[i][j] = randomGenerator();
	 
	 
	 }
   }
}



function drawPicasso(){
     var c = document.getElementById("myCanvas");
   //alert(c);
      var ctx=c.getContext("2d");
  //alert(ctx);
  
  
  for(i = 0;i<9;i++)
   {
   
    
    for(j=0;j<9;j++){
	
	var img = new Image();
	img.src = "shape"+picasso[i][j]+".jpg";  //alert(img);
	
	//alert(img.src);
	ctx.drawImage(img,j*gridD,i*gridD, gridD, gridD);
     
	 
	 
	 }
   }

}

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


function randomGenerator()
{
    var randomnumber=Math.floor(Math.random()*9);

    return randomnumber+1;
}

 function writeMessage(canvas, message) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '18pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 10, 25);
      }
	  

function StartCountDownThread() {
   // var c = document.getElementById("myCanvas");
	//var context = c.getContext("2d");
	
		var count = calculateCountDownMSec();
	if(checkCountComplete(count)==true)
	{
	
	   window.clearInterval(intervalHandler);
	    return;
	
	}
	var inputText = document.getElementById("Clock");

	var diff = TimeLimit - count;
var sec = diff/1000;
	inputText.value = sec.toString();
	
	
	
//	alert("ready");
};





window.onload = function(event){


var c = document.getElementById("myCanvas");
 var context = c.getContext('2d');

c.addEventListener('mousemove', function(evt) {
           mousePos = getMousePos(c, evt);
          //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
         // writeMessage(c, message);
        }, false);
     
   //insert function to draw the matrix
   // NxN, where N = 9
   // pixel width 976, height 445
   enlightPicasso();
 //  alert("test");
  // drawRandom();
   drawPicasso();

   imagedata = context.getImageData(0, 0, 1, 1); 
   
   
   setCountDown();
   
   
   intervalHandler = setInterval(StartCountDownThread, 0); // this creates a new "thread," but doesn't make much sense to the untrained eye.
//alert("123");
//background =  Color(imagedata[0], imagedata[1], imagedata[2], imagedata[3]);
 // alert("test2");


};