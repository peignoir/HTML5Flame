/* One day I will invent Fire :)
Franck Nouyrigat (@peignoir)*/

var canvas;
var ctx;
var width;
var height;
var Buffer1;
var Buffer2;
var mouseX = 0;
var mouseY = 0;

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
        };

function fire() {
    var imageData = ctx.createImageData(width, height);

    // add random heat at the bottom
    for (var x = 1; x < ( width - 1); x++){
        var foo = Math.random() * 160;
        Buffer1[x][(height - 2)] = Buffer1[x][(height - 1)] = foo;
    }

    // add extra heat around the mouse position
    var mx = Math.floor(mouseX);
    var my = Math.floor(mouseY);
    for (var dx = -2; dx <= 2; dx++) {
        for (var dy = -2; dy <= 2; dy++) {
            var px = mx + dx;
            var py = my + dy;
            if(px > 0 && px < width && py > 0 && py < height) {
                Buffer1[px][py] = 255;
            }
        }
    }

    for (var x = 1; x < (width - 1); x+=1){
        for (var y = 1; y < (height - 1); y+=1) {
            if(!Buffer1[x +1]) {Buffer1[x + 1] = 0;}
            if(x>1 && x < (width-2)) {
                Buffer2[x][y-1] = (Buffer1[x - 1][y] + Buffer1[x + 1][y] + Buffer1[x][y + 1] + Buffer1[x][y - 1]) / 4 - 1;
            } else {
                Buffer2[x][y-1] = (Buffer1[x][y]+ Buffer1[x][y+1])/2 -4;
            }
            var val = Buffer2[x][y];
            var r = val;
            var g = val * 0.5;
            var b = 0;
            setPixel(imageData, x, y, r, g, b, 0xff);
        }
    }
    ctx.putImageData(imageData, 0, 0);

    for (var x = 0; x < width; x++){
        for (var y = 1; y < height; y++) {
            Buffer1[x][y] = Buffer2[x][y];
        }
    }
}

function setPixel(imageData, x, y, r, g, b, a) {
    var index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

function clear() {
  ctx.clearRect(0, 0, width, height);
}

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  width = parseInt(canvas.getAttribute("width"));
  height = parseInt(canvas.getAttribute("height"));
  Buffer1 = Array.matrix(width, height, 0);
  Buffer2 = Array.matrix(width, height, 0);
  canvas.addEventListener('mousemove', function(e){
      var rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
  });
  setInterval(fire, 30);
}

