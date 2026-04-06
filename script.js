window.onload = function () {

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  let fireworks = [];

  let candlesOn = true;
  let showCake = true;

  // 🎥 видео
  const video = document.createElement("video");
  video.src = "video.mp4.mp4"; // 👈 ВАЖНО: файл должен так называться
  video.style.position = "absolute";
  video.style.top = "0";
  video.style.left = "0";
  video.style.width = "100%";
  video.style.height = "100%";
  video.style.objectFit = "cover";
  video.style.display = "none";

  video.muted = true;
  video.autoplay = true;
  video.loop = true;

  document.body.appendChild(video);

  // 🎊 частицы
  window.addEventListener("mousemove", function (e) {
    for (let i = 0; i < 5; i++) {
      particles.push(new Particle(e.clientX, e.clientY));
    }
  });

  // 🎇 фейерверк
  window.addEventListener("click", function (e) {
    createFirework(e.clientX, e.clientY);
  });

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
    for (let i = 0; i < 50; i++) {
      fireworks.push(new FireworkParticle(x, y));
    }
  }

  // 🎂 торт
  function drawCake() {
    let x = canvas.width / 2;
    let y = canvas.height / 2;

    ctx.fillStyle = "#ffb6c1";
    ctx.fillRect(x - 120, y + 20, 240, 60);

    ctx.fillStyle = "#ff69b4";
    ctx.fillRect(x - 90, y - 20, 180, 50);

    ctx.fillStyle = "#ff1493";
    ctx.fillRect(x - 60, y - 60, 120, 40);

    for (let i = -40; i <= 40; i += 20) {
      ctx.fillStyle = "yellow";
      ctx.fillRect(x + i, y - 90, 6, 25);

      if (candlesOn) {
        let flicker = Math.random() * 4;

        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.arc(x + i + 3, y - 95, 6 + flicker, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function drawText() {
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("🎉 С ДНЁМ РОЖДЕНИЯ! 🎉", canvas.width / 2, 100);
  }

  function drawButtons() {
    let y = canvas.height / 2 + 120;

    ctx.fillStyle = "#444";
    ctx.fillRect(canvas.width / 2 - 150, y, 120, 50);
    ctx.fillStyle = "white";
    ctx.fillText("Задуть", canvas.width / 2 - 90, y + 30);

    ctx.fillStyle = "#444";
    ctx.fillRect(canvas.width / 2 + 30, y, 120, 50);
    ctx.fillStyle = "white";
    ctx.fillText("Зажечь", canvas.width / 2 + 90, y + 30);
  }

  function drawGift() {
    let x = canvas.width / 2;
    let y = canvas.height / 2 + 200;

    ctx.fillStyle = "red";
    ctx.fillRect(x - 40, y, 80, 60);

    ctx.fillStyle = "yellow";
    ctx.fillRect(x - 5, y, 10, 60);
    ctx.fillRect(x - 40, y + 25, 80, 10);
  }

  canvas.addEventListener("click", function (e) {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    let btnY = canvas.height / 2 + 120;

    // кнопки
    if (x > canvas.width / 2 - 150 && x < canvas.width / 2 - 30 &&
        y > btnY && y < btnY + 50) candlesOn = false;

    if (x > canvas.width / 2 + 30 && x < canvas.width / 2 + 150 &&
        y > btnY && y < btnY + 50) candlesOn = true;

    // 🎁 подарок
    let giftY = canvas.height / 2 + 200;
    if (x > canvas.width / 2 - 40 && x < canvas.width / 2 + 40 &&
        y > giftY && y < giftY + 60) {

      showCake = false;
      video.style.display = "block";
      video.play();
    }
  });

  function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (showCake) {
      drawCake();
      drawText();
      drawButtons();
      drawGift();
    }

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].size < 0.5) {
        particles.splice(i, 1);
        i--;
      }
    }

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
