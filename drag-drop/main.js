const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const colorFields = document.querySelectorAll('.color-field');
const clearBtn = document.querySelector(".clear-btn");
const undoBtn = document.querySelector(".undo-btn");


let window_height = window.innerHeight;
let window_width  = window.innerWidth;

let canvasWidth = canvas.width = window_width - 12;
let canvasHeight = canvas.height= window_height - 10;


canvas.style.border = "5px solid red";


// init shapes

let shapes = [];
let currentIndex = null;
let isDragging = false;
let startX;
let startY;
let offsetX;
let offsetY;

shapes.push(
    { x: 10, y:10, width: 200, height: 200, color:'red'},
    { x: 200, y:10, width: 200, height: 200, color:'blue'},
)

// shapes.push(
//     { x: 0, y:0, width: 100, height: 100, color:'blue'},
// )

canvas.addEventListener("mousedown", mouseDown)
canvas.addEventListener("mousemove", mouseMove)
canvas.addEventListener("mouseup", mouseUp)
canvas.addEventListener("mouseout", mouseOut)


window.addEventListener("scroll", getOffset)
window.addEventListener("resize", getOffset)


function getOffset(){
    let canvasOffsets = canvas.getBoundingClientRect();
    offsetX = canvasOffsets.left;
    offsetY = canvasOffsets.top;
}

getOffset();




function mouseDown(event){
    event.preventDefault();

    startX = parseInt(event.clientX - offsetX);
    startY = parseInt(event.clientY - offsetY);

    let index = 0;
    for (const shape of shapes) {

        if(mouseInShape(startX, startY, shape)){
            currentIndex = index;
            isDragging = true;
            return;
        }

        index++;
    }

}

function mouseMove(event){

    if(!isDragging) return;

    event.preventDefault();

    let mouseX = parseInt(event.clientX - offsetX);
    let mouseY = parseInt(event.clientY - offsetY);

    let dx = mouseX - startX;
    let dy = mouseY - startY;

    let currentShape = shapes[currentIndex];

    currentShape.x +=dx;
    currentShape.y +=dy;

    drawShapes()

    startX = mouseX;
    startY = mouseY;

}


function mouseUp(event){

    if(!isDragging) return;
    
    event.preventDefault();
    isDragging = false;
}

function mouseOut(event){

    if(!isDragging) return;
    
    event.preventDefault();
    isDragging = false;
}


function mouseInShape(x,y, shape){
    let shapeLeft  = shape.x;
    let shapeRight = shape.x + shape.width;
    let shapeTop = shape.y;
    let shapeBottom = shape.y + shape.height;

    // check mouse on shape
    if(x > shapeLeft && x < shapeRight && y > shapeTop && y < shapeBottom){
        return true;
    }

    return false;
}



function drawShapes(){
    context.clearRect(0,0, canvasWidth, canvasHeight);

    for (const shape of shapes) {
        context.fillStyle = shape.color;
        context.fillRect(shape.x, shape.y, shape.width, shape.height)
    }
}

drawShapes()