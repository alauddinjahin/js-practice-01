const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height= window.innerHeight;


context.fillStyle = "white";
context.fillRect(0, 0, window.innerWidth, window.innerHeight)

context.fillStyle = "red";
context.font = "bold 30px verdana, sans-serif";
context.textAlign = "center";
context.fillText('Hello world', canvas.width / 2, 100);


let canvasStack = new CanvasStack('canvas');
let layer1 = canvasStack.createLayer();
let layer1Ctx = document.getElementById(layer1).getContext("2d");

// use layer1 context 
layer1Ctx.fillRect(20, 20, 200, 200);

layer1Ctx.fillStyle = "white";
layer1Ctx.font = "bold 24px verdana, sans-serif";
layer1Ctx.textAlign = "center";
layer1Ctx.fillText('Before', 100, 100);
layer1Ctx.save();

let layer2 = canvasStack.createLayer();
let layer2Ctx = document.getElementById(layer2).getContext("2d");





// use layer2 context 

layer2Ctx.fillStyle = "red";
layer2Ctx.fillRect(230,20, 200, 200);
layer2Ctx.fillStyle = "white";
layer2Ctx.font = "bold 24px verdana, sans-serif";
layer2Ctx.textAlign = "center";
layer2Ctx.fillText('After', 300, 100);


function putImageAsData(){
    let image1 = layer1Ctx.getImageData(20, 20, 200, 200)
    let image2 = layer2Ctx.getImageData(230,20, 200, 200)

    context.putImageData(image1, 20, 20);
    context.putImageData(image2, 230, 20);
}

// console.log(image2,'image1');

// var destinationImage = new Image;
// destinationImage.onload = function(){

//     // context.clearRect(0,0, canvas.width, canvas.height)
//   let image1 = layer1Ctx.getImageData(0,0, canvas.width, canvas.height)
//   let image2 = layer2Ctx.getImageData(0,0, canvas.width, canvas.height)

//   console.log(image1,'image1');
//   context.putImageData(image1, 0, 0);
//   context.putImageData(image2, 0, 0);

// //   destCanvasContext.drawImage(destinationImage,0,0);
// };

// destinationImage.src = sourceImageData;

// context.drawImage(0,0, window.width, window.height)
// context.save();


function DownloadCanvasAsImage(){
    putImageAsData();
    
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'CanvasAsImage.png');
    canvas.toBlob(function(blob) {

        console.log(blob,'blob');
      let url = URL.createObjectURL(blob);
      downloadLink.setAttribute('href', url);
      downloadLink.click();
    });
}

setTimeout(()=> DownloadCanvasAsImage(), 5000)

// setTimeout(()=> Canvas2Image.saveAsPNG(canvas, canvas.width, canvas.height), 2000)

// layer2Ctx.clearRect(201,0, 200, 200);

