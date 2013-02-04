
var mousePos="undefined";
var args=1;
var pairs = 0;
var GridCordPrev = "undefined";
var GridCordNext = "undefined";
var loopCount = 0;
var init_X;
var init_Y;
var startX = 308;
var startY = 42;
//var GridCurrent = "undefined";
var GridLast = "undefined";
var halted = "false";
var imagedata;
var background;
var ADwidth = 200;
var EmptyImage;
var ADheight = 150;
var bgLoaded = false;
var validity = true;
var ADPlacements;

var init_X;
var init_Y;
var contEnabled = true;
var uplock = true;
var ADpool = new Array(4);
var contSlot;
var WelcomeSlot;

var threshold = 42;
var dimension = 9; //9x9
var gridD = 40;
var picasso;
var shadowMatrix;
//var hardness = 0;
var symbolNum = 2;
var emptyShadower;
var blankShadower;
var TimeLimit = 1000; //in ms
var intervalHandler;
var countDownStart; // the time between Jan 1st, 1970 and the start
var score = 0;
if(hardness == 1||hardness==2){
 symbolNum = 5;
// eachGroup = dimension*dimension/symbolNum;
 }
 
//var visible;
//var ImagePool;
var eachGroup = dimension*dimension/symbolNum;
//var fillCounter = new Array(symbolNum);
//for(flag = 0;flag<symbolNum;flag++)
 //  fillCounter[flag] = eachGroup;
 
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
function setCountDown()
{
    var d = new Date();
    var n = d.getTime();
   countDownStart = n;


}
function checkCountComplete(countDownMSec)
{
    if(TimeLimit - countDownMSec <=0)
	   return true;
	   
	return false;


}
function BlankScreenCountDownThread()
{
  var count = calculateCountDownMSec();
	if(checkCountComplete(count)==true)
	{
	
		
		//c.value = "Game will start in"+ count +"seconds...";
	   //alert("check");
	   window.clearInterval(intervalHandler);
	   
	     if(loopCount == 33)
	  {
	  
		ClearWhite();
		DrawEndImage();
	  
		return;
	  }
	   onloadHelper();
	   //setCountDown();
	   //TimeLimit = 2000;
	   //ClearWhite();
	   //intervalHandler = setInterval(function(){BlankScreenCountDownThread();}, 0);
	   
	//   $('#status_count').hide();
	   //$('#continue').hide();
	    //setCountDown();
	//	TimeLimit = 7500;
	//	intervalHandler = setInterval(function(){StartCountDownThread();}, 0); 
   }

}

function GrayScreenCountDownThread(){

	var count = calculateCountDownMSec();
	if(checkCountComplete(count)==true)
	{
	
		
		//c.value = "Game will start in"+ count +"seconds...";
	   //alert("check");
	   if(loopCount>0){
		//alert("sending data...");
		send_data();
	   }
	   window.clearInterval(intervalHandler);
	   setCountDown();
	   TimeLimit = 2000;
	   loopCount++;
	   ClearWhite();
	   intervalHandler = setInterval(function(){BlankScreenCountDownThread();}, 0);
	   
	//   $('#status_count').hide();
	   //$('#continue').hide();
	    //setCountDown();
	//	TimeLimit = 7500;
	//	intervalHandler = setInterval(function(){StartCountDownThread();}, 0); 
   }
}
function DrawEndImage(){

	WelcomeSlot = new Image();
	WelcomeSlot.src = "images/end.jpg";
	WelcomeSlot.onload = function()
	{
		
	var c = document.getElementById("myCanvas");
   //alert(c);
		var ctx=c.getContext("2d");
      //  alert("Hello");
    //  alert(this);
    //var cheight = c.height;
	//var cwidth = c.width;
   // init_X = 	(cwidth-this.naturalWidth)/2;
	//init_Y = (cheight-this.naturalHeight)/2


		//ctx.scale(-1, 1);
	//	ctx.translate(width, 0);
	//flipImage(image, ctx, 1, flipV);
      ctx.drawImage(this, parseInt(init_X), parseInt(init_Y), this.naturalWidth, this.naturalHeight);
	}
}
function OfficialStartScreen(){

     if(loopCount!=0) {
	   
	  // ClearWhite();
	   setCountDown();
		TimeLimit = 500;
       intervalHandler = setInterval(function(){GrayScreenCountDownThread();}, 0);
	   
	   
	   return;
      }
	
      validity = true;
    WelcomeSlot = new Image();
	contSlot.src = "images/start.jpg";
	WelcomeSlot.src = "images/start_official.jpg";
	WelcomeSlot.onload = function()
	{
		
	var c = document.getElementById("myCanvas");
   //alert(c);
		var ctx=c.getContext("2d");
      //  alert("Hello");
    //  alert(this);
    var cheight = c.height;
	var cwidth = c.width;
	


		//ctx.scale(-1, 1);
	//	ctx.translate(width, 0);
	//flipImage(image, ctx, 1, flipV);
      ctx.drawImage(this, parseInt(init_X), parseInt(init_Y), this.naturalWidth, this.naturalHeight);
				var nWidth = contSlot.naturalWidth;
		var nHeight = contSlot.naturalHeight;
			var WnHeight = WelcomeSlot.naturalHeight;
		var WnWidth = WelcomeSlot.naturalWidth;
	  ctx.drawImage(contSlot, parseInt(init_X)+30, parseInt((cheight-nHeight)/2+WnHeight/2-nHeight*2)+40);
	//c.addEventListener('mousedown',startDownHandler, false);
	
	c.addEventListener('mouseup', OfficialStartUpHanlder, false);
	
	loopCount ++;
	//c.addEventListener('mousemove', startMoveHandler, false);
	
	
	}




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
	   OfficialStartScreen();
	   
	    return;
	
	}
	var inputText = document.getElementById("Clock");

	var diff = TimeLimit - count;
var sec = diff/1000;
	inputText.value = sec.toString();
	
	
	
//	alert("ready");
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
	//   $('#status_count').hide();
	   //$('#continue').hide();
	    setCountDown();
		TimeLimit = 12000;
		intervalHandler = setInterval(function(){StartCountDownThread();}, 0); 
	  // grayShadow();
	   //disableControl();
	   var c = document.getElementById("myCanvas");
	var context = c.getContext('2d');



	c.setAttribute('onClick', 'makeSelection();');
	
	 if(loopCount<=0||(loopCount>=1&&loopCount<=2))
	 {
		//no ad, extra practise
	 }
	 
	 else{
	 
	    //draw ad depends on the distribution
		var offsetIndex = loopCount-2-1;
		//alert(offsetIndex);
		drawRespectiveAD(ADPlacements[offsetIndex]);
	 
	 } 
	
		    return;
	}
	//var c = document.getElementById("status_count");

	var diff = TimeLimit - count;
var sec = Math.round(diff/1000);
	$('#status_count').text("Game will start in "+sec.toString()+" seconds...");
	
	
	
//	alert("ready");
}
function grayShadow()
{

//http://en.wikipedia.org/wiki/Grayscale
   var c = document.getElementById("myCanvas");
   var i;
  
   var ctx = c.getContext("2d");

	
	//alert("test");
	  var imgd = ctx.getImageData(startX, startY, dimension*gridD, dimension*gridD);
    
	 
	 
	 
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
     ctx.putImageData(imgd,startX,startY);

}
function calculateCountDownMSec()
{

 var d = new Date();
    var n = d.getTime(); //the time right now
	
	return n-countDownStart;

}
function randomGenerator()
{

	
    var randomnumber=Math.floor(Math.random()*symbolNum);
    
	
	
	
    return randomnumber+1;
}

function flip(duration, objGrid, subGrid, flag, callback)
{
//flag = 1, then flip to a number
//flag = 0, the flip back to NULL
var dt = new Date();
var time = dt.getTime();

animate(time, time, time+duration, objGrid, subGrid, gridD, gridD, flag, callback);

}

function flipBack(obj)
{

	flip(200, "null",obj, 0, 0);
  // emptyShadower.shadowHer(xcord, ycord);


}

function shadowPreload()
{
 
	EmptyImage = new Image();
	EmptyImage.src = "empty.jpg";  //alert(img);
	EmptyImage.shadowHer = function(x, y)
	{
		var c = document.getElementById("myCanvas");
		var context =  c.getContext('2d');
		context.drawImage(this, x*gridD+startX, y*gridD+startY);
	};
	//empty image to cover the -1 grid
	


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
function whichGrid()
{
  if(mousePos=="undefined")
	return "undefined";

	
	
    var my_x = mousePos.x;
	var my_y = mousePos.y;
 
    if(my_x<startX||my_x>=startX+gridD*dimension||my_y<startY||my_y>=startY+gridD*dimension)
		return "undefined";
 
 

     return {
      x: Math.floor((my_x-startX)/gridD),
      y: Math.floor((my_y-startY)/gridD)
    };
	


}

function updateScoreTest()
{
   


   var s = document.getElementById("score");
   var d = document.getElementById("discoveryPercent");
   var e = document.getElementById("totalPairs");
   pairs = countGaps(args);
   e.value = pairs;
   s.value = score;
   d.value = score/(score+pairs);
  // alert(d.value);


}



	function sleep(ms)
	{
		var dt = new Date();
		dt.setTime(dt.getTime() + ms);
		while (new Date().getTime() < dt.getTime());
	}
	

	function disableControl()
{

   
   var c = document.getElementById ("myCanvas");
 //c.removeEventListener('mousemove',gameMouseHandler);
  c.removeAttribute("onClick");
	
  //alert("??");
}
 /*
 	function enableControl()
{

   
   var c = document.getElementById ("myCanvas");
    c.setAttribute("onClick","makeSelection();");
	
  //alert("??");
}
*/


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
       ctx.putImageData(imagedata, grid_x*gridD+i+startX, grid_y*gridD+startY);
  }
   for(i=0;i<gridD;i++)
  {
       ctx.putImageData(imagedata, grid_x*gridD+gridD-1+startX, grid_y*gridD+i+startY);
  }
   for(i=0;i<gridD;i++)
  {
       ctx.putImageData(imagedata, grid_x*gridD+gridD-1-i+startX, grid_y*gridD+gridD-1+startY);
  }
  
  for(i=0;i<gridD;i++)
  {
       ctx.putImageData(imagedata, grid_x*gridD+startX, grid_y*gridD+gridD-1-i+startY);
  }
  
   //alert("After spiral painting");
  


}
function makeSelection()
{

  GridCordNext = whichGrid();
  //alert(GridCordNext);
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

/*
function flipImage(image, ctx, flipH, flipV) {
    var scaleH = flipH ? -1 : 1, // Set horizontal scale to -1 if flip horizontal
        scaleV = flipV ? -1 : 1, // Set verical scale to -1 if flip vertical
        posX = flipH ? width * -1 : 0, // Set x position to -100% if flip horizontal
        posY = flipV ? height * -1 : 0; // Set y position to -100% if flip vertical
 
    ctx.save(); // Save the current state
    ctx.scale(scaleH, scaleV); // Set scale to flip the image
    ctx.drawImage(img, posX, posY, width, height); // draw the image
    ctx.restore(); // Restore the last saved state
};

*/


function DrawContinue(status){

   if(validity == false)
     return;
	switch(status)
	{
	case 1: //nothing

	contSlot.src = "images/contbutt.png";
	break;
	case 2: //mouseover
	contSlot.src = "images/contbutt_over.png";
	break;
	case 3:
	contSlot.src = "images/contbutt_pressed.png";
	break;
	default:
	contSlot.src = "images/contbutt.png";

    
	}
	/*
	contSlot.onload = function()
	{
			var c = document.getElementById("myCanvas");
   //alert(c);
		var ctx=c.getContext("2d");
      //  alert("Hello");
    //  alert(this);
    var cheight = c.height;
	var cwidth = c.width;
		var nWidth = this.naturalWidth;
		var nHeight = this.naturalHeight;
		var WnHeight = WelcomeSlot.naturalHeight;
		var WnWidth = WelcomeSlot.naturalWidth;

		//ctx.scale(-1, 1);
	//	ctx.translate(width, 0);
	//flipImage(image, ctx, 1, flipV);
	
	
   //   ctx.drawImage(this, parseInt((cwidth-nWidth)/2-nWidth), parseInt((cheight-nHeight)/2+WnHeight/2-nHeight*2));
	

	
	
	}*/
	
	
}


function DrawWelcome()
{

	WelcomeSlot = new Image();
	WelcomeSlot.src = "images/welcome.jpg";
	WelcomeSlot.onload = function()
	{
		
	var c = document.getElementById("myCanvas");
   //alert(c);
		var ctx=c.getContext("2d");
      //  alert("Hello");
    //  alert(this);
    var cheight = c.height;
	var cwidth = c.width;
    init_X = 	(cwidth-this.naturalWidth)/2;
	init_Y = (cheight-this.naturalHeight)/2


		//ctx.scale(-1, 1);
	//	ctx.translate(width, 0);
	//flipImage(image, ctx, 1, flipV);
      ctx.drawImage(this, parseInt(init_X), parseInt(init_Y), this.naturalWidth, this.naturalHeight);
				var nWidth = contSlot.naturalWidth;
		var nHeight = contSlot.naturalHeight;
			var WnHeight = WelcomeSlot.naturalHeight;
		var WnWidth = WelcomeSlot.naturalWidth;
	  ctx.drawImage(contSlot, parseInt((cwidth-nWidth)/2-nWidth), parseInt((cheight-nHeight)/2+WnHeight/2-nHeight*2));
	c.addEventListener('mousedown',contDownHandler, false);
	c.addEventListener('mouseup', contUpHanlder, false);
	c.addEventListener('mousemove', contMoveHandler, false);
	
	
	};


}



function LoadAds()
{
   for(var i=0;i<4;i++)
   {

		ADpool[i] = new Image();	
		ADpool[i].src = "images/dustbin"+(i+1).toString()+".png";
		
			//alert(ADpool[i].src);
		//	ADpool[i].onload = function (){
			
		//	alert("EVA");
		
//	};
		
		//ADpool[i].src = ADpool[i].src;
		
	
	}

}



function ClearWhite()
{
    uplock = false;
	validity = false;
    var c = document.getElementById("myCanvas");
   //alert(c);
      var ctx =c.getContext("2d");
	 ctx.clearRect ( 0, 0, c.width, c.height);


}
function drawPicasso(){
     var c = document.getElementById("myCanvas");
   //alert(c);
      var ctx=c.getContext("2d");
  //alert(ctx);
  ImagePool = new Array(dimension);
  
  for(var i = 0;i<dimension;i++)
   {
    ImagePool[i] = new Array(dimension);
    
    for(var j = 0;j<dimension;j++){
	
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
    


      ctx.drawImage(this,this.j*gridD+startX,this.i*gridD+startY, gridD, gridD);
      if(this.i==0&&this.j==0)
	{


		 imagedata = ctx.getImageData(startX, startY, 1, 1); 
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

function WithinOfficialStartArea()
{
if(contEnabled == false)
		return false;
	if(contSlot == "undefined")
		return false;
	var c = document.getElementById("myCanvas");
   //alert(c);
		var ctx=c.getContext("2d");
		
	var cheight = c.height;
	var cwidth = c.width;
		var nWidth = contSlot.naturalWidth;
		var nHeight = contSlot.naturalHeight;
			var WnHeight = WelcomeSlot.naturalHeight;
		var WnWidth = WelcomeSlot.naturalWidth;
    var smallX = parseInt(init_X)+30;
	var smallY = parseInt((cheight-nHeight)/2+WnHeight/2-nHeight*2)+40;
   if(mousePos.x < smallX || mousePos.y<smallY||mousePos.x>=smallX+contSlot.naturalWidth||mousePos.y>=smallY+contSlot.naturalHeight)
   {
	//out of the area
		return false;
   
   }
   return true;
 


}
function WithinStartArea()
{
	if(contEnabled == false)
		return false;
	if(contSlot == "undefined")
		return false;
	var c = document.getElementById("myCanvas");
   //alert(c);
		var ctx=c.getContext("2d");
		
	var cheight = c.height;
	var cwidth = c.width;
		var nWidth = contSlot.naturalWidth;
		var nHeight = contSlot.naturalHeight;
			var WnHeight = WelcomeSlot.naturalHeight;
		var WnWidth = WelcomeSlot.naturalWidth;
    var smallX = parseInt(init_X)+30;
	var smallY = parseInt((cheight-nHeight)/2+WnHeight/2-nHeight*2)+10;
   if(mousePos.x < smallX || mousePos.y<smallY||mousePos.x>=smallX+contSlot.naturalWidth||mousePos.y>=smallY+contSlot.naturalHeight)
   {
	//out of the area
		return false;
   
   }
   
   
   
   return true;
 

}

function WithInContinueArea()
{
	if(contEnabled == false)
		return false;

	if(contSlot == "undefined")
		return false;
	var c = document.getElementById("myCanvas");
   //alert(c);
		var ctx=c.getContext("2d");
		
	
      //  alert("Hello");
    //  alert(this);
    var cheight = c.height;
	var cwidth = c.width;
    var smallX = parseInt((cwidth-contSlot.naturalWidth)/2-contSlot.naturalWidth);
	var smallY = parseInt((cheight-contSlot.naturalHeight)/2+WelcomeSlot.naturalHeight/2-contSlot.naturalHeight*2);
   if(mousePos.x < smallX || mousePos.y<smallY||mousePos.x>=smallX+contSlot.naturalWidth||mousePos.y>=smallY+contSlot.naturalHeight)
   {
	//out of the area
		return false;
   
   }
   
   
   
   return true;
 
 //ctx.drawImage(this, parseInt((cwidth-this.naturalWidth)/2-this.naturalWidth), parseInt((cheight-this.naturalHeight)/2+WelcomeSlot.naturalHeight/2-this.naturalHeight*2), this.naturalWidth, this.naturalHeight);
	


}

gameMouseHandler = function(evt) {

		var c = document.getElementById("myCanvas");
		var context = c.getContext('2d');
           mousePos = getMousePos(c, evt);
		   
		
          //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
         // writeMessage(c, message);
        }

		function drawADSpecific(adnum, X,  Y)
		{
		
		
			//var img = new Image();
			
		//	ADpool[adnum-1].src = "images/ad"+adnum+".jpg";
		//	alert(img.src);
			
			
				var c = document.getElementById("myCanvas");
				var ctx = c.getContext("2d");
				
				//alert(adnum-1);
				ctx.drawImage(ADpool[adnum-1], X, Y);
			
			
			
		
		
		
		}
		
		
		function drawRespectiveAD(offin)
		{
		if(offin == 0)
			return;
		
		
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		var x_left = parseInt(((c.width-gridD*dimension)/2 - ADwidth)/2);
		var x_right = parseInt(x_left + (c.width-(c.width-gridD*dimension)/2));
		var y_top = parseInt((c.height-gridD*dimension)/2);
		var y_bot = y_top+gridD*dimension;
		//var y_left = 0;
		//var y_right = 0;
		
		
		//define 0 left, 1 right
		var ad1side = parseInt((Math.random()*1000)) % 2;
		//alert(ad1side);
	
		var y_left = parseInt(Math.random()*1000 % (y_bot-ADheight));
		var y_right = parseInt(Math.random()*1000 % (y_bot-ADheight));
		
		if(y_left<y_top)
		{
		
			y_left += y_top;
		
		}
		
		if(y_right < y_top)
		{
			y_right += y_top;
		
		
		}
		
	//	alert(x_left+","+y_left+")");
	//	alert(x_right+","+y_right);
		
		   switch(offin)
		   {
		   
			case 0: 
				//no ad, drawing nothing
				
				break;
		   
			case 50:
			
			  if(ad1side == 0){
				drawADSpecific(1, x_left,  y_left);
				drawADSpecific(3, x_right, y_right);
				}
			 else{
				drawADSpecific(3, x_left,  y_left);
				drawADSpecific(1, x_right, y_right);
			 }
			 
			 
			 
				
				//evaluation + amouflague
				
				
				
				
				break;
				
			case 30:
				  if(ad1side == 0){
				drawADSpecific(1, x_left,  y_left);
				drawADSpecific(4, x_right, y_right);
				
				
				
				}
			 else{
				drawADSpecific(4, x_left,  y_left);
				drawADSpecific(1, x_right, y_right);
			 }
			 
				break;
				
			case 500:
				  if(ad1side == 0){
				drawADSpecific(2, x_left,  y_left);
				drawADSpecific(3, x_right, y_right);
				
				
				
				}
			 else{
				drawADSpecific(3, x_left,  y_left);
				drawADSpecific(2, x_right, y_right);
			 }
			 
				break;
				
				
			case 300: 
				  if(ad1side == 0){
				drawADSpecific(2, x_left,  y_left);
				drawADSpecific(4, x_right, y_right);
				
				
				
				}
			 else{
				drawADSpecific(4, x_left,  y_left);
				drawADSpecific(2, x_right, y_right);
			 }
			 
				break;
				
				
			default:
				//default no ad
				break;
		   
		   
		   
		   
		   
		   
		   }
		
		
		}
		
		
function onloadHelper(event)
{
 
 
	
  var c = document.getElementById("myCanvas");
	var context = c.getContext('2d');
   score = 0;
      var s = document.getElementById("score");
   s.value = score;
  // pairs = 0;
   GridCordPrev = "undefined";
   GridCordNext = "undefined";
	halted = "false";
   mousePos="undefined";
   //updateScoreTest();

   if(hardness==2)
	args = 2;
//do{


   if(loopCount>2)
   {
	 var havead = document.getElementById("HaveAd");
	 if(ADPlacements[loopCount-2-1]>0)
	{
		havead.value = ADPlacements[loopCount-2-1];
	}
	else{
		havead.value = "0";
	
	}
   
   
   }
    
	
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
   p.value = Math.round(score/(score+pairs));
   
   if(hardness==0)
   {
   display = document.getElementById("Clock");
   display.value = "12.000";
   }
   setCountDown();
   intervalHandler = setInterval(function(){StartCountDownThreadForCoolDown();}, 0);
  
	/*	c.setAttribute('onClick', 'makeSelection();');
		    return;*/
			c.addEventListener('mousemove', gameMouseHandler, false);



}
/*
   function animate(lastTime, startTime, endTime, objectGrid, subjectGrid, dx, dy, flag, callback) {
	halted = "true";
	 var date = new Date();
        var time = date.getTime();
       // var timeDiff = time - lastTime;
	if(time>endTime){
	
		if(flag==1)
		{
		//console.log(picasso[subjectGrid.y][subjectGrid.x]);
		//console.log("x: "+subjectGrid.x);
		shadowMatrix[picasso[subjectGrid.y][subjectGrid.x]].shadowHer(subjectGrid.x, subjectGrid.y);
		}
		else{
		
		emptyShadower.shadowHer(subjectGrid.x, subjectGrid.y);
		}
		if(callback==1)
		{
		
			//alert("entered callback");
			 picasso[subjectGrid.y][subjectGrid.x]= -1;
			 picasso[GridLast.y][GridLast.x] = -1;
		    GridLast = "undefined";
			  
		}
		
		else if(callback==2)
		{
			flipBack(subjectGrid);
			  flipBack(GridLast);  
			  GridLast = "undefined"; halted = "false"; 
		
		}
		
		halted = "false";
          return;
	}
	lastTime = time;
        var duration = endTime-startTime;
	var offset = 80/(1000 / 60);
	//console.log(offset);
        if(endTime-lastTime>duration/2){


		dx-=offset*2;
		if(dx<0)
			dx = 0;
		
		//old disappear flip
		blankShadower.shadowHer(subjectGrid.x, subjectGrid.y);
		//objectGrid.shadowHerDetail(subjectGrid.x, subjectGrid.y, dx, dy);
		
		if(flag==1){
		emptyShadower.shadowHerDetail(subjectGrid.x, subjectGrid.y, dx, dy, (gridD-dx)/2, 0);
		}
		else{
		//console.log(picasso[subjectGrid.y][subjectGrid.x]);
		//alert(subjectGrid);
		
		shadowMatrix[picasso[subjectGrid.y][subjectGrid.x]].shadowHerDetail(subjectGrid.x, subjectGrid.y, dx, dy, (gridD-dx)/2, 0);
		
		}
	}
	else{      
	dx+=offset*2;
	if(dx>gridD)
		dx = gridD;
		//new appearance flip  
		
	if(flag==1){	
	objectGrid.shadowHerDetail(subjectGrid.x, subjectGrid.y, dx, dy, (gridD-dx)/2,0);
	}
	
	else {
	   emptyShadower.shadowHerDetail(subjectGrid.x, subjectGrid.y, dx, dy,(gridD-dx)/2,0);
	
	}
	
	
	}


  	requestAnimFrame(function() {
          animate(lastTime, startTime, endTime, objectGrid, subjectGrid, dx, dy, flag, callback);
        });
   
      }

 window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        window.oRequestAnimationFrame || 
        window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();

	  */
contMoveHandler =
function(evt) {
	if(validity == false)
		return;
			 var c = document.getElementById("myCanvas");
           mousePos = getMousePos(c, evt);
		   if(WithInContinueArea()==true){
			
				//mouseover event
				//alert("gotcha");
				if(uplock==true)
			DrawContinue(2);
			
			}
			else{
			uplock = true;
			DrawContinue(1);
				
			}
		
          //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
         // writeMessage(c, message);
        };
 function StartScreen(){
    validity = true;
    WelcomeSlot = new Image();
	contSlot.src = "images/start.jpg";
	WelcomeSlot.src = "images/start_prac.jpg";
	WelcomeSlot.onload = function()
	{
		
	var c = document.getElementById("myCanvas");
   //alert(c);
		var ctx=c.getContext("2d");
      //  alert("Hello");
    //  alert(this);
    var cheight = c.height;
	var cwidth = c.width;
	


		//ctx.scale(-1, 1);
	//	ctx.translate(width, 0);
	//flipImage(image, ctx, 1, flipV);
      ctx.drawImage(this, parseInt(init_X), parseInt(init_Y), this.naturalWidth, this.naturalHeight);
				var nWidth = contSlot.naturalWidth;
		var nHeight = contSlot.naturalHeight;
			var WnHeight = WelcomeSlot.naturalHeight;
		var WnWidth = WelcomeSlot.naturalWidth;
	  ctx.drawImage(contSlot, parseInt(init_X)+30, parseInt((cheight-nHeight)/2+WnHeight/2-nHeight*2)+10);
	//c.addEventListener('mousedown',startDownHandler, false);
	
	c.addEventListener('mouseup', startUpHanlder, false);
	//c.addEventListener('mousemove', startMoveHandler, false);
	
	
	};


 }
contDownHandler = function(evt) {
	if(validity == false)
		return;
       //    mousePos = getMousePos(c, evt);
		   if(WithInContinueArea()==true){
			uplock=false;
				//mouseover event
				//alert("gotcha");
			DrawContinue(3);
			
			}
			else{
			
				
			}
		
          //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
         // writeMessage(c, message);
        };
		
		OfficialStartUpHanlder = function (evt) {
		
		 //alert("startup entered");
			

			
			
			if(validity == false)
				return;
				
				
				 var c = document.getElementById("myCanvas");
				 mousePos = getMousePos(c, evt);
		if(WithinOfficialStartArea() == true)
		{ 
		   
			
			
		//	c.removeEventListener('mousemove',contMoveHandler);
			//c.removeEventListener('mousedown',contDownHandler);
		
			c.removeEventListener('mouseup',OfficialStartUpHanlder);
			//var context = c.getContext('2d');
			ClearWhite();
			TimeLimit = 1000;
		//	  alert("detected");
			onloadHelper(evt);
		
		
		}
	
		
		
		};
		startUpHanlder = function(evt){
		
		  //alert("startup entered");
			
			if(validity == false)
				return;
				
				
				 var c = document.getElementById("myCanvas");
				 mousePos = getMousePos(c, evt);
		if(WithinStartArea() == true)
		{ 
		   
			
			
		//	c.removeEventListener('mousemove',contMoveHandler);
			//c.removeEventListener('mousedown',contDownHandler);
		
			c.removeEventListener('mouseup',startUpHanlder);
			//var context = c.getContext('2d');
			ClearWhite();
		//	  alert("detected");
			onloadHelper(evt);
		
		
		}
	
		
		
		};

		contUpHanlder = function(evt) {
			if(validity == false)
				return;
        //   mousePos = getMousePos(c, evt);
		   if(WithInContinueArea()==true){
			
				//mouseover event
				//alert("gotcha");
				uplock = true;
			//DrawContinue(1);
		    validity = false;
			 var c = document.getElementById("myCanvas");
			 c.removeEventListener('mousemove',contMoveHandler);
			c.removeEventListener('mousedown',contDownHandler);
			c.removeEventListener('mouseup',contUpHanlder);
			 	var context = c.getContext('2d');
		  ClearWhite();
		  StartScreen();
			//c.width=c.width;
			
			
			
			}
			else{
			
				
			}
		
          //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
         // writeMessage(c, message);
        };
		
		function get_assigned()
		{
		   var frm = $('#contactForm2');
		   $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            success: function (data) {
		//	alert("mark assigned");
		
			//alert(data);
           
			  var c = document.getElementById('subnum');
				c.value = 'Your survey number is '+ data;
            }
        });
		
		}
		
	  function send_data()
	  {
		//	alert("entered");
			var frm = $('#contactForm1');
			//alert(frm.attr('method'));
			$.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            success: function (data) {
          //      alert('ok');
            }
        });

	  }
window.onload = function()
{

    get_assigned();
	//$('.mywidgets').hide();
    LoadAds();
	//send_data();
    ADPlacements = new Array(30);
	for(var i = 0;i<30;i++)
	{
	   	ADPlacements[i] = 0;
	}
	
	for(var i=0;i<20;i++)
	{
		ADPlacements[i] = 1;
	
	
	}
	
	for(var i=0;i<20;i++)
	{
	   if(i<10)
		 ADPlacements[i] *= 10;
		else
		 ADPlacements[i] *= 100;
	
	}
	
	for(var i=0;i<20;i++)
	{
	    if(i<5 || (i>=10 && i<=14))
			ADPlacements[i]*= 5;
	
	    else {
			ADPlacements[i] *= 3;
		
		}
	
	}
	
	
	
	for(var i=0;i<30;i++)
	{
	    swapindex1 = parseInt(Math.random()*100)%30;
//		alert(swapindex1);
		swapindex2 = parseInt(Math.random()*100)%30;
	//	alert(swapindex2);
	
	    if(ADPlacements[swapindex1]!=ADPlacements[swapindex2])
		{
		    ADPlacements[swapindex1] = ADPlacements[swapindex1]^ADPlacements[swapindex2];
			 ADPlacements[swapindex2] = ADPlacements[swapindex1]^ADPlacements[swapindex2];
			  ADPlacements[swapindex1] = ADPlacements[swapindex1]^ADPlacements[swapindex2];
		
		}
	
	}
	
	
	//alert(ADPlacements);

	contSlot = new Image();
	DrawWelcome();
	DrawContinue(1);

	
	
		
		
};
