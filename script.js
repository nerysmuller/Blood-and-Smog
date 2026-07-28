(() => {
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const transition = document.getElementById('pageTransition'); if (!transition) return;
      event.preventDefault(); transition.classList.add('active');
      setTimeout(() => { window.location.href = link.href; }, 430);
    });
  });

  if (!document.body.classList.contains('landing-page')) {
    const candelabraMarkup = side => `<div class="candelabra ${side}" aria-hidden="true"><i class="stem"></i><i class="base"></i><i class="arm"></i><i class="arm second"></i><i class="candle one"><b class="flame"></b></i><i class="candle two"><b class="flame"></b></i><i class="candle three"><b class="flame"></b></i></div>`;
    document.body.insertAdjacentHTML('beforeend', candelabraMarkup('left') + candelabraMarkup('right') + '<i class="edge-blood left" aria-hidden="true"></i><i class="edge-blood right" aria-hidden="true"></i>');
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && !document.body.classList.contains('landing-page')) {
    const makeDrop = () => {
      const drop = document.createElement('i'); drop.setAttribute('aria-hidden', 'true');
      const edge = Math.random() > .5 ? 1 + Math.random()*4 : 95 + Math.random()*4;
      Object.assign(drop.style, {
        position:'fixed', zIndex:'1', top:'-120px', left:`${edge}%`, width:`${3+Math.random()*5}px`,
        height:`${70+Math.random()*170}px`, borderRadius:'60% 60% 50% 50%', pointerEvents:'none',
        background:'linear-gradient(#8e111d,#300208)', opacity:String(.26+Math.random()*.28),
        filter:'drop-shadow(0 0 6px rgba(81,0,8,.7))', transition:'transform 12s cubic-bezier(.28,.01,.62,1), opacity 2s ease 10s'
      });
      document.body.appendChild(drop);
      requestAnimationFrame(() => { drop.style.transform = `translateY(${window.innerHeight + 300}px) scaleY(1.18)`; drop.style.opacity = '0'; });
      setTimeout(() => drop.remove(), 13000);
    };
    setTimeout(makeDrop, 1800); setInterval(makeDrop, 8500);
  }
})();
