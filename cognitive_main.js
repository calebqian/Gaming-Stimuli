var mousePos="undefined";
//var GridCurrent = "undefined";
var GridLast = "undefined";
var halted = "false";
var dimension = 4;
var gridD = 80;
var picasso;
var shadowMatrix;
//var hardness = 0;
var symbolNum = 2;
var emptyShadower;
var blankShadower;
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

function randomGenerator()
{

	
    var randomnumber=Math.floor(Math.random()*symbolNum);
    
	
	
	
    return randomnumber+1;
}

function flip(duration, objGrid, subGrid, flag)
{
//flag = 1, then flip to a number
//flag = 0, the flip back to NULL
var dt = new Date();
var time = dt.getTime();

animate(time, time, time+duration, objGrid, subGrid, gridD, gridD, flag);

}

function flipBack(obj)
{

	flip(500, "null",obj,0);
  // emptyShadower.shadowHer(xcord, ycord);


}

function shadowPreload()
{

shadowMatrix = new Array(symbolNum);

for(i=1;i<=symbolNum;i++){
	shadowMatrix[i] = new Image();
	shadowMatrix[i].src = "box"+i+".jpg";  //alert(img);
	shadowMatrix[i].shadowHer = function(x, y)
	{
		var c = document.getElementById("myCanvas");
		var context =  c.getContext('2d');
		context.drawImage(this, x*gridD, y*gridD, gridD, gridD);
	};
	
	shadowMatrix[i].shadowHerDetail = function(x, y, dx, dy)
	{
		var c = document.getElementById("myCanvas");
		var context =  c.getContext('2d');
		context.drawImage(this, x*gridD, y*gridD, dx, dy);
	};

	
}


emptyShadower = new Image();
emptyShadower.src = "null.jpg";
emptyShadower.shadowHer =function(x,y)
{
		var c = document.getElementById("myCanvas");
		var context =  c.getContext('2d');
		context.drawImage(this, x*gridD, y*gridD, gridD, gridD);

};
emptyShadower.shadowHerDetail = function(x, y, dx, dy)
	{
		var c = document.getElementById("myCanvas");
		var context =  c.getContext('2d');
		context.drawImage(this, x*gridD, y*gridD, dx, dy);
	};

blankShadower = new Image();
blankShadower.src = "blank.jpg";
blankShadower.shadowHer = function (x,y)
{
	var c = document.getElementById("myCanvas");
	var context = c.getContext('2d');
	context.drawImage(this, x*gridD, y*gridD, gridD, gridD);


}
	
	
}

function enlightPicasso()
{
    picasso = new Array(dimension);
	//visible = new Array(dimension);
	
	var i = 0;
	var j = 0;
	//  var tank = 0;
	 
    for(i = 0;i<dimension;i++)
   {
   
    picasso[i] = new Array(dimension);
	//visible[i] = new Array(dimension);
    for(j=0;j<dimension;j++){
	
     picasso[i][j] = -1;
	// visible[i][j] = -1;
	 }
   }
   
   
   for(i=0; i<symbolNum;i++)
	{
	   // i indicates the symbol
		for(j=0;j<eachGroup;j++)
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
 

     return {
      x: Math.floor(my_x/gridD),
      y: Math.floor(my_y/gridD)
    };
	


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
    c.removeAttribute("onClick");
	
  //alert("??");
}
 
 	function enableControl()
{

   
   var c = document.getElementById ("myCanvas");
    c.setAttribute("onClick","makeSelection();");
	
  //alert("??");
}



function makeSelection()
{

   console.log('Entering make Selection()...');
   if(halted=="true")
      return;

    var greeting = whichGrid();
   
	if(GridLast=="undefined"){
		console.log('Clear State...');
		if(picasso[greeting.y][greeting.x] != -1){
		  GridLast = greeting;
		
	
		
		  flip(500, shadowMatrix[picasso[greeting.y][greeting.x]], greeting, 1);
		 //emptyShadower.shadowHer(greeting.x, greeting.y);
	
		
		}
	}
	
	else{
	
		console.log('Dirty State...');
		//alert(GridLast);
		if(picasso[greeting.y][greeting.x] != -1)
		{
		
		   console.log('Dirty State: NOT displayed already...');
		   
		   if(greeting.x==GridLast.x &&greeting.y==GridLast.y)
		   {
		       return;
		   
		   }
		   
		   else if(picasso[greeting.y][greeting.x]==picasso[GridLast.y][GridLast.x])
			{
			
			console.log('Dirty State: two same symbols...');
				flip(500, shadowMatrix[picasso[greeting.y][greeting.x]], greeting, 1);
			// shadowMatrix[picasso[greeting.y][greeting.x]].shadowHer(greeting.x, greeting.y);
			
			 picasso[greeting.y][greeting.x]= -1;
			 picasso[GridLast.y][GridLast.x] = -1;
			 
			 GridLast = "undefined";
			  
			 
			}
			
			else{
		//	   alert(GridLast);
			    console.log('Dirty State: two diff symbols, clean it...');
			     halted = "true";
			   flip(500, shadowMatrix[picasso[greeting.y][greeting.x]], greeting, 1);
			
			//	alert(23);
				
				
				
				//alert(24);
				
			  
			  //alert(25);
			  
			
			  
			  var t = window.setTimeout(function(){
			  flipBack(greeting);
			  flipBack(GridLast);  
			  GridLast = "undefined"; halted = "false"; },
			  500);
			  
			 
			  
			   
			
			}
		
		
		 
		}
		
		else{
		  console.log('Dirty State: YES Displayed already...');
		    //console.log('Dirty State: two diff symbols, clean it...');  console.log('Dirty State: two diff symbols, clean it...');
		   flipBack(GridLast.x, GridLast.y);
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
      ctx.drawImage(this,this.j*gridD,this.i*gridD, gridD, gridD);
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

function onloadHelper(event)
{

   var c = document.getElementById("myCanvas");
	var context = c.getContext('2d');

     enlightPicasso();
	 shadowPreload();
	 drawPicasso();
	c.addEventListener('mousemove', function(evt) {
           mousePos = getMousePos(c, evt);
          //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
         // writeMessage(c, message);
        }, false);

		c.setAttribute('onClick', 'makeSelection();');
		    return;
		



}

   function animate(lastTime, startTime, endTime, objectGrid, subjectGrid, dx, dy, flag) {
	halted = "true";
	 var date = new Date();
        var time = date.getTime();
       // var timeDiff = time - lastTime;
	if(time>endTime){
	
		if(flag==1)
		{
		console.log(picasso[subjectGrid.y][subjectGrid.x]);
		//console.log("x: "+subjectGrid.x);
		shadowMatrix[picasso[subjectGrid.y][subjectGrid.x]].shadowHer(subjectGrid.x, subjectGrid.y);
		}
		else{
		
		emptyShadower.shadowHer(subjectGrid.x, subjectGrid.y);
		}
		halted = "false";
          return;
	}
	lastTime = time;
        var duration = endTime-startTime;
	var offset = 80/(1000 / 60);
	console.log(offset);
        if(endTime-lastTime>duration/2){


		dx-=offset*2;
		if(dx<0)
			dx = 0;
		
		//old disappear flip
		blankShadower.shadowHer(subjectGrid.x, subjectGrid.y);
		//objectGrid.shadowHerDetail(subjectGrid.x, subjectGrid.y, dx, dy);
		
		if(flag==1){
		emptyShadower.shadowHerDetail(subjectGrid.x, subjectGrid.y, dx, dy);
		}
		else{
		shadowMatrix[picasso[subjectGrid.y][subjectGrid.x]].shadowHerDetail(subjectGrid.x, subjectGrid.y, dx, dy);
		
		}
	}
	else{      
	dx+=offset*2;
	if(dx>gridD)
		dx = gridD;
		//new appearance flip  
		
	if(flag==1){	
	objectGrid.shadowHerDetail(subjectGrid.x, subjectGrid.y, dx, dy);
	}
	
	else {
	   emptyShadower.shadowHerDetail(subjectGrid.x, subjectGrid.y, dx, dy);
	
	}
	
	
	}


  	requestAnimFrame(function() {
          animate(lastTime, startTime, endTime, objectGrid, subjectGrid, dx, dy, flag);
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


window.onload = onloadHelper;
