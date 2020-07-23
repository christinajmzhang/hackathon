
var myGamePiece;
var isColliding = false;
var lives = 3;
var startX = 470;
var startY = 270;

function startGame() {
    myGamePiece = new Component(30, 30, "https://ialottery.com/images/Promotions/Frogger/RetroFrog_100W.png", startX, startY, "image")
    square1 = new Component(50, 50, "red", 100, 50)
    square2 = new Component(50, 50, "red", 100, 150)
    
    myGameArea.start();
}
var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

function Component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0
    this.speedY = 0
    this.update = function () {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.resetPosition = function (x, y) {
        this.x = x;
        this.y = y;
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x
        var myright = this.x + this.width
        var mytop = this.y
        var mybottom = this.y + this.height
        var otherleft = otherobj.x
        var otherright = otherobj.x + otherobj.width
        var othertop = otherobj.y
        var otherbottom = otherobj.y + otherobj.height
        var crash = true
        if (mybottom < othertop || mytop > otherbottom || myright < otherleft || myleft > otherright) {
            crash = false
        }
        return crash
    }
}




function updateGameArea() {
    square1.speedX = 5;
    if (square1.x > 1000) {
        square1.x = -50;
    }

    square2.speedX = -5;
    if (square2.x < -50) {
        square2.x = 1000;
    }

    if (myGamePiece.crashWith(square1) || myGamePiece.crashWith(square2)) {
        console.log("Collision");
        lives--
        console.log(lives);
        myGameArea.stop()
        myGamePiece.resetPosition(startX, startY)
        if (lives > 0) {
            alert("lives: " + lives);
            myGameArea.start()
        }
        if (lives<=0) {
            alert("Game Over");
            alert("Refresh to restart")
        }
        //document.getElementById("notifications").textContent = "Collision!!!"
    } else {
        myGameArea.clear()
        myGamePiece.newPos()
        myGamePiece.update()
        square1.newPos()
        square1.update()
        square2.newPos()
        square2.update()
    }
}


function moveup() {
    myGamePiece.speedY = -2;
    setTimeout(function () {
        myGamePiece.speedY = 0;
    }
        , 200);

}

function movedown() {
    myGamePiece.speedY = 2;
    setTimeout(function () {
        myGamePiece.speedY = 0;
    }
        , 200);

}

function moveleft() {
    myGamePiece.speedX = -2;
    setTimeout(function () {
        myGamePiece.speedX = 0;
    }
        , 200);

}

function moveright() {
    myGamePiece.speedX = 2;
    setTimeout(function () {
        myGamePiece.speedX = 0;
    }
        , 200);

}

function clearmove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}
document.onkeydown = function (e) {
    var keys = {
        65: "left",
        68: "right",
        87: "up",
        83: "down"
    }
    console.log(e.keyCode)
    switch (e.keyCode) {
        case 65:
            moveleft()
            break;
        case 68:
            moveright()
            break;
        case 87:
            moveup()
            break;
        case 83:
            movedown()
            break
        default:
    }
    
}

