var Snake;
var snakeColor="white";
var preyColor="yellowgreen";
var canvas = document.getElementById("arena");
var ctx = canvas.getContext("2d");
var speedDiff = 10;
var arrowkeyActive = true;
var gx,gy=0;
function main(){
    Snake = new Anaconda();
    customMoves();
}
function customMoves(){
    document.onkeydown = function (e) {
        if(arrowkeyActive){
            prey(false);
            arrowkeyActive=false;
        }
        switch (e.key) {
            case 'ArrowUp':
                Snake.xspeed = 0;
                Snake.yspeed = -speedDiff;
                break;
            case 'ArrowDown':
                Snake.xspeed = 0;
                Snake.yspeed = speedDiff;
                break;
            case 'ArrowLeft':
                Snake.xspeed = -speedDiff;
                Snake.yspeed = 0;
                break;
            case 'ArrowRight':
                Snake.xspeed = speedDiff;
                Snake.yspeed = 0;
                break;
        }
    };
}
function draw(){
    canvas.style.background = "grey";
    Snake.clear(ctx);
    Snake.move();
    Snake.block();
}
function Anaconda(){
    this.x = 0;
    this.y = 0;
    this.xspeed = 0;
    this.yspeed = 0;
    this.len = 1;
    this.bodySize = [];
    this.move = function(){
        let latestx,latesty = 0;
        

        this.x += this.xspeed;
        this.y += this.yspeed;
        if(this.x<0){
            this.x = 0;
            this.xspeed = 0;
        }
        else if(this.y<0){
            this.y = 0;
            this.yspeed = 0;
        }
        if(this.x >= canvas.width || this.y >= canvas.height){
            this.x -= this.xspeed;
            this.y -= this.yspeed;
            this.xspeed = 0;
            this.yspeed = 0;
        }
        if(this.x == gx && this.y == gy){
            prey(false);
            this.len++ ;
        }
        
        this.bodySize[this.len-1] = {
            x : this.x,
            y : this.y,
            width : speedDiff,
            height : speedDiff,
            color : snakeColor
        };
        for (j=0;j<this.len-1 ;j++){
            this.bodySize[j] = this.bodySize[j+1];
        }
    }
    this.block = function(){
        for (j=0;j<this.len ;j++){
            createBlock(this.bodySize[j].x,this.bodySize[j].y,this.bodySize[j].width,this.bodySize[j].height,this.bodySize[j].color);
        }
    }
    this.clear = function (c) {
        c.clearRect(0, 0, canvas.width, canvas.height);
        if(gx>=0 ||gy >= 0){
            prey(true);
        }
    }
}
function prey(ifexists){
    if(ifexists){
        createBlock(gx, gy, speedDiff, speedDiff,preyColor);
        return;
    }
    var x,y = 0;
    x = rand();
    y = rand();
    if(x == Snake.x || y == Snake.y){
        x = rand();
        y = rand();
    }
    gx = x;
    gy = y;
    createBlock(x, y, speedDiff, speedDiff, preyColor);
}
function rand(){
    return Math.floor(Math.random()*40)*speedDiff;
}
function createBlock(posx,posy,width,height,color){
    ctx.beginPath();
    ctx.rect(posx, posy, width, height);
    ctx.fillStyle=color;
    ctx.fill();
}
