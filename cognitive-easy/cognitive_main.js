var mousePos="undefined";
var loopCount = 0;
//var GridCurrent = "undefined";
var GridLast = "undefined";
var halted = "false";
var ADwidth = 160;
var ADheight = 120;
var bgLoaded = false;
var validity = true;
var ADPlacements;
var startX = 328;
var init_X;
var init_Y;
var contEnabled = true;
var uplock = true;
var ADpool;
var contSlot;
var WelcomeSlot;
var startY = 62;

var dimension = 4;
var gridD = 80;
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
if(hardness == 1){
 symbolNum = 8;
// eachGroup = dimension*dimension/symbolNum;
 }
//var visible;
//var ImagePool;
var eachGroup = dimension*dimension/symbolNum;
//var fillCounter = new Array(symbolNum);
//for(flag = 0;flag<symbolNum;flag++)
 //  fillCounter[flag] = eachGroup;


function getMousePos(canvas, evt) {

    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
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
		TimeLimit = 500;
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
for(var i = 0;i<len;i+=4){


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

shadowMatrix = new Array(symbolNum);

for(var i=1;i<=symbolNum;i++){
	shadowMatrix[i] = new Image();
	shadowMatrix[i].src = "box"+i+".jpg";  //alert(img);
	shadowMatrix[i].shadowHer = function(x, y)
	{
		var c = document.getElementById("myCanvas");
		var context =  c.getContext('2d');
		context.drawImage(this, x*gridD+startX, y*gridD+startY, gridD, gridD);
	};
	
	shadowMatrix[i].shadowHerDetail = function(x, y, dx, dy, xoffset, yoffset)
	{
		var c = document.getElementById("myCanvas");
		var context =  c.getContext('2d');
		context.drawImage(this, x*gridD+startX+xoffset, y*gridD+startY+yoffset, dx, dy);
	};

	
}


emptyShadower = new Image();
emptyShadower.src = "null.jpg";
emptyShadower.shadowHer =function(x,y)
{
		var c = document.getElementById("myCanvas");
		var context =  c.getContext('2d');
		context.drawImage(this, x*gridD+startX, y*gridD+startY, gridD, gridD);

};
emptyShadower.shadowHerDetail = function(x, y, dx, dy,xoffset, yoffset)
	{
		var c = document.getElementById("myCanvas");
		var context =  c.getContext('2d');
		context.drawImage(this, x*gridD+startX+xoffset, y*gridD+startY+yoffset, dx, dy);
	};

blankShadower = new Image();
blankShadower.src = "blank.jpg";
blankShadower.shadowHer = function (x,y)
{
	var c = document.getElementById("myCanvas");
	var context = c.getContext('2d');
	context.drawImage(this, x*gridD+startX, y*gridD+startY, gridD, gridD);


}
	
	
}

function enlightPicasso()
{
    picasso = new Array(dimension);
	//visible = new Array(dimension);
	
	var i = 0;
	var j = 0;
	//  var tank = 0;
	 
    for(var i = 0;i<dimension;i++)
   {
   
    picasso[i] = new Array(dimension);
	//visible[i] = new Array(dimension);
    for(var j=0;j<dimension;j++){
	
     picasso[i][j] = -1;
	// visible[i][j] = -1;
	 }
   }
   
   
   for(var i=0; i<symbolNum;i++)
	{
	   // i indicates the symbol
		for(var j=0;j<eachGroup;j++)
		{
		    //j indicates the num of the symbol tha that hasn't been assigned
			  var dx = Math.floor(Math.random()*dimension);
			  var dy = Math.floor(Math.random()*dimension);
			
			if(picasso[dx][dy] == -1)
			{
			    picasso[dx][dy] = i+1;
			
			}
			
			else{
			
			   j--;
			
			}
			
		
		
		}
	
	
	}
   
   
   /*
 if(hardness==0)
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
 */
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
   


   var c = document.getElementById("score");
   var d = document.getElementById("discoveryPercent");
  // var e = document.getElementById("totalPairs");
 //  pairs = countGaps(args);
  // e.value = pairs;
   c.value = score;
   d.value = Math.round((score/((dimension*dimension)/2))*100)+"%";
   


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



function makeSelection()
{

  // console.log('Entering make Selection()...');
   if(halted=="true")
      return;

    var greeting = whichGrid();
    if(greeting=="undefined")
		return;
	if(GridLast=="undefined"){
		//console.log('Clear State...');
		if(picasso[greeting.y][greeting.x] != -1){
		  GridLast = greeting;
		
	
		
		  flip(400, shadowMatrix[picasso[greeting.y][greeting.x]], greeting, 1,0);
		 //emptyShadower.shadowHer(greeting.x, greeting.y);
	
		
		}
	}
	
	else{
	
		//console.log('Dirty State...');
		//alert(GridLast);
		if(picasso[greeting.y][greeting.x] != -1)
		{
		
		//   console.log('Dirty State: NOT displayed already...');
		   
		   if(greeting.x==GridLast.x &&greeting.y==GridLast.y)
		   {
		       return;
		   
		   }
		   
		   else if(picasso[greeting.y][greeting.x]==picasso[GridLast.y][GridLast.x])
			{
			
			//console.log('Dirty State: two same symbols...');
			flip(400, shadowMatrix[picasso[greeting.y][greeting.x]], greeting, 1, 1);
			// shadowMatrix[picasso[greeting.y][greeting.x]].shadowHer(greeting.x, greeting.y);
			 score++;
	  
			updateScoreTest();
			
			
			
			 
			 
			 
			}
			
			else{
		//	   alert(GridLast);
			//    console.log('Dirty State: two diff symbols, clean it...');
			     halted = "true";
			   flip(400, shadowMatrix[picasso[greeting.y][greeting.x]], greeting, 1, 2);
			
			//	alert(23);
				
				
				
				//alert(24);
				
			  
			  //alert(25);
			  
			
			  /*
			  var t = window.setTimeout(function(){
			},
			  500);
			  */
			 
			  
			   
			
			}
		
		
		 
		}
		
		else{
		  //console.log('Dirty State: YES Displayed already...');
		    //console.log('Dirty State: two diff symbols, clean it...');  console.log('Dirty State: two diff symbols, clean it...');
		   flipBack(GridLast);
		   GridLast = "undefined";
		}
		

		
		
	
	
	}
	
	
	
	

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
 
   ADpool = new Array(4);
	//loadedImages = 0;
   //ADpool = new Array(4);
   ADpool[0] = new Image();	
   ADpool[0].src = "ad1.jpg";
   ADpool[0].onload = function (){
    alert("0 loaded");
    ADpool[1] = new Image();	
   ADpool[1].src = "ad2.jpg";
   ADpool[1].onload = function(){
   
	alert("1 loaded");
	 ADpool[2] = new Image();	
	ADpool[2].src = "ad3.jpg";
	ADpool[2].onload = function()
	{
		alert("2 loaded");
		ADpool[3] = new Image();	
		ADpool[3].src = "ad4.jpg";
		ADpool[3].onload = function (){
			alert("hey girl");
		
		};
	
	};
   
   };
   
   };
   
 
   
   
   /*
   for(var i=0;i<4;i++)
   {

		ADpool[i] = new Image();	
		ADpool[i].src = "ad"+(i+1).toString()+".jpg";
		
			//alert(ADpool[i].src);
			ADpool[i].onload = function (){
			
			alert("EVA");
		
		};
		
		//ADpool[i].src = ADpool[i].src;
		
	
	}
	
	*/
	

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
    
    for(var j=0;j<dimension;j++){
	
	ImagePool[i][j] = new Image();
	//if(visible[i][j]==-1){
	ImagePool[i][j].src = "null.jpg";  //alert(img);
	ImagePool[i][j].i = i;
	ImagePool[i][j].j = j;
	
	
	/*else{
	ImagePool[i][j].src = "box"+picasso[i][j]+".jpg";  //alert(img);
	ImagePool[i][j].i = i;
	ImagePool[i][j].j = j;
	}*/
    ImagePool[i][j].onload = function(){
        
      var c = document.getElementById("myCanvas");
   //alert(c);
      var ctx=c.getContext("2d");
      //  alert("Hello");
    //  alert(this);
    


		//ctx.scale(-1, 1);
	//	ctx.translate(width, 0);
	//flipImage(image, ctx, 1, flipV);
      ctx.drawImage(this,this.j*gridD+startX,this.i*gridD+startY, gridD, gridD);
	  //ctx.scale(-1, 1);
	//  ctx.scale(-1, 1);
     /* if(this.i==0&&this.j==0)
	{

		
		 imagedata = ctx.getImageData(0, 0, 1, 1); 
		 
	}    
	*/

    };

	 
	 
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
 //$('.mywidgets').hide();
 
	
 
   score = 0;
   GridLast = "undefined";
	halted = "false";
   mousePos="undefined";
   updateScoreTest();
   var c = document.getElementById("myCanvas");
	var context = c.getContext('2d');


    
	
     enlightPicasso();
	 shadowPreload();
	// DrawAd();
	 drawPicasso();
	
	 
	  TimeLimit = 1000;
	  setCountDown();
	 
      intervalHandler = setInterval(function(){StartCountDownThreadForCoolDown();}, 0);
	 
	c.addEventListener('mousemove', gameMouseHandler, false);

	/*	c.setAttribute('onClick', 'makeSelection();');
		    return;*/
		



}

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
        }
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
        }
		
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
	
		
		
		}
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
	
		
		
		}

		contUpHanlder = function(evt) {
			if(validity == false)
				return;
        //   mousePos = getMousePos(c, evt);
		   if(WithInContinueArea()==true){
			
				//mouseover event
				//alert("gotcha");
				uplock=true;
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
        }
	  
window.onload = function()
{


    LoadAds();
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
	
	
	alert(ADPlacements);

	contSlot = new Image();
	DrawWelcome();
	DrawContinue(1);


	
		
		
};
