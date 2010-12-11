/* One day I will invent Fire :) 
Franck Nouyrigat (@peignoir)*/
 
var canvas;  
var ctx;



Array.matrix = function(m,n, initial) { 
	var a, i, j, mat =[];
	for (i = 0; i < m; i += 1) { 
		a = [];
		for (j =0; j < n; j += 1) {
			a[j] = initial; 
		}
		mat [i] = a;
		}	
		return mat;
	}

var Buffer1 = Array.matrix(1024, 768, 0);
var Buffer2 = Array.matrix(1024, 768, 0);


function fire() {

	

imageData = ctx.createImageData(width, height);


for (x = 1; x < ( width - 1); x++){	 
	foo = Math.random() * 160;
	Buffer1[x][(height - 2)] = Buffer1[x][(height - 1)] = Buffer1[x - 1][(height - 2)] = Buffer1[x - 1][(height - 1)] = foo; 
	 
	}
	
for (x = 1; x < (width - 1); x+=1){
	//Buffer1[x][(height - 2)] = Math.random() * 250; 
	//Buffer1[x][(height - 1)] = Math.random() * 250;
	for (y = 1; y < (height - 1); y+=1)
	  {		
		if(!Buffer1[x +1]) {Buffer1[x + 1] = 0;}
		if(x>1&&x<(width-2)){Buffer2[x][y-1] = (Buffer1[x - 1][y] + Buffer1[x + 1][y] + Buffer1[x][y + 1] + Buffer1[x][y - 1]) / 4 - 1;}
		else Buffer2[x][y-1] = (Buffer1[x][y]+ Buffer1[x][y+1])/2 -4;
		setPixel(imageData, x, y, 0,  Buffer2[x][y], 0, 0xff); // r, g, b, a
			}
	  	}

/*for (x = 0; x < width; x++){
    for (y = 1; y < height; y++)
		  {
		setPixel(imageData, x, y, 0,  Buffer2[x][y], 0, 0xff); // r, g, b, a
		  }
		}
*/
 ctx.putImageData(imageData, 0, 0);
 
 for (x = 0; x < width; x++){  
	for (y = 1; y < height; y++)
	  {		
	    Buffer1[x][y] = Buffer2[x][y];
	  }
	}
}



function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

/*function setPalette(r,g,b){
	for (i=0; i<255; i++){
		Color[i][red] = 0
		Color[i][green] = 
		
	}
	
	
}*/


function draw2(){
width = parseInt(element.getAttribute("width"));
height = parseInt(element.getAttribute("height"));
imageData = ctx.createImageData(width, height);
for (i = 0; i < width * height; i++) {
	r = parseInt(Math.random() * 256);
    g = parseInt(Math.random() * 256);
    b = parseInt(Math.random() * 256);
	imageData.data[i+0] = 200;
	imageData.data[i+1] = 200;
	imageData.data[i+2] = 200;
	imageData.data[i+3] = 0xff;
	
    }    
}


function draw(){

// read the width and height of the canvas
width = parseInt(element.getAttribute("width"));
height = parseInt(element.getAttribute("height"));
// create a new pixel array
imageData = ctx.createImageData(width, height);

// draw random dots
for (i = 0; i < width; i++) {
    x = i;
	for (j = 60; j < height; j++) {	
	y = j;
	r = parseInt(Math.random() * 256);
    g = parseInt(Math.random() * 256);
    b = parseInt(Math.random() * 256);
    setPixel(imageData, x, y, r, g, b, 0xff); // 0xff opaque 
	setPixel(imageData, x, y-1*i, r, g, b, 0xff); // 0xff opaque
	}
}

// copy the image data back onto the canvas
ctx.putImageData(imageData, 0, 0); // at coords 0,0

}

function clear() {
  ctx.clearRect(0, 0, width, height);
}

/* lets the magic begins */ 
function init() {
  element = document.getElementById("canvas");
  ctx = element.getContext("2d");
  width = parseInt(element.getAttribute("width"));
  height = parseInt(element.getAttribute("height"));
  //Buffer1 = Array.matrix(width, 200, 0);
  //Buffer2 = Array.matrix(height, 200, 0);
  return setInterval(fire, 1);

}

