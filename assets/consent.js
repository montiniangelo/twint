// Consenso cookie (GDPR e Linee guida del Garante sui cookie) con Google Consent Mode v2.
// Senza consenso il sito usa solo strumenti tecnici: Google Ads viene caricato
// esclusivamente dopo il consenso esplicito alla categoria "marketing".
(function () {
  var KEY = 'lc-consent';
  var VERSION = 1;
  var MAX_AGE = 180 * 24 * 3600 * 1000; // 6 mesi, poi la scelta viene richiesta di nuovo
  var AW = 'AW-11200378416';
  var script = document.currentScript;
  var ROOT = (script && script.src || '').replace(/assets\/consent\.js.*$/, '');

  var w = window;
  w.dataLayer = w.dataLayer || [];
  w.gtag = w.gtag || function () { w.dataLayer.push(arguments); };
  w.gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied'
  });

  function read() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY));
      if (c && c.v === VERSION && Date.now() - c.t < MAX_AGE) return c;
    } catch (e) {}
    return null;
  }

  function save(marketing) {
    var c = { v: VERSION, t: Date.now(), marketing: !!marketing };
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
    return c;
  }

  var adsLoaded = false;
  function apply(c) {
    var g = c && c.marketing ? 'granted' : 'denied';
    w.gtag('consent', 'update', { ad_storage: g, ad_user_data: g, ad_personalization: g, analytics_storage: 'denied' });
    if (g === 'granted' && !adsLoaded) {
      adsLoaded = true;
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + AW;
      document.head.appendChild(s);
      w.gtag('js', new Date());
      w.gtag('config', AW);
    }
  }

  // Alla revoca elimina i cookie di conversione già impostati da Google Ads.
  function clearAdsCookies() {
    var host = location.hostname;
    var domains = ['', host, '.' + host.replace(/^www\./, '')];
    document.cookie.split(';').forEach(function (part) {
      var name = part.split('=')[0].trim();
      if (!/^(_gcl_|_gac_)/.test(name)) return;
      domains.forEach(function (d) {
        document.cookie = name + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  var banner = null;
  var returnFocus = null;

  function close() {
    if (banner) { banner.parentNode.removeChild(banner); banner = null; }
    if (returnFocus && returnFocus.focus) { returnFocus.focus(); returnFocus = null; }
  }

  function decide(marketing) {
    var previous = read();
    apply(save(marketing));
    if (!marketing) clearAdsCookies();
    close();
    // Una revoca dopo il caricamento di Google richiede un nuovo caricamento pulito della pagina.
    if (!marketing && previous && previous.marketing && adsLoaded) location.reload();
  }

  function open(fromUser) {
    if (banner) close();
    var c = read();
    banner = document.createElement('section');
    banner.className = 'cc';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'cc-title');
    banner.setAttribute('aria-describedby', 'cc-desc');
    banner.innerHTML =
      '<button type="button" class="cc-x" data-cc="reject" aria-label="Chiudi e rifiuta i cookie non necessari">✕</button>' +
      '<h2 id="cc-title" tabindex="-1">Cookie e privacy</h2>' +
      '<p id="cc-desc">Usiamo solo strumenti tecnici necessari al sito. Con il vostro consenso usiamo anche Google Ads per misurare le campagne pubblicitarie. ' +
      'Potete cambiare idea in qualsiasi momento da “Preferenze cookie” in fondo alla pagina. <a href="' + ROOT + 'privacy.html#cookie">Informativa</a></p>' +
      '<div class="cc-prefs" id="cc-prefs" hidden>' +
        '<div class="cc-row"><input type="checkbox" id="cc-necessary" checked disabled>' +
          '<label for="cc-necessary">Necessari<small>Memorizzano le vostre scelte sui cookie. Sempre attivi.</small></label></div>' +
        '<div class="cc-row"><input type="checkbox" id="cc-marketing"' + (c && c.marketing ? ' checked' : '') + '>' +
          '<label for="cc-marketing">Marketing e misurazione<small>Google Ads: misura delle conversioni delle campagne.</small></label></div>' +
      '</div>' +
      '<div class="cc-actions">' +
        '<button type="button" class="btn btn-ink" data-cc="reject">Rifiuta</button>' +
        '<button type="button" class="btn btn-ink" data-cc="accept">Accetta tutti</button>' +
        '<button type="button" class="btn btn-ghost" data-cc="prefs" aria-expanded="false" aria-controls="cc-prefs">Personalizza</button>' +
        '<button type="button" class="btn btn-ghost" data-cc="save" hidden>Salva preferenze</button>' +
      '</div>';
    document.body.insertBefore(banner, document.body.firstChild);

    banner.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('[data-cc]') : null;
      if (!t) return;
      var action = t.getAttribute('data-cc');
      if (action === 'reject') decide(false);
      else if (action === 'accept') decide(true);
      else if (action === 'save') decide(document.getElementById('cc-marketing').checked);
      else if (action === 'prefs') {
        var prefs = document.getElementById('cc-prefs');
        prefs.hidden = !prefs.hidden;
        t.setAttribute('aria-expanded', prefs.hidden ? 'false' : 'true');
        banner.querySelector('[data-cc="save"]').hidden = prefs.hidden;
        if (!prefs.hidden) document.getElementById('cc-marketing').focus();
      }
    });

    if (fromUser) {
      var prefs = document.getElementById('cc-prefs');
      prefs.hidden = false;
      banner.querySelector('[data-cc="prefs"]').setAttribute('aria-expanded', 'true');
      banner.querySelector('[data-cc="save"]').hidden = false;
      banner.querySelector('#cc-title').focus();
    }
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-cc-open]') : null;
    if (!t) return;
    e.preventDefault();
    returnFocus = t;
    open(true);
  });

  var stored = read();
  if (stored) apply(stored);
  else open(false);
})();
