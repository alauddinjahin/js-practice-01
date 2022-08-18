const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const colorFields = document.querySelectorAll('.color-field');
const clearBtn = document.querySelector(".clear-btn");
const undoBtn = document.querySelector(".undo-btn");


let window_height = window.innerHeight;
let window_width  = window.innerWidth;

canvas.width = window_width - 60;
canvas.height= window_height - 200;

let initBgColor= "white";
context.fillStyle=initBgColor;
context.fillRect(0,0,canvas.width, canvas.height);


// init setup done

let drawColor = "black";
let drawWidth = 2;
let isDrawing = false;

let index = -1;
let restoreArr = [];

// register eventlisteners 

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);


canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

colorFields.forEach(colorField => {
    colorField.addEventListener("click", ()=>{
        drawColor = colorField.style.backgroundColor;
    })
})


clearBtn.addEventListener("click", clearCanvas);
undoBtn.addEventListener("click", undoLast);



// init or write function here
function start(event){
 isDrawing = true;
 context.beginPath();
 context.moveTo(
    event.clientX - canvas.offsetLeft, 
    event.clientY - canvas.offsetTop
    );

 event.preventDefault();

}


function draw(event){
 if(isDrawing){
    context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
    context.strokeStyle= drawColor;
    context.lineWidth = drawWidth;
    context.lineCap="round";
    context.lineJoin="round";
    context.stroke()
    event.preventDefault();

 }
}

function stop(event){
    if(isDrawing){
        context.stroke()
        context.closePath();
        isDrawing = false;
    }

    event.preventDefault();

    if(event.type !== "mouseout"){
        restoreArr.push(context.getImageData(0,0, canvas.width, canvas.height));
        index += 1;
    }

}


function clearCanvas() {
    context.clearRect(0,0, canvas.width, canvas.height)
    context.fillStyle = initBgColor;
    context.fillRect(0,0, canvas.width, canvas.height)

    restoreArr =[];
    index = -1;
}


function undoLast() {

    if(index <= 0){
        clearCanvas();
        return false;
    }

    index -= 1;
    restoreArr.pop();
    context.putImageData(restoreArr[index], 0, 0);
}