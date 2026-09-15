# Generatore delle pagine di lybercode.com

Le pagine pubbliche (home, aree di servizio, casi, approfondimenti, chi siamo,
contatti, privacy) sono HTML statico generato da questi sorgenti, così header,
footer, menu e metadati restano identici su tutte le pagine.

- `src/*.html` — contenuto di ogni pagina. La prima riga è un commento con i
  metadati in JSON (percorso, titolo, description, voce di menu, breadcrumb).
  `{R}` diventa il prefisso relativo verso la radice del sito.
- `build.py` — layout comune (head, header, footer, fascia CTA) e generazione.

Rigenerare dalla radice del repository:

```bash
python3 tools/sito/build.py .
```

Stile e script condivisi: `assets/site.css`, `assets/site.js`.
Dopo l'aggiunta di una pagina aggiornare `sitemap.xml`.
