window.onload = function () {

  // Canvas
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Размер экрана
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Частицы
  let particles = [];

  // Позиция мыши / пальца
  let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
  };

  // Движение мыши (ПК)
  window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    for (let i = 0; i < 5; i++) {
      particles.push(new Particle(mouse.x, mouse.y));
    }
  });

  // Движение пальца (телефон)
  window.addEventListener("touchmove", function (e) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;

    for (let i = 0; i < 5; i++) {
      particles.push(new Particle(mouse.x, mouse.y));
    }
  });

  // Класс частицы
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.size *= 0.95;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Анимация
  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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