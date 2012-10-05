
var picasso;
var mousePos;
var GridCordPrev = "undefined";
var GridCordNext = "undefined";
var imagedata;
var background;

function whichGrid()
{


    var my_x = mousePos.x;
	var my_y = mousePos.y;
 

     return {
      x: Math.floor(my_x/30),
      y: Math.floor(my_y/30)
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
  for(i=0;i<30;i++)
  {
  
    // alert("wtf");
       ctx.putImageData(imagedata, grid_x*30+i, grid_y*30);
  }
   for(i=0;i<30;i++)
  {
       ctx.putImageData(imagedata, grid_x*30+30-1, grid_y*30+i);
  }
   for(i=0;i<30;i++)
  {
       ctx.putImageData(imagedata, grid_x*30+30-1-i, grid_y*30+30-1);
  }
  
  for(i=0;i<30;i++)
  {
       ctx.putImageData(imagedata, grid_x*30, grid_y*30+30-1-i);
  }
  
   //alert("After spiral painting");
  


}

function makeSelection()
{
 // alert("top");
  if(GridCordPrev == "undefined")
  {
      GridCordPrev = whichGrid();
      MarkGrid(GridCordPrev.x, GridCordPrev.y);

	  }

   
   else{
   
   
  unMarkGrid(GridCordPrev.x, GridCordPrev.y);
  // allClear();
   GridCordPrev = whichGrid();
   MarkGrid(GridCordPrev.x, GridCordPrev.y);
   
   
   
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
	ctx.drawImage(img,j*30,i*30, 30, 30);
     
	 
	 
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
	ctx.drawImage(img,j*30,i*30, 30, 30);
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
//alert("123");
//background =  Color(imagedata[0], imagedata[1], imagedata[2], imagedata[3]);
 // alert("test2");


};