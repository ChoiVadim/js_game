const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = "shadow_dog.png";
const spriteWidth = 575; //6876/12
const spriteHeight = 523; // 5230/10
let playerState = "idle";
let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
    {
        name: "idle",
        frames: 7
    },
    {
        name: "jump",
        frames: 7
    },
    {
        name: "fall",
        frames: 7
    },
    {
        name: "run",
        frames: 8
    },
    {
        name: "dizzy",
        frames: 11
    },
    {
        name: "sit",
        frames: 5
    },
    {
        name: "roll",
        frames: 6
    },
    {
        name: "bite",
        frames: 7
    },
    {
        name: "ko",
        frames: 12
    },
    {
        name: "getHit",
        frames: 4
    }
]

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({ x: positionX, y: positionY });
    }
    spriteAnimations[state.name] = frames;
});

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;

    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY,
        spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    

    gameFrame++;
    requestAnimationFrame(animate);
}
animate();

document.addEventListener("mousedown", (event) => {
    playerState = "bite";
});

document.addEventListener("mouseup", (event) => {
    playerState = "idle";
});

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowRight":
        case "d":
            playerState = "run";
            break;
        case " ":
            playerState = "jump";
            break;
        case "Shift":
            playerState = "roll";
            break;
        case "Control":
            playerState = "sit";
            break;
        case "e":
            playerState = "ko";
            break;
    }
});    

document.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "ArrowRight":
        case "d":
            playerState = "idle";
            break;
        case " ":
            playerState = "fall";
            break;
        case "Shift":
            playerState = "idle";
            break;
        case "Control":
            playerState = "idle";
            break;
    }
});    

canvas.onclick = () => {
    playerState = "dizzy";
}