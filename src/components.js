class BALL {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.r = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = "#0095DD"
        ctx.fill();
        ctx.closePath();
    }

    bounce() {
        if (this.x + this.dx < this.r || this.x + this.dx > canvas.width - this.r) {
            this.dx = -this.dx;
        }
        if (this.y + this.dy < this.r) {
            this.dy = -this.dy;
        } else if (this.y + this.dy > canvas.height - this.r) {
            if (this.x > paddle.x && this.x < paddle.x + paddle.width) {
                this.dy = -this.dy; 
            } else {
                alert("Game Over");
                window.location.reload();
                clearInterval(interval);
            }
        }
    }
}

class PADDLE {
    constructor(){
        this.x = 0;
        this.width = 0;
        this.height = 0;
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
}