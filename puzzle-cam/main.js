let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let video = null;
let scale = 0.8;
let size = {x:0,y:0, width:0, height:0, rows:3, columns:3};
let audio=null;
let pieces=[];
let selectedPiece =null;
window.addEventListener("DOMContentLoaded", main)

function main(){

    canvas  = document.getElementById('canvas');
    context = canvas.getContext('2d');

    addEventListeners();

    // access for the camera 
    let promise = navigator.mediaDevices.getUserMedia({video:true});
    
    // let promise = navigator.mediaDevices.getUserMedia({video:{
    //     width: { exact: 200},
    //     height: { exact: 400}
    // }});

    promise.then(signal => {
        // console.log(signal);
        video = document.createElement("video");
        video.srcObject = signal;
        video.play();

        video.onloadeddata = function(){

            handleResizeWindow() // intial function call

            // draw pieces line 

            intialPieces(3, 3);

            // window.addEventListener("resize", handleResizeWindow) // function call on resize window
            updateCanvas();
        }

    }).catch(err => console.log(err));

}

function addEventListeners(){
    canvas.addEventListener("mousedown", mouseDown)
    canvas.addEventListener("mousemove", mouseMove)
    canvas.addEventListener("mouseup", mouseUp)

    canvas.addEventListener("touchstart", touchStart)
    canvas.addEventListener("touchmove", touchMove)
    canvas.addEventListener("touchend", touchEnd)
}

function touchStart(event){
    let location = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
    };

    mouseDown(location);
}
function touchMove(event){
    let location = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
    };

    mouseMove(location);
}

function touchEnd(event){
    mouseUp();
}

function mouseDown(event){
    selectedPiece = getPressedPiece(event);
    if(selectedPiece){
        const index = pieces.indexOf(selectedPiece);
        if(index > -1){
            pieces.slice(index, 1);
            pieces.push(selectedPiece);
        }
        
        selectedPiece.offset={
            x: event.x - selectedPiece.x,
            y: event.y - selectedPiece.y 
        };
    }
}


function mouseMove(event){
    if(selectedPiece){
        selectedPiece.x= event.x - selectedPiece.offset.x;
        selectedPiece.y= event.y - selectedPiece.offset.y;
    }
}


function mouseUp(){
    if(selectedPiece.isClose()){
        selectedPiece.snap();
    }

    selectedPiece = null;
}


function getPressedPiece(location){
    //
    for (let p = pieces.length-1; p >= 0; p--) {

        if(
            location.x > pieces[p].x && location.x < pieces[p].x + pieces[p].width &&
            location.y > pieces[p].y && location.y < pieces[p].y + pieces[p].height 
        )
        {
            return pieces[p];
        }
    }

    return null;
}


function handleResizeWindow(){
    // always set canvas width when call the function
    canvas.width = window.innerWidth;
    canvas.height= window.innerHeight;

    // set scale & resize video 
    let resizer = scale * Math.min(
        window.innerWidth / video.videoWidth,
        window.innerHeight / video.videoHeight,
    );

    size.width = resizer * video.videoWidth;
    size.height = resizer * video.videoHeight;

    size.x = (window.innerWidth/2 )- (video.videoWidth/2);
    size.y = (window.innerHeight/2) - (video.videoHeight/2);
}



function updateCanvas(){

    // clear canvas 
    context.clearRect(0,0,canvas.width, canvas.height);

    context.globalAlpha=0.5;
    // draw video 
    // const vH=400, vW=500;

    // context.save();
    // context.drawImage(video, (canvas.width/2) - (vW/2) ,(canvas.height/2) - (vH/2), vW, vH);
    context.drawImage(video, 
        size.x ,size.y, 
        size.width, size.height
    );

    context.globalAlpha=1;

    for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        piece.draw(context);
        
    }

    // context.restore();

    requestAnimationFrame(updateCanvas)
}


function intialPieces(rows, columns){

    pieces =[];
    
    size.rows = rows;
    size.columns =columns;

    for (let r = 0; r < size.rows; r++) {
        for (let c = 0; c < size.columns; c++) {
            pieces.push(new Piece(r, c))
        }
    }
}


function randomPieces(){

    for (let p = 0; p < pieces.length; p++) {
        let location = {
            x: Math.random() * (canvas.width - pieces[p].width),
            y: Math.random() * (canvas.height - pieces[p].height)
        };

        pieces[p].x= location.x;
        pieces[p].y=location.y;
    }
}


class Piece {
    constructor(rowIndex, colIndex){
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.x = size.x+((size.width * this.colIndex) / size.columns);
        this.y = size.y+((size.height * this.rowIndex) / size.rows);

        this.width = size.width / size.columns;
        this.height = size.height / size.rows;

        this.xCorrect = this.x;
        this.yCorrect = this.y;
    }

    draw(context){
        context.beginPath();

        context.drawImage(video,
            this.colIndex * video.videoWidth/size.columns,
            this.rowIndex * video.videoHeight/size.rows,
            video.videoWidth/size.columns,
            video.videoHeight/size.rows,
            this.x,
            this.y,
            this.width,
            this.height
        );

        context.rect(this.x, this.y, this.width, this.height);
        context.stroke();
    }

    isClose(){

        if(distance(
            {x: this.x, y: this.y},
            {x: this.xCorrect, y: this.yCorrect},
        ) < this.width / 3){
            return true;
        }

        return false;
    }

    snap(){
        this.x = this.xCorrect;
        this.y = this.yCorrect;
    }
}

function distance(p1, p2){
    return Math.sqrt(
        (p1.x - p2.x) * (p1.x - p2.x) + 
        (p1.y - p2.y) * (p1.y - p2.y)
    );
}


// playlist 
// https://www.youtube.com/watch?v=xpmSveLVCVU&list=PLB0Tybl0UNfadlXE6BSpPk6O1Rbfm9ITo&index=4
