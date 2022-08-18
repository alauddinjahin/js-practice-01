const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');


let window_height = window.innerHeight;
let window_width  = window.innerWidth;

canvas.width = window_width;
canvas.height= window_height;

canvas.style.backgroundColor = "#bbf";


class Circle {
    constructor(x, y, r, c){
        this.xPos = x;
        this.yPos = y;
        this.radius = r;
        this.color = c;
    }


    draw(context){
        context.beginPath();
        context.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.strokeStyle = 'red';
        context.lineWidth = 5;
        context.fill();
        context.stroke();
        context.closePath();
    }

    onClickCircle(x, y){

        const distance = Math.sqrt( (x - this.xPos) * (x - this.xPos)) + ( ( y - this.yPos) * ( y - this.yPos ));
        if(distance < this.radius) {
            this.changeColor('white')
            return true;
        }

        this.changeColor('#000')
        return false;
    }

    changeColor(color){
        this.color = color;
        this.draw(context);
    }
    
}


const cirlce = new Circle(canvas.width / 2,canvas.height / 2, 50, '#000')
cirlce.draw(context)


// listener 

canvas.addEventListener("click", (event)=> {
    // get rect 
    const react = canvas.getBoundingClientRect();
    const x = event.clientX - react.left;
    const Y = event.clientY - react.top;

    cirlce.onClickCircle(x, Y);
})


