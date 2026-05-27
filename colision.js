const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let player = {
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    color: "blue"
};

let enemy = {
    x: 400,
    y: 200,
    width: 50,
    height: 50,
    color: "red"
};

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawEnemy() {
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

function detectCollision() {

    if (
        player.x < enemy.x + enemy.width &&
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.y + player.height > enemy.y
    ) {

        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("COLISION", 320, 50);
    }
}

function update() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawEnemy();
    detectCollision();

    requestAnimationFrame(update);
}

document.addEventListener("keydown", function(e){

    if(e.key === "ArrowUp"){
        player.y -= 10;
    }

    if(e.key === "ArrowDown"){
        player.y += 10;
    }

    if(e.key === "ArrowLeft"){
        player.x -= 10;
    }

    if(e.key === "ArrowRight"){
        player.x += 10;
    }

});

update();