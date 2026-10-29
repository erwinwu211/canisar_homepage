(() => {
  'use strict';
  const figure = document.querySelector('.interaction-visual');
  const image = figure?.querySelector('.companion');
  if (!image) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-particles';
  canvas.setAttribute('aria-hidden', 'true');
  const context = canvas.getContext('2d');
  if (!context) return;
  figure.append(canvas);
  const sample = window.canisarParticleData;
  if (!sample) return;
  const pixels = Uint8Array.from(atob(sample.rgb), (character) => character.charCodeAt(0));
  let particles = [], width = 0, height = 0, frame = 0, lastTime = 0;
  let visible = true, ready = false;
  const pointer = { x: -1000, y: -1000, active: false };

  function draw() {
    context.clearRect(0, 0, width, height);
    for (const p of particles) {
      context.fillStyle = p.color;
      context.fillRect(p.x, p.y, p.size, p.size);
    }
  }

  function animate(time) {
    frame = 0;
    if (!visible || document.hidden || motion.matches || !ready) return;
    const dt = Math.min((time - lastTime) / 16.667 || 1, 2);
    lastTime = time;
    const radius = Math.min(width * 0.12, 77.5);
    let moving = false;
    for (const p of particles) {
      if (pointer.active) {
        const dx = p.x - pointer.x, dy = p.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < radius) {
          const angle = distance > 0.1 ? Math.atan2(dy, dx) : p.angle;
          // Smooth at both the center and outer edge; varied response keeps
          // a soft cloud of particles instead of clearing a circular hole.
          const falloff = (1 - (distance / radius) ** 2) ** 3;
          const response = p.response;
          const force = falloff * 2.6 * response;
          const outward = Math.min(distance / (radius * 0.3), 1);
          const direction = angle + p.deflection + Math.sin(time * 0.0012 + p.angle) * 0.3;
          const drift = Math.sin(time * p.frequency + p.angle) * 0.85;
          p.vx += (Math.cos(direction) * outward - Math.sin(direction) * drift) * force * dt;
          p.vy += (Math.sin(direction) * outward + Math.cos(direction) * drift) * force * dt;
        }
      }
      p.vx = (p.vx + (p.homeX - p.x) * 0.018 * dt) * Math.pow(0.88, dt);
      p.vy = (p.vy + (p.homeY - p.y) * 0.018 * dt) * Math.pow(0.88, dt);
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (Math.abs(p.x - p.homeX) + Math.abs(p.y - p.homeY) + Math.abs(p.vx) + Math.abs(p.vy) > 0.08) moving = true;
      else { p.x = p.homeX; p.y = p.homeY; p.vx = p.vy = 0; }
    }
    draw();
    if (pointer.active || moving) frame = requestAnimationFrame(animate);
  }

  function wake() {
    if (!frame && ready && visible && !document.hidden && !motion.matches) {
      lastTime = performance.now();
      frame = requestAnimationFrame(animate);
    }
  }

  function rebuild() {
    if (!image.naturalWidth || motion.matches) {
      figure.classList.remove('particles-ready');
      ready = false;
      return;
    }
    width = image.clientWidth;
    height = image.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Dense image-colored samples retain the original contours and fingertip glow.
    const step = width / sample.width;
    particles = [];
    for (let y = 0; y < sample.height; y++) {
      for (let x = 0; x < sample.width; x++) {
        const i = (y * sample.width + x) * 3;
        const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
        const light = Math.max(r, g, b);
        if (light < 33) continue;
        const homeX = x * step, homeY = y * step;
        particles.push({ x: homeX, y: homeY, homeX, homeY, vx: 0, vy: 0,
          angle: (x * 7.13 + y * 3.71) % (Math.PI * 2),
          response: 0.2 + Math.random() * 1.15,
          deflection: (Math.random() - 0.5) * 1.8,
          frequency: 0.001 + Math.random() * 0.002,
          size: step * (light > 110 ? 1.05 : 0.83), color: `rgb(${r},${g},${b})` });
      }
    }
    ready = true;
    draw();
    figure.classList.add('particles-ready');
    wake();
  }
  figure.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    const bounds = canvas.getBoundingClientRect();
    pointer.x = event.clientX - bounds.left;
    pointer.y = event.clientY - bounds.top;
    pointer.active = true;
    wake();
  });
  function leave() { pointer.active = false; wake(); }
  figure.addEventListener('pointerleave', leave);
  figure.addEventListener('pointercancel', leave);
  window.addEventListener('blur', leave);
  motion.addEventListener('change', rebuild);
  document.addEventListener('visibilitychange', () => { pointer.active = false; wake(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) pointer.active = false;
      wake();
    }).observe(figure);
  }
  new ResizeObserver(rebuild).observe(image);
  image.addEventListener('load', rebuild);
  if (image.complete) rebuild();
})();
