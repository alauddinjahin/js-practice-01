const canvas = document.querySelector('#canvas');
const context= canvas.getContext("2d");

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

canvas.width = windowWidth - 10;
canvas.height = windowHeight - 10;

canvas.style.background = "#ff8";

// context.fillStyle = "green";
// context.fillRect(20, 20, 150, 100)

// context.fillStyle = "red";
// context.fillRect(40, 200, 150, 100);



// context.beginPath();
// context.arc(500, 500,50, 0, Math.PI * 2, false);
// context.fillStyle = "brown";
// context.fill()

// context.lineWidth = 25;
// context.stroke()
// context.closePath()

// context.beginPath()
// context.fillStyle = "red";
// context.rect(20, 20, 150, 100);
// context.fill();


class Rotate{
    constructor(left=0, right=0, flip=180, round=90){
        this.left = left;
        this.right = left;
        this.flip = flip;
        this.round = round;
    }

    leftRotate(){

    }

    rightRotate(){

    }

    flipRotate(){

    }

    roundRotate(){

    }
}

var hit_counter = 0;

class Circle{

    constructor(x, y, radius, speed, color, text){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.text = text;

        this.speed = speed;
        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();

        context.fillStyle = "#000";
        context.textAlign = "center";
        context.strokeText(this.text, this.x, this.y)
        // context.fillText(this.text, this.x, this.y)
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.closePath()
    }



    update() {

        this.draw(context);

        if ( (this.x + this.radius) > windowWidth ) {
            this.dx = -this.dx;
            hit_counter++;
        }
        
        if ( (this.x - this.radius) < 0 ) {
            this.dx = -this.dx;
            hit_counter++;
        }

        if ( (this.y - this.radius) < 0 ) {
            this.dy = -this.dy;
            hit_counter++;
        }

        if ( (this.y + this.radius) > windowHeight ) {
            this.dy = -this.dy;
            hit_counter++;
        }

        this.x += this.dx;
        this.y += this.dy; 
        
    }
}


const createCircle = (circle)=> {
    circle.draw(context);
}

const all_circles = [];
for (var i = 0; i < 10; i++) {

    let randX = Math.random() * windowWidth;
    let randY = Math.random() * windowHeight;

    const circle = new Circle(randX, randY, 100, 5, 'red', 'Propsoft');
    all_circles.push(circle);

    createCircle(all_circles[i])

}

let updateCircle = function() {
    requestAnimationFrame(updateCircle);
    context.clearRect(0, 0, windowWidth, windowHeight);
  
    all_circles.forEach(element => {
      element.update();
    })
  }
  
//   updateCircle();



  class ImageClass {
    constructor(pathOfImg, imgX, imgY, imgWidth, imgHeight){
        this.x = imgX;
        this.y = imgY;
        this.width = imgWidth;
        this.height = imgHeight;
        this.src = pathOfImg;
    }
  }


  function createImage(context, pathOfImg, imgX, imgY, imgWidth, imgHeight){
    
    let image = new Image();
    image.src = pathOfImg;
    image.onload = function(){
     context.drawImage(image, imgX, imgY, imgWidth, imgHeight);
    }
    
  }


  let image = new ImageClass('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png', 0, 0, canvas.width / 2, canvas.height);
  createImage(context, image.src, image.x, image.y, image.width, image.height);
  
  let image2 = new ImageClass('https://static.remove.bg/remove-bg-web/f9c9a2813e0321c04d66062f8cca92aedbefced7/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png', canvas.width / 2, 0, canvas.width / 2, canvas.height);
  createImage(context, image2.src, image2.x, image2.y, image2.width, image2.height);
  context.rotate(Math.PI * 2 /180);

  
