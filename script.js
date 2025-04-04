const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");

// Ajustar tamaño del canvas
function resizeCanvas() {
  explosionSound.currentTime = 0;
  explosionSound.play();
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

const explosionSound = document.getElementById("explosion-sound");

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Crear partículas (estrellas)
const particles = [];
const numParticles = 150;

for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
  });
}

// Dibujar y animar
function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "#00ffff";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00ffff";
    ctx.fill();
  });

  drawExplosions(); // ← Agregado aquí

  requestAnimationFrame(animate);
}


// Partículas de explosión
let explosions = [];

canvas.addEventListener("click", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Crear 30 partículas por explosión
  for (let i = 0; i < 30; i++) {
    explosions.push({
      x: mouseX,
      y: mouseY,
      size: Math.random() * 3 + 2,
      speedX: (Math.random() - 0.5) * 4,
      speedY: (Math.random() - 0.5) * 4,
      life: 60,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`
    });
  }
});

function drawExplosions() {
  for (let i = explosions.length - 1; i >= 0; i--) {
    const e = explosions[i];

    e.x += e.speedX;
    e.y += e.speedY;
    e.life--;

    ctx.beginPath();
    ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
    ctx.fillStyle = e.color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = e.color;
    ctx.fill();

    if (e.life <= 0) {
      explosions.splice(i, 1);
    }
  }
}

animate();