const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class BALL {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height - 30;
        this.dx = 4;
        this.dy = -4;
        this.r = 10;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = "#0095DD"
        ctx.fill();
        ctx.closePath();
    }

    move() {
        if (this.x + this.dx < this.r || this.x + this.dx > canvas.width - this.r) {
            this.dx = -this.dx;
        }

        if (this.y + this.dy < this.r) {
            this.dy = -this.dy;
        } else if (this.y + this.dy > canvas.height - this.r) {
            if (this.x >= paddle.x && this.x <= paddle.x + paddle.width) {
                this.dx > 0 ? this.dx = randomInteger(1, 2) : this.dx = -randomInteger(1, 2);
                this.dy = -this.dy;
            } else {
                alert("Game Over");
                window.location.reload();;
            }
        }
    }
}

class PADDLE {
    constructor() {
        this.width = 75;
        this.height = 10;
        this.x = (canvas.width - this.width) / 2;
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
    }

    move() {
        if (rightPressed) {
            if (this.x < canvas.width - this.width) {
                this.x += 5;
            }
        } else if (leftPressed) {
            if (this.x > 0) {
                this.x -= 5;
            }
        }
    }

     mouse(relativeX) {
         if (relativeX > 0 && relativeX < canvas.width) {
             this.x = relativeX - this.width / 2;
         }
     }
}

class BRICK {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.rowCount = 3;
        this.columnCount = 5;
        this.width = 75;
        this.height = 20;
        this.padding = 20;
        this.offsetTop = 30;
        this.offsetLeft = canvas.width / 32;
    }

    draw() {
        for (let column of brickField) {
            for (let brick of column) {
                if (brick.status == 1) {
                    this.x = (brickField.indexOf(column) * (this.width + this.padding)) + this.offsetLeft;
                    this.y = (column.indexOf(brick) * (this.height + this.padding)) + this.offsetTop;
                    brick.x = this.x;
                    brick.y = this.y;
                    ctx.beginPath();
                    ctx.rect(brick.x, brick.y, this.width, this.height)
                    ctx.fillStyle = '#0095DD';
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    collisionDetection() {
        for (let column of brickField) {
            for (let brick of column) {
                if (ball.y > brick.y && ball.y < brick.y + this.height) {
                    if (brick.status == 1) {
                        if (ball.x > brick.x && ball.x < brick.x + this.width) {
                            ball.dy = -ball.dy;
                            brick.status = 0;
                            score++;
                            ball.dx > 0 ? ball.dx = randomInteger(1, 4) : ball.dx = -randomInteger(1, 4);
                            if (score == this.rowCount * this.columnCount) {
                                alert('You Win')
                                document.location.reload();
                            }
                        }
                    }
                }
            }
        }
    }
}

class SCORE {
    draw() {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#0095DD'
        ctx.fillText(`Score: ${score}`, 8, 20)
    }
}