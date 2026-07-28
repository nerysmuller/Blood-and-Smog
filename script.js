(() => {
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const transition = document.getElementById('pageTransition');
      if (!transition) return;
      event.preventDefault();
      transition.classList.add('active');
      setTimeout(() => { window.location.href = link.href; }, 430);
    });
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && !document.body.classList.contains('landing-page')) {
    const makeDrop = () => {
      const drop = document.createElement('i');
      drop.setAttribute('aria-hidden', 'true');
      Object.assign(drop.style, {
        position:'fixed', zIndex:'-1', top:'-80px', left:`${5 + Math.random()*90}%`, width:`${2+Math.random()*4}px`,
        height:`${45+Math.random()*120}px`, borderRadius:'60% 60% 50% 50%', pointerEvents:'none',
        background:'linear-gradient(#7b0f17,#2b0509)', opacity:String(.18+Math.random()*.22),
        transition:'transform 10s linear, opacity 2s ease 8s'
      });
      document.body.appendChild(drop);
      requestAnimationFrame(() => { drop.style.transform = `translateY(${window.innerHeight + 220}px)`; drop.style.opacity = '0'; });
      setTimeout(() => drop.remove(), 11000);
    };
    setInterval(makeDrop, 12000);
  }
})();
