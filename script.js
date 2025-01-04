// Fireworks Animation
const canvas = document.querySelector('.fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];
const fireworkSound = document.getElementById("fireworkSound"); // Get the sound element

class Firework {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.alpha = 1;
    }
    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.alpha -= 0.02;
    }
}

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 5 + 2;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    fireworks.push(new Firework(x, y, radius, color));

    // Play the firework sound
    fireworkSound.currentTime = 0; // Rewind to start
    fireworkSound.play();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.alpha <= 0) {
            fireworks.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

setInterval(createFirework, 300);
animate();
