/* ============================================================
   canvas.js — Animated backgrounds
   On Shore: caustic light, foam waves, shells, palm shadows
   Deep Sea: bioluminescent particles, glowing wave, stars
   ============================================================ */

(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, theme, raf;
  let particles = [], shells = [], stars = [];

  /* ── Resize ── */
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', () => { resize(); init(); });

  /* ── Get theme ── */
  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'onshore';
  }

  /* ── Init particles per theme ── */
  function init() {
    theme = getTheme();
    particles = [];
    shells    = [];
    stars     = [];

    if (theme === 'onshore') initOnshore();
    else                     initDeepSea();
  }

  /* ──────────────────────────────
     ON SHORE
  ────────────────────────────── */
  function initOnshore() {
    /* Caustic shimmer dots */
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 1 + Math.random() * 3,
        speed: 0.3 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.04 + Math.random() * 0.12,
      });
    }
    /* Shell silhouettes */
    for (let i = 0; i < 7; i++) {
      shells.push({
        x: Math.random() * W,
        y: H * 0.6 + Math.random() * H * 0.4,
        size: 8 + Math.random() * 18,
        angle: Math.random() * Math.PI * 2,
        drift: (Math.random() - 0.5) * 0.08,
        opacity: 0.06 + Math.random() * 0.1,
      });
    }
  }

  function drawOnshore(t) {
    ctx.clearRect(0, 0, W, H);

    /* Sand-to-teal gradient base */
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0,   'rgba(220, 200, 160, 0.18)');
    grad.addColorStop(0.45,'rgba(180, 210, 195, 0.12)');
    grad.addColorStop(1,   'rgba(42, 126, 142, 0.08)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    /* Caustic shimmer */
    particles.forEach(p => {
      const x = p.x + Math.sin(t * p.speed + p.phase) * 12;
      const y = p.y + Math.cos(t * p.speed * 0.7 + p.phase) * 8;
      ctx.beginPath();
      ctx.ellipse(x, y, p.r * 2.5, p.r, Math.sin(t * 0.3 + p.phase), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(42, 160, 180, ${p.opacity + Math.sin(t + p.phase) * 0.04})`;
      ctx.fill();
    });

    /* Foam wave at bottom */
    drawFoamWave(t, H);

    /* Shell silhouettes */
    shells.forEach(s => {
      s.angle += s.drift * 0.01;
      ctx.save();
      ctx.translate(s.x + Math.sin(t * 0.2 + s.angle) * 6, s.y);
      ctx.rotate(s.angle);
      ctx.globalAlpha = s.opacity;
      drawShell(ctx, 0, 0, s.size);
      ctx.restore();
    });

    /* Palm shadow streak */
    drawPalmShadow(t);
  }

  function drawFoamWave(t, baseY) {
    for (let wave = 0; wave < 3; wave++) {
      const offset = wave * 28;
      const speed  = 0.4 + wave * 0.12;
      const amp    = 18 - wave * 4;
      const alpha  = 0.06 - wave * 0.015;

      ctx.beginPath();
      ctx.moveTo(0, baseY);
      for (let x = 0; x <= W; x += 6) {
        const y = baseY - offset + Math.sin((x / W) * Math.PI * 3 + t * speed) * amp
                + Math.sin((x / W) * Math.PI * 5 + t * speed * 1.3) * (amp * 0.4);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, baseY);
      ctx.closePath();
      ctx.fillStyle = `rgba(200, 235, 230, ${alpha})`;
      ctx.fill();
    }
  }

  function drawShell(ctx, x, y, size) {
    ctx.beginPath();
    for (let a = 0; a < Math.PI * 4; a += 0.15) {
      const r  = (size / 8) * a;
      const px = x + r * Math.cos(a);
      const py = y + r * Math.sin(a) * 0.6;
      a === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.strokeStyle = 'rgba(160, 120, 80, 1)';
    ctx.lineWidth   = 1;
    ctx.stroke();
  }

  function drawPalmShadow(t) {
    ctx.save();
    ctx.globalAlpha = 0.035;
    ctx.fillStyle   = 'rgba(60, 80, 40, 1)';
    const sway = Math.sin(t * 0.25) * 18;

    /* Left palm shadow */
    ctx.beginPath();
    ctx.moveTo(-30 + sway, 0);
    const leaves = 7;
    for (let i = 0; i < leaves; i++) {
      const angle  = (i / leaves) * Math.PI * 2 + t * 0.08;
      const len    = 160 + Math.sin(angle * 3) * 40;
      ctx.save();
      ctx.translate(-30 + sway, 80);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.ellipse(len / 2, 0, len / 2, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }

  /* ──────────────────────────────
     DEEP SEA
  ────────────────────────────── */
  function initDeepSea() {
    /* Bioluminescent particles */
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.8 + Math.random() * 2.2,
        speed: 0.2 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        drift: (Math.random() - 0.5) * 0.4,
        opacity: 0.3 + Math.random() * 0.5,
        color: Math.random() > 0.3 ? '0, 180, 220' : '0, 100, 255',
      });
    }
    /* Stars */
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H * 0.55,
        r: 0.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.5 + Math.random() * 2,
      });
    }
    /* Fish silhouettes */
    for (let i = 0; i < 5; i++) {
      shells.push({
        x: Math.random() * W,
        y: H * 0.3 + Math.random() * H * 0.5,
        speed: 0.3 + Math.random() * 0.5,
        size: 20 + Math.random() * 30,
        dir: Math.random() > 0.5 ? 1 : -1,
        opacity: 0.06 + Math.random() * 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  function drawDeepSea(t) {
    ctx.clearRect(0, 0, W, H);

    /* Dark depth gradient */
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0,   'rgba(0, 5, 20, 0.3)');
    grad.addColorStop(0.5, 'rgba(0, 15, 40, 0.15)');
    grad.addColorStop(1,   'rgba(0, 30, 60, 0.2)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    /* Stars */
    stars.forEach(s => {
      const alpha = 0.3 + Math.sin(t * s.twinkle + s.phase) * 0.25;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 230, 255, ${alpha})`;
      ctx.fill();
    });

    /* Bioluminescent glow wave at bottom */
    drawGlowWave(t);

    /* Particles rising */
    particles.forEach(p => {
      p.y -= p.speed * 0.4;
      p.x += Math.sin(t * 0.5 + p.phase) * p.drift * 0.3;
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }

      const alpha = p.opacity * (0.6 + Math.sin(t * 1.5 + p.phase) * 0.4);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
      ctx.fill();
      /* Glow halo */
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      grd.addColorStop(0,   `rgba(${p.color}, ${alpha * 0.4})`);
      grd.addColorStop(1,   `rgba(${p.color}, 0)`);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    });

    /* Fish */
    shells.forEach(fish => {
      fish.x += fish.speed * fish.dir;
      if (fish.x > W + 80)  fish.x = -80;
      if (fish.x < -80)     fish.x = W + 80;
      const bobY = fish.y + Math.sin(t * 0.6 + fish.phase) * 8;
      ctx.save();
      ctx.globalAlpha = fish.opacity;
      ctx.translate(fish.x, bobY);
      ctx.scale(fish.dir, 1);
      drawFish(ctx, 0, 0, fish.size);
      ctx.restore();
    });

    /* Kelp strands */
    drawKelp(t);
  }

  function drawGlowWave(t) {
    for (let wave = 0; wave < 4; wave++) {
      const offset = wave * 22;
      const speed  = 0.35 + wave * 0.1;
      const amp    = 20 - wave * 3;

      ctx.beginPath();
      ctx.moveTo(0, H);
      for (let x = 0; x <= W; x += 5) {
        const y = H - offset - 20 +
          Math.sin((x / W) * Math.PI * 3 + t * speed) * amp +
          Math.sin((x / W) * Math.PI * 6 + t * speed * 1.5) * (amp * 0.3);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H);
      ctx.closePath();

      const waveGrad = ctx.createLinearGradient(0, H - offset - 20 - amp, 0, H);
      const intensity = (4 - wave) / 4;
      waveGrad.addColorStop(0, `rgba(0, 160, 255, ${0.12 * intensity})`);
      waveGrad.addColorStop(1, `rgba(0, 80, 200, ${0.04 * intensity})`);
      ctx.fillStyle = waveGrad;
      ctx.fill();

      /* Edge glow */
      ctx.beginPath();
      for (let x = 0; x <= W; x += 5) {
        const y = H - offset - 20 +
          Math.sin((x / W) * Math.PI * 3 + t * speed) * amp +
          Math.sin((x / W) * Math.PI * 6 + t * speed * 1.5) * (amp * 0.3);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(0, 200, 255, ${0.18 * intensity})`;
      ctx.lineWidth   = 1.5;
      ctx.stroke();
    }
  }

  function drawFish(ctx, x, y, size) {
    /* Body */
    ctx.beginPath();
    ctx.ellipse(x, y, size * 0.55, size * 0.28, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 100, 180, 1)';
    ctx.fill();
    /* Tail */
    ctx.beginPath();
    ctx.moveTo(x - size * 0.5, y);
    ctx.lineTo(x - size * 0.85, y - size * 0.3);
    ctx.lineTo(x - size * 0.85, y + size * 0.3);
    ctx.closePath();
    ctx.fill();
  }

  function drawKelp(t) {
    const kelpPositions = [0.08, 0.18, 0.82, 0.92];
    kelpPositions.forEach((xRatio, i) => {
      const baseX = W * xRatio;
      const segments = 14;
      const segH = 28;

      ctx.beginPath();
      ctx.moveTo(baseX, H);
      for (let s = 0; s < segments; s++) {
        const progress = s / segments;
        const sway = Math.sin(t * 0.4 + i * 1.2 + progress * Math.PI) * (20 + progress * 30);
        const sx = baseX + sway;
        const sy = H - s * segH;
        ctx.lineTo(sx, sy);
      }
      ctx.strokeStyle = `rgba(0, 80, 60, ${0.18 - i * 0.01})`;
      ctx.lineWidth   = 4 - i * 0.5;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      ctx.stroke();
    });
  }

  /* ── Main loop ── */
  let startTime = null;
  function loop(ts) {
    if (!startTime) startTime = ts;
    const t = (ts - startTime) / 1000;

    const currentTheme = getTheme();
    if (currentTheme !== theme) { theme = currentTheme; init(); }

    if (theme === 'onshore') drawOnshore(t);
    else                     drawDeepSea(t);

    raf = requestAnimationFrame(loop);
  }

  /* ── Boot ── */
  resize();
  init();
  requestAnimationFrame(loop);
})();
