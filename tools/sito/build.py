#!/usr/bin/env python3
"""Genera le pagine statiche di lybercode.com dai frammenti in src/.

Ogni frammento inizia con una riga  <!-- {json} -->  con i metadati,
seguita dal contenuto di <main>. Il segnaposto {R} diventa il prefisso
relativo verso la radice del sito.
"""
import json, pathlib, re, sys, html

SRC = pathlib.Path(__file__).parent / 'src'
OUT = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '.')
BASE = 'https://lybercode.com/'

NAV = [
    ('monitoraggio', 'Monitoraggio ICT', 'monitoraggio-contratti-ict/'),
    ('audit', 'Audit', 'audit-servizi-digitali/'),
    ('accessibilita', 'Accessibilità', 'accessibilita/'),
    ('verifica', 'Verifica tecnica', 'verifica-tecnica/'),
    ('pa', 'Supporto PA', 'supporto-pa/'),
    ('casi', 'Casi', 'casi/'),
    ('approfondimenti', 'Approfondimenti', 'approfondimenti/'),
    ('lybercode', 'LyberCode', 'lybercode/'),
]

# Google Ads non viene più caricato qui: lo carica assets/consent.js solo dopo il consenso.

CTA = """
<section class="section dark cta-band" aria-labelledby="cta-title">
  <div class="wrap">
    <div>
      <p class="eyebrow">Valutazione preliminare</p>
      <h2 id="cta-title">{cta_title}</h2>
      <p class="muted">Descriveteci il servizio o il contratto. Vi rispondiamo con una prima lettura del perimetro e con le verifiche che avrebbe senso fare. Nessun impegno.</p>
    </div>
    <div class="actions">
      <a class="btn btn-primary" href="{R}contatti/">Richiedi una valutazione <span class="arr" aria-hidden="true">→</span></a>
      <a class="btn btn-ghost" href="tel:+390773061194">Parla con un consulente</a>
    </div>
  </div>
</section>"""


def page(meta, body):
    path = meta['path']
    depth = path.count('/')
    R = '../' * depth
    url = BASE + re.sub(r'index\.html$', '', path)
    title = meta['title']
    desc = meta['description']
    current = meta.get('nav')

    items = []
    for key, label, href in NAV:
        cur = ' aria-current="page"' if key == current else ''
        items.append(f'<li><a href="{R}{href}"{cur}>{label}</a></li>')
    cur = ' aria-current="page"' if current == 'contatti' else ''
    items.append(f'<li class="nav-cta"><a href="{R}contatti/"{cur}>Richiedi una valutazione</a></li>')

    crumbs_html, crumbs_ld = '', ''
    if meta.get('crumbs'):
        trail = [['Home', '']] + meta['crumbs']
        lis = []
        for i, (label, href) in enumerate(trail):
            if i == len(trail) - 1:
                lis.append(f'<li aria-current="page">{label}</li>')
            else:
                lis.append(f'<li><a href="{R}{href}">{label}</a></li>')
        crumbs_html = '<nav class="crumbs" aria-label="Percorso"><ol>' + ''.join(lis) + '</ol></nav>'
        crumbs_ld = json.dumps({
            '@context': 'https://schema.org', '@type': 'BreadcrumbList',
            'itemListElement': [
                {'@type': 'ListItem', 'position': i + 1, 'name': html.unescape(l), 'item': BASE + h}
                for i, (l, h) in enumerate(trail)
            ]}, ensure_ascii=False)

    body = body.replace('{CRUMBS}', crumbs_html)
    if meta.get('cta', True):
        body += CTA.replace('{cta_title}', meta.get('cta_title', 'Il fornitore dice che funziona. Verifichiamolo.'))
    body = body.replace('{R}', R)

    ld = [crumbs_ld] if crumbs_ld else []
    for block in meta.get('jsonld', []):
        ld.append(json.dumps(block, ensure_ascii=False))
    ld_html = ''.join(f'\n<script type="application/ld+json">{b}</script>' for b in ld)
    robots = meta.get('robots', 'index, follow')
    og_type = meta.get('og_type', 'website')

    return f"""<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="robots" content="{robots}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="{og_type}">
<meta property="og:site_name" content="LyberCode">
<meta property="og:locale" content="it_IT">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{url}">
<meta name="twitter:card" content="summary">
<link rel="icon" href="{R}faviconz.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{R}assets/site.css">{ld_html}
</head>
<body>
<a class="skip" href="#contenuto">Vai al contenuto</a>
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="{R}" aria-label="LyberCode, home"><img src="{R}assets/mark.png" alt="" width="34" height="29"><span>LyberCode<small>Verifica e monitoraggio ICT</small></span></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" hidden>Menu</button>
    <nav id="site-nav" class="nav open" aria-label="Principale"><ul>{''.join(items)}</ul></nav>
  </div>
</header>
<main id="contenuto" tabindex="-1">
{body}
</main>
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <p style="color:#fff;font-weight:600;font-size:1.1rem;margin-bottom:8px">LyberCode</p>
        <p>Verifica indipendente, monitoraggio dei contratti ICT, audit e accessibilità dei servizi digitali per Pubbliche Amministrazioni e organizzazioni strutturate.</p>
        <p>Fornitore MEPA dal 2018. Sedi operative a Roma e Terracina.</p>
      </div>
      <div>
        <h2>Servizi</h2>
        <ul>
          <li><a href="{R}monitoraggio-contratti-ict/">Monitoraggio contratti ICT</a></li>
          <li><a href="{R}audit-servizi-digitali/">Audit servizi digitali</a></li>
          <li><a href="{R}accessibilita/">Accessibilità</a></li>
          <li><a href="{R}verifica-tecnica/">Verifica tecnica</a></li>
          <li><a href="{R}supporto-pa/">Supporto alla PA</a></li>
        </ul>
      </div>
      <div>
        <h2>Risorse</h2>
        <ul>
          <li><a href="{R}casi/">Casi e progetti</a></li>
          <li><a href="{R}approfondimenti/">Approfondimenti</a></li>
          <li><a href="{R}lybercode/">Chi siamo</a></li>
          <li><a href="{R}contatti/">Contatti</a></li>
        </ul>
      </div>
      <div>
        <h2>Contatti</h2>
        <ul>
          <li><a href="mailto:hello@lybercode.com">hello@lybercode.com</a></li>
          <li><a href="tel:+390773061194">0773 061194</a> · Terracina</li>
          <li><a href="tel:+390686169575">06 86 16 95 75</a> · Roma</li>
          <li><a href="https://www.linkedin.com/company/lybercode/" rel="noopener">LinkedIn</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-legal">
      <span>© 2026 LyberCode di Angelo Montini</span>
      <span>P. IVA 11822551005</span>
      <span>REA LT-331862</span>
      <span>Viale Europa 216, 04019 Terracina (LT)</span>
      <a href="{R}privacy.html">Privacy</a>
      <button type="button" class="cc-link" data-cc-open>Preferenze cookie</button>
      <a href="https://angelomontini.com" rel="noopener">Angelo Montini, consulenza personale ↗</a>
    </div>
  </div>
</footer>
<script src="{R}assets/consent.js"></script>
<script src="{R}assets/site.js"></script>
</body>
</html>
"""


def main():
    urls = []
    for f in sorted(SRC.glob('*.html')):
        raw = f.read_text(encoding='utf-8')
        m = re.match(r'\s*<!--\s*(\{.*?\})\s*-->\s*', raw, re.S)
        if not m:
            sys.exit(f'metadati mancanti: {f.name}')
        meta = json.loads(m.group(1))
        out = OUT / meta['path']
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(page(meta, raw[m.end():]), encoding='utf-8')
        if meta.get('robots', 'index') .startswith('index'):
            urls.append((re.sub(r'index\.html$', '', meta['path']), meta.get('priority', '0.7')))
        print('scritto', meta['path'])
    (pathlib.Path(__file__).parent / 'urls.json').write_text(json.dumps(urls))


if __name__ == '__main__':
    main()
