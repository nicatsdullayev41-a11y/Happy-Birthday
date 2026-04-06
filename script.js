window.onload = function () {

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  let fireworks = [];

  let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
  };

  // частицы от движения
  window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    for (let i = 0; i < 6; i++) {
      particles.push(new Particle(mouse.x, mouse.y));
    }
  });

  window.addEventListener("touchmove", function (e) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;

    for (let i = 0; i < 6; i++) {
      particles.push(new Particle(mouse.x, mouse.y));
    }
  });

  // клик = фейерверк
  window.addEventListener("click", function (e) {
    createFirework(e.clientX, e.clientY);
  });

  window.addEventListener("touchstart", function (e) {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    createFirework(x, y);
  });

  // частицы
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 2;
      this.speedX = Math.random() * 4 - 2;
      this.speedY = Math.random() * 4 - 2;
      this.color = "hsl(" + Math.random() * 360 + ",100%,60%)";
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.size *= 0.96;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // фейерверк частица
  class FireworkParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 4 + 1;
      this.speedX = Math.random() * 6 - 3;
      this.speedY = Math.random() * 6 - 3;
      this.life = 100;
      this.color = "hsl(" + Math.random() * 360 + ",100%,50%)";
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life--;
    }

    draw() {
      ctx.globalAlpha = this.life / 100;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function createFirework(x, y) {
    for (let i = 0; i < 60; i++) {
      fireworks.push(new FireworkParticle(x, y));
    }
  }

  // торт + МЕРЦАЮЩИЕ свечи
  function drawCake() {
    let x = canvas.width / 2;
    let y = canvas.height / 2;

    // слои
    ctx.fillStyle = "#ffb6c1";
    ctx.fillRect(x - 120, y + 20, 240, 60);

    ctx.fillStyle = "#ff69b4";
    ctx.fillRect(x - 90, y - 20, 180, 50);

    ctx.fillStyle = "#ff1493";
    ctx.fillRect(x - 60, y - 60, 120, 40);

    // крем
    ctx.fillStyle = "white";
    for (let i = -110; i <= 110; i += 20) {
      ctx.beginPath();
      ctx.arc(x + i, y + 20, 10, 0, Math.PI, true);
      ctx.fill();
    }

    // свечи с МЕРЦАНИЕМ
    for (let i = -40; i <= 40; i += 20) {
      ctx.fillStyle = "yellow";
      ctx.fillRect(x + i, y - 90, 6, 25);

      // мерцающий огонь
      let flicker = Math.random() * 4;

      ctx.fillStyle = "orange";
      ctx.beginPath();
      ctx.arc(x + i + 3, y - 95, 6 + flicker, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(x + i + 3, y - 95, 3 + flicker / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // текст
  function drawText() {
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("🎉 С ДНЁМ РОЖДЕНИЯ! 🎉", canvas.width / 2, 100);
  }

  // анимация
  function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawCake();
    drawText();

    // обычные частицы
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      if (particles[i].size < 0.5) {
        particles.splice(i, 1);
        i--;
      }
    }

    // фейерверки
    for (let i = 0; i < fireworks.length; i++) {
      fireworks[i].update();
      fireworks[i].draw();

      if (fireworks[i].life <= 0) {
        fireworks.splice(i, 1);
        i--;
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
};
