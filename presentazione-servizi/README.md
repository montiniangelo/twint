# Brochure digitale — Angelo Montini

Landing page one-page a scorrimento, pensata per essere inviata come URL dedicato a lead e prospect.
Grafica allineata al sistema visivo di **lybercode.com** (`~/Documents/lybercode`).

## Cosa c'è dentro

```
brochure/
├── index.html          pagina unica, contenuto completo anche senza JS
├── assets/styles.css   design system (nessun framework)
├── assets/app.js       reveal allo scroll + barra di avanzamento (~1,5 KB)
├── assets/loghi/       loghi committenti (copiati da lybercode.com) + marchio LyberCode
└── assets/copertina-*.jpg   copertine dei due libri (da angelomontini.com, ridimensionate a 420px)
```

Sito statico auto-contenuto: nessun build step, nessuna dipendenza runtime.
Unica risorsa esterna: Google Fonts (Inter, `display=swap`) — la stessa famiglia usata su lybercode.com.

## Anteprima locale

```bash
python3 -m http.server 4321 --directory brochure
```

Poi apri http://localhost:4321

## Pubblicazione

Qualsiasi hosting statico (Netlify, Cloudflare Pages, Vercel, o una cartella su hosting
tradizionale). Suggerito un URL dedicato e stabile, es. `https://www.angelomontini.com/brochure/`
o un sottodominio. Serve HTTPS.

Prima di pubblicare, sostituire negli `<meta property="og:*">` l'URL definitivo e aggiungere
un'immagine di anteprima (`og:image`, 1200×630): è ciò che si vede quando il link viene
incollato in WhatsApp o LinkedIn.

## Sistema grafico (coerente con lybercode.com)

Tutti i token sono ripresi dal sito LyberCode, così la brochure non sembra un corpo estraneo:

| elemento | valore |
|---|---|
| tipografia | Inter 400–800, titoli 800 con `letter-spacing: -0.02em` |
| accento | `#0066cc`, chiaro `#66b3ff`, pallido `#bfe0ff`, tinta `rgba(0,102,204,.08)` |
| testo | `#0a0a0a` · secondario `#5b5f66` · bordi `#e5e5e5` |
| fondi | `#ffffff` alternato a `#f9fafb`, blocchi grigi `#f5f5f7` |
| blocchi scuri | `linear-gradient(135deg,#0a0a0a,#10233b)` (contatti) e `#004c99 → #00223f` (copertina) |
| forme | card 22–32px di raggio, bottoni e badge a pillola (999px) |
| ombre | morbide e blu sugli elementi accento, hover `translateY(-6px)` |
| motivi | eyebrow maiuscolo blu, pill-badge con pallino pulsante, liste con `✓`, numeri giganti translucidi |
| reveal | `translateY(28px)` + fade, 0.7s |

L'unica aggiunta al sistema è il **monospaziato di sistema** (nessun font scaricato), usato solo
dentro i due "oggetti macchina": il terminale della sezione 01 e le chiavi dell'estrazione.
Serve a distinguere ciò che scrive una macchina da ciò che legge una persona.

## Struttura narrativa

1. **Copertina** — schermata intera con l'etichetta "Presentazione servizi 2026/2027", il nome e la
   *scheda entità*: gli stessi dati letti da una persona (titolo) e da una macchina (coppie
   chiave/valore). Dimostra la prima condizione del metodo mentre si presenta il professionista.
   Doppia azione: chiamata diretta e check-up.
2. **01 · Il problema** — "Un chatbot sta già rispondendo al posto tuo", con il terminale che mostra
   il sito escluso dalle fonti citabili.
3. **02 · Referenze** — loghi reali dei committenti istituzionali + mappa dei clienti privati.
4. **03 · Chi è** — consulente e sviluppatore nella stessa persona.
5. **04 · Due attività** — Officina Digitale e LyberCode, collegamento dichiarato.
6. **05 · Il metodo** — le cinque condizioni verificabili.
7. **Elemento chiave** — *"Lo stesso paragrafo, letto due volte"*: a sinistra la prosa aziendale su
   fondo bianco, a destra ciò che una macchina estrae davvero. Una linea di scansione attraversa il
   testo, le parti recuperabili si evidenziano una a una e i frammenti compaiono a destra — tre dati
   utili e tre campi barrati. È la dimostrazione del problema, non la sua descrizione.
8. **06 · Livelli di servizio** — Check-up → Revamping → GEO, con il terzo livello in evidenza.
9. **07 · I libri** — i due titoli della collana Next con copertine reali, dati di pubblicazione e
   link ad Amazon: il saggio *Invisibili all'Intelligenza Artificiale* (84 pagine, 18 agosto 2026,
   ASIN B0HFNV27TR) e il romanzo *Nessuna azione richiesta* (111 pagine, 3 agosto 2026,
   ASIN B0H8M66ZTF). Il prezzo non è riportato di proposito: cambia, e il sito stesso rimanda ad
   Amazon per quello valido.
10. **08 · Perché adesso** — tre motivi per non rimandare, chiusi dall'argomento del check-up.
11. **09 · Chiama** — numero di telefono gigante e cliccabile, WhatsApp, email, sedi.

L'azione telefonica è presente in tre punti: header sticky (sempre visibile), copertina e chiusura.

## Accessibilità

- Contenuto completo e leggibile **senza JavaScript**
- `prefers-reduced-motion: reduce` rispettato (stessa regola globale usata su lybercode.com)
- Contrasto ≥ AA su tutte le combinazioni; il titolo in azzurro sulla copertina è testo grande (≥ 3:1)
- Focus da tastiera sempre visibile, con colore alternato su fondo chiaro/scuro
- Skip link, landmark semantici, un solo `<h1>`, gerarchia dei titoli regolare
- Loghi con `alt=""` perché il nome del committente è scritto accanto (evita la doppia lettura)
- SVG della mappa con `<title>`/`<desc>`; decorazioni marcate `aria-hidden`
- Foglio di stampa: i blocchi scuri diventano leggibili su carta

## Performance

- Zero librerie, zero framework; un solo font esterno (Inter)
- Loghi PNG (~200 KB) e copertine JPEG (~83 KB) con `loading="lazy"` e `width`/`height` espliciti:
  nessun layout shift. Convertirli in WebP dimezzerebbe il peso — unica ottimizzazione residua
- Reveal via `IntersectionObserver` con `unobserve` dopo il primo trigger
- Barra di avanzamento su listener `passive` + `requestAnimationFrame`
- JSON-LD: `Person`, due `ProfessionalService` e due `Book` con pagine, data di pubblicazione e
  `sameAs` verso Amazon

## Da confermare prima della pubblicazione

1. **Uso dei loghi.** I loghi dei committenti sono quelli già pubblicati su lybercode.com e qui sono
   presentati come rapporti contrattuali. Resta da verificare caso per caso se serve
   un'autorizzazione formale all'uso del marchio, in particolare per Gallerie degli Uffizi e per
   l'area ANCI / IFEL / Ancitel.
2. **Condizioni del check-up.** La CTA non promette né gratuità né tempi, perché non erano nel brief.
   Se il check-up è gratuito o ha una durata dichiarata ("in 24 ore", "senza impegno"), dirlo
   esplicitamente rende la sezione 09 sensibilmente più efficace: è una riga da aggiungere.
3. **"7+ città servite".** Sono le sette città nominate nel brief (Roma, Milano, Reggio Calabria,
   Fiumicino, Rieti, Viterbo, Perugia); il brief dice "e altre città", da cui il "+".
   Sulla mappa Roma e Terracina sono in blu pieno come sedi operative.
4. **Descrizione dei committenti.** I nomi sono riportati come sul sito LyberCode. Se preferisci
   indicare il tipo di intervento realizzato per ciascuno, sono dieci stringhe da sostituire.

## Dati ripresi dai siti ufficiali

Presi da angelomontini.com e lybercode.com, non inventati: i due libri (titoli, sottotitoli, pagine,
date, ASIN, copertine), i loghi dei committenti, la partita IVA **11822551005** e il **REA LT-331862**
— ora dichiarati nel footer e nella riga che collega le due attività, coerentemente con la quinta
condizione del metodo ("informazioni dichiarate"). Il canale WhatsApp della CTA è lo stesso numero
già pubblicato su lybercode.com.
