const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const platfromImage = new Image();
platfromImage.src = './images/platform.png';

canvas.width = 1024;
canvas.height = 576;


const gravity = 0.5;
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30;
        this.height = 30;
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
        }
    }
}
class Platform {
    constructor({ x, y, Image }) {
        this.position = {
            x: x,
            y: y
        }
        this.Image = Image
        this.width = Image.width;
        this.height = Image.height;

    }
    draw() {
        c.fillStyle = "blue";
        c.drawImage(this.Image, this.position.x, this.position.y)
    }
}

const player = new Player();
const platforms = [new Platform(
    {
        x: 200, y: 500, Image: platfromImage
    }),
new Platform({
    x: 600, y: 250, Image: platfromImage
})
]
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}
let scrollOffset = 0

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = "white"
    c.fillRect(0, 0, canvas.width, canvas.height)
    platforms.forEach(platform => {
        platform.draw();
    })
    player.update();



    if (keys.right.pressed && player.position.x < canvas.width / 2.5) {
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > canvas.width / 12) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })

        } else if (keys.left.pressed) {
            scrollOffset -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
            })

        }
        if (parseInt(scrollOffset / 10) >= 500) {
            console.log("You Win");
        }
    }
    console.log(parseInt(scrollOffset / 10));
    //platfrom collision detection
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    })


}
animate();

addEventListener("keydown", (event) => {
    switch (event.keyCode) {
        case 32:
            // console.log("jump");
            player.velocity.y -= 15;
            break;

        case 39:
            // console.log("Right");
            keys.right.pressed = true
            break;

        case 37:
            //console.log("Left");
            keys.left.pressed = true
            break;

        case 40:
            // console.log("Down");
            break;

    }
})
addEventListener("keyup", (event) => {
    switch (event.keyCode) {
        case 32:
            //console.log("jump");
            break;

        case 39:
            // console.log("Right");
            keys.right.pressed = false
            break;

        case 37:
            // console.log("Left");
            keys.left.pressed = false
            break;

        case 40:
            // console.log("Down");
            break;

    }
})