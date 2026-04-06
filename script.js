window.onload = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  let fireworks = [];
  let candlesOn = true;
  let showCake = true;

  // мини видео превью
  const miniVideo = document.createElement("video");
  miniVideo.src = "video.mp4.mp4";
  miniVideo.style.position = "absolute";
  miniVideo.style.bottom = "20px";
  miniVideo.style.left = "50%";
  miniVideo.style.transform = "translateX(-50%)";
  miniVideo.style.width = "200px";
  miniVideo.style.height = "120px";
  miniVideo.style.cursor = "pointer";
  miniVideo.muted = true;
  miniVideo.autoplay = true;
  miniVideo.loop = true;
  document.body.appendChild(miniVideo);

  // полноэкранное видео
  const fullVideo = document.createElement("video");
  fullVideo.src = "video.mp4";
  fullVideo.style.position = "absolute";
  fullVideo.style.top = "0";
  fullVideo.style.left = "0";
  fullVideo.style.width = "100%";
  fullVideo.style.height = "100%";
  fullVideo.style.objectFit = "cover";
  fullVideo.style.display = "none";
  fullVideo.controls = true;
  document.body.appendChild(fullVideo);

  // кнопка возврата после видео
  const returnBtn = document.createElement("button");
  returnBtn.innerText = "Вернуться обратно";
  returnBtn.style.position = "absolute";
  returnBtn.style.top = "50%";
  returnBtn.style.left = "50%";
  returnBtn.style.transform = "translate(-50%, -50%)";
  returnBtn.style.padding = "20px 40px";
  returnBtn.style.fontSize = "24px";
  returnBtn.style.display = "none";
  document.body.appendChild(returnBtn);

  returnBtn.addEventListener("click", () => {
    fullVideo.pause();
    fullVideo.style.display = "none";
    returnBtn.style.display = "none";
    showCake = true;
    miniVideo.style.display = "block";
  });

  fullVideo.addEventListener("ended", () => {
    returnBtn.style.display = "block";
  });

  // частицы
  window.addEventListener("mousemove", function (e) {
    for (let i = 0; i < 5; i++) {
      particles.push(new Particle(e.clientX, e.clientY));
    }
  });

  // фейерверк
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

  // клик на мини-видео
  miniVideo.addEventListener("click", () => {
    showCake = false;
    miniVideo.style.display = "none";
    fullVideo.style.display = "block";
    fullVideo.muted = false;
    fullVideo.volume = 1;
    fullVideo.play();
  });

  canvas.addEventListener("click", function (e) {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    let btnY = canvas.height / 2 + 120;
    if (x > canvas.width / 2 - 150 && x < canvas.width / 2 - 30 &&
        y > btnY && y < btnY + 50) candlesOn = false;

    if (x > canvas.width / 2 + 30 && x < canvas.width / 2 + 150 &&
        y > btnY && y < btnY + 50) candlesOn = true;
  });

  function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (showCake) {
      drawCake();
      drawText();
      drawButtons();
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
