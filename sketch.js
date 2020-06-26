const Map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const res = 200;
const fov = 70;

const squareWidth = 20;
var player = {
    speed: 1,
    rotSpeed: 0.05,
    x: squareWidth * 1.5,
    y: squareWidth * 1.5,
    rot: 0
}

function setup() {
    let cnv = createCanvas(innerWidth, innerHeight);
    cnv.parent("cnv");
    background(0, 255, 0);
    // noLoop();
}

function draw() {
    background(0, 255, 255);

    fill(50);
    rect(0, innerHeight / 2, innerWidth, innerHeight / 2);
    // drawMap();
    // drawPlayer();

    if (keyIsDown(65)) {
        //a
        player.rot -= player.rotSpeed;
    } if (keyIsDown(68)) {
        //d
        player.rot += player.rotSpeed;
    } if (keyIsDown(87)) {
        //w
        player.x += Math.cos(player.rot) * player.speed;
        player.y += Math.sin(player.rot) * player.speed;
    } if (keyIsDown(83)) {
        //s
        player.x -= Math.cos(player.rot) * player.speed;
        player.y -= Math.sin(player.rot) * player.speed;
    }

    // console.log(sendRayHorizontal(player.x, player.y, player.rot));

    noStroke();

    let angleDiff = fov / res;
    for (let i = 0; i < res; i++) {
        let angle = player.rot - (((angleDiff * res) / 2) * (PI / 180)) + ((i * angleDiff) * (PI / 180));
        // console.log(angle);
        let len = castRay(player.x, player.y, angle);
        let playerAngle = player.rot;

        len *= Math.cos(angle - playerAngle);
        len = (squareWidth * height * (2 / 5)) / len;
        // len = Math.min(height * (2 / 5), len);

        rect(i * (width / res), (height / 2) - (len), width / res, (len) * 2);
        // console.log(len);
    }
}

function castRay(x, y, r) {
    let horLen = sendRayHorizontal(x, y, r);
    let vertLen = sendRayVertical(x, y, r);
    if (horLen < vertLen) {
        fill(200);
        return horLen;
    } else {
        fill(150);
        return vertLen;
    }
}

function sendRayHorizontal(x, y, r) {
    let xHit;
    let yHit;
    let xoffset;
    let yoffset;
    let dof = 0;
    //make weird angles correct
    r = r % (2 * PI);
    r *= -1;
    if (r < 0) {
        r = (2 * PI) + r;
    }
    if (r == PI / 2 || r == PI * 1.5) {
        xHit = x;
        yHit = y;
        dof = Infinity;
    }

    let atan = Math.tan(r);
    //cast ray to horizontals
    if (r > PI / 2 && r < PI * 1.5) {
        // console.log("looking left");
        xHit = x - (x % squareWidth) - 0.001;
        yHit = y + ((x % squareWidth) * atan);
        xoffset = -squareWidth;
        yoffset = -xoffset * atan;
    } else if (r < PI / 2 || r > PI * 1.5) {
        // console.log("looking right");
        xHit = x + (squareWidth - (x % squareWidth));
        yHit = y - (xHit - x) * atan;
        xoffset = squareWidth;
        yoffset = -xoffset * atan;
    }
    // fill(255, 0, 0);
    while (dof < 8) {
        let yMap = Math.floor(yHit / squareWidth);
        let xMap = Math.floor(xHit / squareWidth);
        if (Map[yMap] == undefined || Map[yMap][xMap] == undefined) {
            return Infinity;
        }
        if (Map[yMap][xMap] == 1) {
            // circle(xHit, yHit, 10);
            break;
        } else {
            yHit += yoffset;
            xHit += xoffset;
        }
    }
    // line(x, y, xHit, yHit);
    yHit = yHit - y;
    xHit = xHit - x;

    return Math.sqrt(yHit * yHit + xHit * xHit);

}

function sendRayVertical(x, y, r) {
    let xHit;
    let yHit;
    let xoffset;
    let yoffset;
    let dof = 0;
    //make weird angles correct
    r = r % (2 * PI);
    r *= -1;
    if (r < 0) {
        r = (2 * PI) + r;
    }
    if (r == 0 || r == PI) {
        xHit = x;
        yHit = y;
        dof = Infinity;
    }

    let atan = 1 / Math.tan(r);
    //cast ray to horizontals
    if (r < PI) {
        // console.log("looking up");
        yHit = y - (y % squareWidth) - 0.001;
        xHit = x + ((y % squareWidth) * atan);
        yoffset = -squareWidth;
        xoffset = -yoffset * atan;
    } else if (r > PI) {
        // console.log("looking down");
        yHit = y + (squareWidth - (y % squareWidth));
        xHit = x - (yHit - y) * atan;
        yoffset = squareWidth;
        xoffset = -yoffset * atan;
    }
    // fill(255, 0, 0);
    while (dof < 8) {
        let yMap = Math.floor(yHit / squareWidth);
        let xMap = Math.floor(xHit / squareWidth);
        if (Map[yMap][xMap] == undefined) {
            return Infinity;
        }
        if (Map[yMap][xMap] == 1) {
            // circle(xHit, yHit, 10);
            break;
        } else {
            yHit += yoffset;
            xHit += xoffset;
        }
    }
    // line(x, y, xHit, yHit);

    yHit = yHit - y;
    xHit = xHit - x;

    return Math.sqrt(yHit * yHit + xHit * xHit);

}

function drawPlayer() {
    let radius = 10;
    fill(255, 0, 0);
    circle(player.x, player.y, radius);
    line(player.x, player.y, player.x + Math.cos(player.rot) * 10, player.y + Math.sin(player.rot) * 10);
}

function drawMap() {
    //draw background
    // fill(255);
    // rect(0, 0, squareWidth * Map.length, squareWidth * Map[0].length);

    stroke(255, 0, 0);
    for (let x = 0; x < Map.length; x++) {
        for (let y = 0; y < Map[0].length; y++) {
            switch (Map[y][x]) {
                case 0:
                    // continue;
                    fill(255, 255, 255);
                    break;
                case 1:
                    fill(0);
                    break;
            }
            rect(x * squareWidth, y * squareWidth, squareWidth, squareWidth);
        }
    }
}