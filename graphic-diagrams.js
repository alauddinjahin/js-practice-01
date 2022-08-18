const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');


let window_height = window.innerHeight;
let window_width  = window.innerWidth;

canvas.width = window_width;
canvas.height= window_height;

canvas.style.backgroundColor = "#ddf";


const data = [
    200,
    180,
    170,
    280,
    460,
    200,
    140,
    580
];

const startPoint = 0;
const startValue = data[0] ?? 0;
const distance   = canvas.width / data.length;

context.beginPath();
context.moveTo(startPoint, startValue);
context.lineWidth = 2;
context.strokeStyle = "#f65"

data.forEach( (value, index) => {
    const newDistance = startPoint + ( distance * (index + 1));
    context.lineTo(newDistance, value)
})

context.lineTo(canvas.width, canvas.height)
context.lineTo(0, canvas.height)
context.lineTo(startPoint, startValue);

context.fillStyle = "grey"
context.fill();
context.stroke();
context.closePath();