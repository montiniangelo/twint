/* Brochure Angelo Montini — nessuna dipendenza.
   Il contenuto è già completo senza JS: questo file aggiunge solo
   i reveal allo scroll e la barra di avanzamento lettura. */
(function () {
  'use strict';

  var targets = document.querySelectorAll('.reveal, .cover, #problema, .extractor, .geo-map');

  function showAll() {
    for (var i = 0; i < targets.length; i++) targets[i].classList.add('is-in');
  }

  if (!('IntersectionObserver' in window)) {
    showAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);   // una sola volta: niente animazioni in loop
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });
    // threshold 0: anche le sezioni piu' alte del viewport si rivelano sempre

    for (var i = 0; i < targets.length; i++) io.observe(targets[i]);
  }

  /* barra di avanzamento */
  var bar = document.getElementById('progress-bar');
  if (bar) {
    var ticking = false;
    var update = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      bar.style.width = pct.toFixed(2) + '%';
      ticking = false;
    };
    addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
    update();
  }
})();
