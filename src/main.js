const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const ball = new BALL;
const paddle = new PADDLE;
const bricks = new BRICK;
const text = new TEXT;

let brickField = [];
let score = 0;
let rightPressed = false;
let leftPressed = false;

for (let c = 0; c < bricks.columnCount; c++) {
    brickField[c] = [];
    for (let r = 0; r < bricks.rowCount; r++) {
        brickField[c][r] = {
            x: 0,
            y: 0,
            status: 1
        };
    }
}

document.addEventListener('touchmove', e => {
    let relativeX = e.changedTouches[0].clientX - canvas.offsetLeft;
    paddle.mouse(relativeX);
})

document.addEventListener('mousemove', e => {
    let relativeX = e.clientX - canvas.offsetLeft;
    paddle.mouse(relativeX);
})

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
    ball.move();

    paddle.draw();
    paddle.move();

    bricks.draw();
    bricks.collisionDetection();

    text.score();

    ball.x += ball.dx;
    ball.y += ball.dy;
    let frame = requestAnimationFrame(draw)
}
draw();