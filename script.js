(function(){
  // ======= CONFIG: defina aqui seu checkout da Cakto =======
  const CHECKOUT_URL = "https://pay.cakto.com.br/SEU_CHECKOUT"; // TROQUE pelo seu link

  // Aplica o link de checkout em todos os botões .js-buy
  document.querySelectorAll('.js-buy').forEach(a => {
    a.setAttribute('href', CHECKOUT_URL);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
  });

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

  // Rolagem suave para âncoras (em links internos)
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

  // ======= Mobile menu (hambúrguer + off-canvas) =======
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const backdrop  = document.getElementById('navBackdrop');

  function openMenu(){
    hamburger.classList.add('active');
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    backdrop.hidden = false;
    requestAnimationFrame(()=>backdrop.classList.add('show'));
    document.documentElement.style.overflow = 'hidden'; // bloqueia scroll
  }
  function closeMenu(){
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    backdrop.classList.remove('show');
    setTimeout(()=>backdrop.hidden = true, 200);
    document.documentElement.style.overflow = ''; // libera scroll
  }

  hamburger?.addEventListener('click', ()=>{
    const isOpen = mobileNav.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });
  backdrop?.addEventListener('click', closeMenu);
  // Fecha ao clicar em qualquer link do menu
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  // Fecha com ESC
  window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeMenu(); });

  // UX botão de compra (texto de carregando)
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
