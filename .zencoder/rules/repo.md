---
description: Repository Information Overview
alwaysApply: true
---

# LyberCode Website Information

## Summary
LyberCode is an Italian IT consulting company website repository containing a static website for presenting IT consulting services including software development, cloud computing, cybersecurity, data analytics, and AI solutions for businesses and public administration (PA). The repository includes the company website with multiple pages dedicated to different service offerings and institutional clients.

## Structure
The repository is organized as a static website with the following structure:

### Root Directory Components
- **HTML Pages** (`*.html`): Main website pages with embedded CSS styling
- **Assets Directory** (`loghi/`, `robot/`, `pdf/`): Supporting resources
- **Static Files**: Images (PNG, JPG) and PDF documents
- **Configuration Files**: README.md with basic project description

### Main Website Pages
- **index.html** (1566 lines): Main company homepage presenting LyberCode consulting services, covering development, cloud, cybersecurity, AI, and data analytics. Includes institutional clients section with logos.
- **monitor.html** (1032 lines): Dedicated page for contract monitoring services for Public Administration, focusing on ICT and green public procurement monitoring according to AGID guidelines.
- **sviluppo.html** (1146 lines): Web development and applications services page, covering web development, Google Cloud Platform, AI/ML, digital training, sustainable web marketing, and technical support.
- **news.html** (621 lines): News and updates page for company announcements and project information.

### Asset Directories
- **loghi/**: Contains logos of institutional clients and partner organizations (ANCI, APS, BIC, IFEL, Piemme, Socio, Granatieri, Gallerie, Ancitel, AnciteleA)
- **robot/**: Contains PNG images (2-6) used in website content
- **pdf/**: Contains documentation files:
  - gestione-documentale-albo.pdf
  - gestione-documentale-protocollo.pdf
  - gestione-documentale-scuola.pdf
  - servizio-amm-trasparente.pdf
  - sito-web-scuola.pdf

## Specification & Tools
**Type**: Static HTML Website  
**Format**: HTML5 with embedded CSS  
**Styling System**: CSS embedded in HTML `<style>` tags  
**Font Framework**: Google Fonts (Space Grotesk: weights 400, 500, 600, 700)  
**Target Language**: Italian (lang="it")  
**Browser Support**: Modern browsers (HTML5/CSS3 compatible)

## Key Resources

### Main Files
- **index.html**: Company homepage and main entry point
- **monitor.html**: PA contract monitoring services page
- **sviluppo.html**: Web development services page
- **news.html**: News and updates section
- **README.md**: Project description ("twint - sito aziendale")

### Design Configuration
**Color Scheme** (CSS Variables):
- Primary: `#101e2e` (Dark blue-gray)
- Secondary: `#23a5b1` (Teal accent)
- Accent: `#0b1520` (Very dark blue)
- Text: `#ffffff` (White)
- Muted: `#e7e9ee` (Light gray)

**Typography**: Space Grotesk font family with fallbacks to Helvetica Neue, Arial, sans-serif  
**Branding**: Logo implemented as inline SVG with lightning bolt emoji (⚡)

### Image Assets
- **Logo Files**: logo.png, logow.png, logoq.png, logox.png (company branding variations)
- **Photos**: dash.jpg (dashboard image), x.jpg, y.jpg (promotional images)
- **Client Logos**: 10+ institutional client logos in loghi/ directory
- **Documentation Images**: 6 PNG screenshots in robot/ directory

## Usage & Operations

### Development Server
To serve the website locally:
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

### File Serving
- Access website at `http://localhost:8000/index.html`
- All HTML pages are self-contained with embedded CSS
- No external dependencies beyond Google Fonts CDN

### SEO & Meta Configuration
All HTML pages include:
- UTF-8 character encoding
- Responsive viewport settings
- Comprehensive meta descriptions and keywords (Italian language)
- Open Graph (OG) tags for social sharing
- Twitter Card metadata
- Canonical URLs (og:url)
- Author attribution and robot indexing directives

### Responsive Design
- CSS media queries for mobile-first design
- Flexible grid layouts using CSS Grid (`grid-template-columns: repeat(auto-fit, minmax(...))`)
- Viewport meta tag for responsive scaling
- Animation support (pulse-glow animations for interactive elements)

### Content Structure
- **News Badge**: Fixed floating element (bottom-left) with pulse animation for news/updates
- **Client Grid**: Responsive grid display of institutional client logos
- **Header Sections**: Radial gradient backgrounds with image overlays
- **Interactive Elements**: Hover effects and smooth transitions on links and buttons

## Validation

### HTML Validation
- All pages implement HTML5 DOCTYPE
- Valid semantic HTML structure
- Proper use of meta tags for SEO and social sharing
- Consistent character encoding (UTF-8)

### Browser Compatibility
- Modern browser features: CSS Grid, CSS Variables, modern animations
- Responsive design for mobile, tablet, and desktop viewports
- Graceful degradation for older browsers

### Quality Checks
- Consistent styling across all pages via CSS variables and shared design tokens
- Proper image optimization with various logo formats and sizes
- PDF documentation organized and accessible
- Meta information complete for all web pages (descriptions, keywords, OG tags)

### Deployment Readiness
- Static files require no build process
- No external JavaScript dependencies beyond static HTML
- CDN-hosted fonts (Google Fonts) with proper preconnect directives for performance
- All assets are self-contained (no external API calls)
- Ready for deployment to any static hosting service (GitHub Pages, Netlify, Vercel, traditional web hosting)
