// Menu mobile. Il contenuto resta completo e navigabile anche senza JavaScript.
document.documentElement.classList.add('js');
(function () {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  btn.hidden = false;
  nav.classList.remove('open');
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? 'Chiudi' : 'Menu';
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = 'Menu';
      btn.focus();
    }
  });
})();

// Scadenze annuali nella hero: giorni mancanti alla prossima occorrenza.
(function () {
  var items = document.querySelectorAll('[data-deadline]');
  if (!items.length) return;
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  Array.prototype.forEach.call(items, function (li) {
    var parts = li.getAttribute('data-deadline').split('-');
    var next = new Date(today.getFullYear(), parseInt(parts[0], 10) - 1, parseInt(parts[1], 10));
    if (next < today) next.setFullYear(next.getFullYear() + 1);
    var days = Math.round((next - today) / 86400000);
    var out = li.querySelector('.obl-count');
    if (!out) return;
    out.textContent = days === 0 ? 'Scade oggi' : days === 1 ? 'Manca 1 giorno' : 'Mancano ' + days + ' giorni';
    if (days <= 30) li.classList.add('soon');
  });
})();
