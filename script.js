window.onload = function () {

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
  };

  // 🎊 частицы (движение мыши)
  window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    for (let i = 0; i < 8; i++) {
      particles.push(new Particle(mouse.x, mouse.y));
    }
  });

  // 📱 частицы (телефон)
  window.addEventListener("touchmove", function (e) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;

    for (let i = 0; i < 8; i++) {
      particles.push(new Particle(mouse.x, mouse.y));
    }
  });

  // ✨ класс частицы
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 6 + 2;
      this.speedX = Math.random() * 4 - 2;
      this.speedY = Math.random() * 4 - 2;
      this.color = "hsl(" + Math.random() * 360 + ", 100%, 60%)";
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

  // 🎂 красивый торт
  function drawCake() {
    let x = canvas.width / 2;
    let y = canvas.height / 2;

    // нижний слой
    ctx.fillStyle = "#ffb6c1";
    ctx.fillRect(x - 120, y + 20, 240, 60);

    // средний слой
    ctx.fillStyle = "#ff69b4";
    ctx.fillRect(x - 90, y - 20, 180, 50);

    // верхний слой
    ctx.fillStyle = "#ff1493";
    ctx.fillRect(x - 60, y - 60, 120, 40);

    // крем (волны)
    ctx.fillStyle = "white";
    for (let i = -110; i <= 110; i += 20) {
      ctx.beginPath();
      ctx.arc(x + i, y + 20, 10, 0, Math.PI, true);
      ctx.fill();
    }

    for (let i = -80; i <= 80; i += 20) {
      ctx.beginPath();
      ctx.arc(x + i, y - 20, 8, 0, Math.PI, true);
      ctx.fill();
    }

    // свечи + огонь
    for (let i = -40; i <= 40; i += 20) {
      // свечка
      ctx.fillStyle = "yellow";
      ctx.fillRect(x + i, y - 90, 6, 25);

      // огонь
      ctx.fillStyle = "orange";
      ctx.beginPath();
      ctx.arc(x + i + 3, y - 95, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 🎉 текст
  function drawText() {
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("🎉 С ДНЁМ РОЖДЕНИЯ! 🎉", canvas.width / 2, 100);
  }

  // 🎬 анимация
  function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawCake();
    drawText();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      if (particles[i].size < 0.5) {
        particles.splice(i, 1);
        i--;
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
};
