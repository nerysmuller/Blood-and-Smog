(() => {
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const transition = document.getElementById('pageTransition'); if (!transition) return;
      event.preventDefault(); transition.classList.add('active');
      setTimeout(() => { window.location.href = link.href; }, 430);
    });
  });

  // Ambient motion is handled entirely in CSS: layered fog and falling ash.
})();
