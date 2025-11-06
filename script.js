(function(){
  // Copyright dinâmico
  const copyrightEl = document.getElementById('copyright');
  if (copyrightEl) {
    copyrightEl.textContent = `© ${new Date().getFullYear()} KL Company — Todos os direitos reservados.`;
  }

  // Sticky buy bar (aparece quando sai da dobra do herói)
  const sticky = document.getElementById('sticky');
  const hero = document.querySelector('.hero');
  if (sticky && hero) {
    const io = new IntersectionObserver(([entry]) => {
      sticky.style.display = entry.isIntersecting ? 'none' : 'flex';
    }, { threshold: 0.15 });
    io.observe(hero);
  }

  // Rolagem suave para âncoras
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id && id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // UX botão de compra
  const buyBtn = document.getElementById('buyBtn');
  if (buyBtn) {
    buyBtn.addEventListener('click',()=>{
      const original = buyBtn.textContent;
      buyBtn.textContent='Abrindo checkout…';
      buyBtn.setAttribute('aria-busy','true');
      setTimeout(()=>{
        buyBtn.textContent=original;
        buyBtn.removeAttribute('aria-busy');
      }, 3500);
    });
  }

  // Contagem regressiva (24h a partir da visita)
  const cd = document.getElementById('countdown');
  if (cd) {
    const end = Date.now() + 24*60*60*1000; // 24h
    const pad = (n)=> String(n).padStart(2,'0');
    const tick = () => {
      const t = Math.max(0, end - Date.now());
      const h = Math.floor(t/3.6e6), m = Math.floor(t%3.6e6/6e4), s = Math.floor(t%6e4/1e3);
      cd.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
      if (t > 0) requestAnimationFrame(()=>setTimeout(tick, 250));
    };
    tick();
  }
})();