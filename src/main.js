const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const ball = new BALL;
const paddle = new PADDLE;

ball.r = 10;
paddle.width = 70;
paddle.height = 10;

ball.dx = 2;
ball.dy = -2;
ball.x = canvas.width / 2;
ball.y = canvas.height - 30;
paddle.x = (canvas.width - paddle.width) / 2
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", e => {
    e.key == "ArrowRight" ? rightPressed = true : null;
    e.key == "ArrowLeft" ? leftPressed = true : null;
})

document.addEventListener("keyup", e => {
    e.key == "ArrowRight" ? rightPressed = false : null;
    e.key == "ArrowLeft" ? leftPressed = false : null;
})

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    ball.bounce();

    paddle.draw();
    paddle.move();

    ball.x += ball.dx;
    ball.y += ball.dy;
}
let interval = setInterval(draw, 10);