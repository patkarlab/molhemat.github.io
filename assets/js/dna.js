/* Subtle falling-nucleotide background (A/T/G/C with rare red "mutations") */
(function () {
  const canvas = document.getElementById("dna");
  if (!canvas) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduced.matches) return;

  const ctx = canvas.getContext("2d");
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const SPEED = isMobile ? 0.22 : 0.4;
  const LIFE = 2800;
  const MUT = 0.03;
  const COLW = isMobile ? 48 : 34;
  const bases = ["A", "T", "G", "C"];
  let cols = [], raf = null, last = 0;
  const fpsDelay = 1000 / (isMobile ? 30 : 60);

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(innerWidth * dpr);
    canvas.height = Math.floor(innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function newCol(i) {
    const fs = (isMobile ? 13 : 16) + Math.random() * (isMobile ? 16 : 24);
    return {
      x: i * COLW + COLW / 2,
      y: Math.random() * innerHeight,
      speed: (0.8 + Math.random() * 1.2) * SPEED,
      fs, step: fs * (1.3 + Math.random() * 0.4),
      depth: 0.6 + Math.random() * 0.8,
      lastY: 0, trail: [],
    };
  }

  function rebuild() {
    const n = Math.min(Math.max(1, Math.floor(innerWidth / COLW)), isMobile ? 11 : 34);
    cols = Array.from({ length: n }, (_, i) => { const c = newCol(i); c.lastY = c.y; return c; });
  }

  function draw(now) {
    if (now - last < fpsDelay) { raf = requestAnimationFrame(draw); return; }
    last = now;
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    cols.forEach((col, idx) => {
      col.y += col.speed * col.depth;
      while (col.y - col.lastY >= col.step) {
        col.lastY += col.step;
        const mut = Math.random() < MUT;
        col.trail.push({
          x: col.x, y: col.lastY,
          char: bases[(Math.random() * 4) | 0],
          color: mut ? "#d80000" : "rgb(10,30,120)",
          size: col.fs, born: now,
        });
      }
      if (col.y > innerHeight + col.step) {
        const nx = newCol(idx); nx.y = 0; nx.lastY = -nx.step; cols[idx] = nx;
      }
      const alive = [];
      for (const g of col.trail.slice(0, isMobile ? 8 : 14)) {
        const age = now - g.born;
        if (age <= LIFE) {
          const t = age / LIFE;
          ctx.globalAlpha = (1 - (1 - (1 - t) * (1 - t))) * 0.8;
          ctx.font = `${g.size}px ui-monospace,monospace`;
          ctx.fillStyle = g.color;
          ctx.fillText(g.char, g.x, g.y);
          alive.push(g);
        }
      }
      col.trail = alive;
    });

    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(draw);
  }

  resize(); rebuild();
  raf = requestAnimationFrame(draw);

  let rt;
  addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { resize(); rebuild(); }, 250); });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && raf) { cancelAnimationFrame(raf); raf = null; }
    else if (!document.hidden && !raf) raf = requestAnimationFrame(draw);
  });
})();
