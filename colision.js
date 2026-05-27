// Obtener el canvas y el contexto
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Obtener dimensiones de la ventana
const window_height = window.innerHeight;
const window_width = window.innerWidth;

// Ajustar tamaño del canvas
canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";


// Clase Circle
class Circle {

    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.originalColor = color; // guardar color original
        this.text = text;
        this.speed = speed;

        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    draw(context) {

        context.beginPath();

        context.strokeStyle = this.color;
        context.lineWidth = 2;

        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";

        context.fillText(this.text, this.posX, this.posY);

        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();

        context.closePath();
    }

    update(context) {

        this.draw(context);

        // mover en X
        this.posX += this.dx;

        if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
            this.dx = -this.dx;
        }

        // mover en Y
        this.posY += this.dy;

        if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
            this.dy = -this.dy;
        }
    }
}


// Array de círculos
let circles = [];


// Generar círculos
function generateCircles(n) {

    for (let i = 0; i < n; i++) {

        let radius = Math.random() * 30 + 20;

        let x = Math.random() * (window_width - radius * 2) + radius;
        let y = Math.random() * (window_height - radius * 2) + radius;

        let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

        // velocidad entre 1 y 5
        let speed = Math.random() * 4 + 1;

        let text = `C${i + 1}`;

        circles.push(
            new Circle(x, y, radius, color, text, speed)
        );
    }

}


// DETECTAR COLISIONES
function detectCollisions() {

    for (let i = 0; i < circles.length; i++) {

        circles[i].color = circles[i].originalColor;

        for (let j = i + 1; j < circles.length; j++) {

            let dx = circles[i].posX - circles[j].posX;
            let dy = circles[i].posY - circles[j].posY;

            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < circles[i].radius + circles[j].radius) {

                // Flash azul
                circles[i].color = "#0000FF";
                circles[j].color = "#0000FF";

                // Cambiar dirección (rebote)
                circles[i].dx = -circles[i].dx;
                circles[i].dy = -circles[i].dy;

                circles[j].dx = -circles[j].dx;
                circles[j].dy = -circles[j].dy;

            }

        }

    }

}


// Animación
function animate() {

    ctx.clearRect(0, 0, window_width, window_height);

    detectCollisions();

    circles.forEach(circle => {
        circle.update(ctx);
    });

    requestAnimationFrame(animate);
}


// generar 20 círculos
generateCircles(20);

animate();