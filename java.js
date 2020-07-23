
        var myGamePiece;

        function startGame() {
            myGamePiece = new component(30, 30, "https://ialottery.com/images/Promotions/Frogger/RetroFrog_100W.png", 10, 120, "image");
            myGameArea.start();
        }

        var myGameArea = {
            canvas: document.createElement("canvas"),
            start: function () {
                this.canvas.width = 480;
                this.canvas.height = 270;
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

        function component(width, height, color, x, y, type) {
            this.type = type;
            if (type == "image") {
                this.image = new Image();
                this.image.src = color;
            }
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
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
        }

        function updateGameArea() {
            myGameArea.clear();
            myGamePiece.newPos();
            myGamePiece.update();
        }

        function moveup() {
            myGamePiece.y += -10;
        }

        function movedown() {
            myGamePiece.y += 10;
        }

        function moveleft() {
            myGamePiece.x += -10;
        }

        function moveright() {
            myGamePiece.x += 10;
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
                break
              case 68:
                moveright()
                break
                case 87:
                moveup()
                break
                case 83:
                movedown()
                break
              default:
            }
           
          }
          