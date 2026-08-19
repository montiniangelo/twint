const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'localhostai.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

describe('localhostai.html - n8n Solutions Catalog', () => {
  
  describe('HTML Structure', () => {
    test('should have valid HTML5 doctype', () => {
      expect(htmlContent).toMatch(/<!DOCTYPE html>/i);
    });

    test('should have html tag with lang="it"', () => {
      expect(htmlContent).toMatch(/<html[^>]*lang="it"[^>]*>/);
    });

    test('should have proper head section with meta tags', () => {
      expect(htmlContent).toMatch(/<head>[\s\S]*<\/head>/);
      expect(htmlContent).toMatch(/<meta charset="UTF-8">/);
      expect(htmlContent).toMatch(/<meta name="viewport"/);
    });

    test('should have body section with content', () => {
      expect(htmlContent).toMatch(/<body>[\s\S]*<\/body>/);
    });
  });

  describe('Meta Tags and SEO', () => {
    test('should have title tag', () => {
      expect(htmlContent).toMatch(/<title>[\s\S]*n8n LocalHostAI[\s\S]*<\/title>/i);
    });

    test('should have meta description', () => {
      expect(htmlContent).toMatch(/<meta name="description"/);
      expect(htmlContent).toMatch(/n8n.*automazioni/i);
    });

    test('should have meta keywords', () => {
      expect(htmlContent).toMatch(/<meta name="keywords"/);
      expect(htmlContent).toMatch(/n8n.*automazioni.*LocalHostAI/i);
    });

    test('should have author meta tag', () => {
      expect(htmlContent).toMatch(/<meta name="author" content="LyberCode di Angelo Montini"/);
    });

    test('should have robots meta tag', () => {
      expect(htmlContent).toMatch(/<meta name="robots" content="index, follow"/);
    });

    test('should have Open Graph tags', () => {
      expect(htmlContent).toMatch(/<meta property="og:type"/);
      expect(htmlContent).toMatch(/<meta property="og:title"/);
      expect(htmlContent).toMatch(/<meta property="og:description"/);
    });

    test('should have Twitter Card tags', () => {
      expect(htmlContent).toMatch(/<meta name="twitter:card"/);
      expect(htmlContent).toMatch(/<meta name="twitter:title"/);
      expect(htmlContent).toMatch(/<meta name="twitter:description"/);
    });
  });

  describe('Header Content', () => {
    test('should have main header with lightning emoji', () => {
      expect(htmlContent).toMatch(/<h1>[\s\S]*⚡[\s\S]*n8n LocalHostAI/);
    });

    test('should have subtitle text', () => {
      expect(htmlContent).toMatch(/Catalogo di 20 Soluzioni Smart/i);
    });

    test('should have description paragraph', () => {
      expect(htmlContent).toMatch(/Scopri come rinnovare i tuoi processi di ufficio/i);
    });
  });

  describe('Navigation', () => {
    test('should have navigation with links', () => {
      expect(htmlContent).toMatch(/<nav>/);
      expect(htmlContent).toMatch(/<\/nav>/);
    });

    test('should have navigation link to Home', () => {
      expect(htmlContent).toMatch(/<a[^>]*href="#home"[^>]*>Home<\/a>/);
    });

    test('should have navigation link to Soluzioni', () => {
      expect(htmlContent).toMatch(/<a[^>]*href="#soluzioni"[^>]*>Soluzioni<\/a>/);
    });

    test('should have navigation link to Categorie', () => {
      expect(htmlContent).toMatch(/<a[^>]*href="#categorie"[^>]*>Categorie<\/a>/);
    });

    test('should have navigation link to Impatto', () => {
      expect(htmlContent).toMatch(/<a[^>]*href="#impatto"[^>]*>Impatto<\/a>/);
    });
  });

  describe('Statistics Section', () => {
    test('should display 21 solutions statistic', () => {
      expect(htmlContent).toMatch(/<div class="stat-number">21<\/div>/);
      expect(htmlContent).toMatch(/Soluzioni/);
    });

    test('should display 80% productivity increase statistic', () => {
      expect(htmlContent).toMatch(/<div class="stat-number">80%<\/div>/);
      expect(htmlContent).toMatch(/Aumento Produttività/);
    });

    test('should display 100+ hours saved statistic', () => {
      expect(htmlContent).toMatch(/<div class="stat-number">100\+h<\/div>/);
      expect(htmlContent).toMatch(/Tempo Risparmiato/);
    });
  });

  describe('Categories Section', () => {
    test('should have categories section with id', () => {
      expect(htmlContent).toMatch(/id="categorie"/);
    });

    test('should have categories section title', () => {
      expect(htmlContent).toMatch(/Categorie di Soluzioni/);
    });

    test('should display all 7 categories', () => {
      expect(htmlContent).toMatch(/Produttività/);
      expect(htmlContent).toMatch(/Documenti/);
      expect(htmlContent).toMatch(/Social Media/);
      expect(htmlContent).toMatch(/CRM/);
      expect(htmlContent).toMatch(/Analytics/);
      expect(htmlContent).toMatch(/Comunicazione/);
      expect(htmlContent).toMatch(/Finanza/);
    });

    test('should have category icons', () => {
      expect(htmlContent).toMatch(/⚙️/);
      expect(htmlContent).toMatch(/📄/);
      expect(htmlContent).toMatch(/📱/);
      expect(htmlContent).toMatch(/👥/);
      expect(htmlContent).toMatch(/📊/);
      expect(htmlContent).toMatch(/💬/);
      expect(htmlContent).toMatch(/💰/);
    });

    test('should show solution counts for each category', () => {
      const counts = htmlContent.match(/Soluzioni/g);
      expect(counts.length).toBeGreaterThanOrEqual(7);
    });

    test('should have installation info paragraph', () => {
      expect(htmlContent).toMatch(/Installare n8n su localhost è semplice/);
      expect(htmlContent).toMatch(/Node\.js oppure tramite Docker/);
      expect(htmlContent).toMatch(/nessun costo/);
    });

    test('should have category filter buttons with onclick handlers', () => {
      expect(htmlContent).toMatch(/onclick="filterSolutions\('all'\)"/);
      expect(htmlContent).toMatch(/onclick="filterSolutions\('productivity'\)"/);
      expect(htmlContent).toMatch(/onclick="filterSolutions\('documents'\)"/);
      expect(htmlContent).toMatch(/onclick="filterSolutions\('social'\)"/);
      expect(htmlContent).toMatch(/onclick="filterSolutions\('crm'\)"/);
      expect(htmlContent).toMatch(/onclick="filterSolutions\('analytics'\)"/);
      expect(htmlContent).toMatch(/onclick="filterSolutions\('communication'\)"/);
      expect(htmlContent).toMatch(/onclick="filterSolutions\('finance'\)"/);
    });

    test('should have "Tutte" category button', () => {
      expect(htmlContent).toMatch(/data-filter="all"/);
      expect(htmlContent).toMatch(/>🔍</);
    });

    test('should have category grid with 4 columns layout', () => {
      expect(htmlContent).toMatch(/grid-template-columns:\s*repeat\(4,\s*1fr\)/);
    });

    test('should have responsive media queries for category filter', () => {
      expect(htmlContent).toMatch(/@media.*max-width:\s*1024px/);
      expect(htmlContent).toMatch(/#category-filter[\s\S]*grid-template-columns:\s*repeat\(2,\s*1fr\)/);
    });
  });

  describe('Solutions Grid', () => {
    test('should have solutions grid container', () => {
      expect(htmlContent).toMatch(/<div class="solutions-grid">/);
    });

    test('should contain exactly 21 solution cards', () => {
      const solutionCards = htmlContent.match(/<div class="solution-card"/g);
      expect(solutionCards).toHaveLength(21);
    });

    test('each solution card should have a number', () => {
      for (let i = 1; i <= 21; i++) {
        expect(htmlContent).toMatch(new RegExp(`<div class="solution-number">${i}<\/div>`));
      }
    });

    test('each solution card should have a category', () => {
      expect(htmlContent).toMatch(/<div class="solution-category">/g);
    });

    test('each solution card should have a title', () => {
      expect(htmlContent).toMatch(/<div class="solution-title">/g);
    });

    test('each solution card should have a description', () => {
      expect(htmlContent).toMatch(/<div class="solution-description">/g);
    });

    test('each solution card should have benefits list', () => {
      const benefitLists = htmlContent.match(/<ul class="solution-benefits">/g);
      expect(benefitLists).toHaveLength(21);
    });

    test('each solution card should have impact statement', () => {
      expect(htmlContent).toMatch(/<div class="solution-impact">/g);
    });
  });

  describe('Solution Content Validation', () => {
    test('solution 1 should be Email Auto-Responder', () => {
      expect(htmlContent).toMatch(/Email Auto-Responder Intelligente/);
    });

    test('solution 2 should be PDF Data Extraction', () => {
      expect(htmlContent).toMatch(/Estrazione Dati da PDF Automatica/);
    });

    test('solution 3 should be Social Media Management', () => {
      expect(htmlContent).toMatch(/Gestione Social Media Programmata/);
    });

    test('solution 4 should be Lead Generation', () => {
      expect(htmlContent).toMatch(/Lead Generation e Nurturing Automatico/);
    });

    test('solution 5 should be Automated Reports', () => {
      expect(htmlContent).toMatch(/Report Giornalieri Automatici su Slack/);
    });

    test('solution 20 should be Digital Archive with AI Search', () => {
      expect(htmlContent).toMatch(/Archivio Digitale Intelligente con Search IA/);
    });

    test('solution 21 should be API Gateway and Integration Middleware', () => {
      expect(htmlContent).toMatch(/API Gateway e Middleware di Integrazione/);
    });

    test('should have productivity category', () => {
      expect(htmlContent).toMatch(/data-category="productivity"/);
    });

    test('should have documents category', () => {
      expect(htmlContent).toMatch(/data-category="documents"/);
    });

    test('should have CRM category', () => {
      expect(htmlContent).toMatch(/data-category="crm"/);
    });

    test('should have analytics category', () => {
      expect(htmlContent).toMatch(/data-category="analytics"/);
    });

    test('should have social category', () => {
      expect(htmlContent).toMatch(/data-category="social"/);
    });

    test('should have communication category', () => {
      expect(htmlContent).toMatch(/data-category="communication"/);
    });

    test('should have finance category', () => {
      expect(htmlContent).toMatch(/data-category="finance"/);
    });
  });

  describe('CSS and Styling', () => {
    test('should have style tag with CSS', () => {
      expect(htmlContent).toMatch(/<style>[\s\S]*<\/style>/);
    });

    test('should define CSS variables for colors', () => {
      expect(htmlContent).toMatch(/--primary:/);
      expect(htmlContent).toMatch(/--secondary:/);
      expect(htmlContent).toMatch(/--accent:/);
      expect(htmlContent).toMatch(/--text:/);
      expect(htmlContent).toMatch(/--muted:/);
    });

    test('should have solution-card class styling', () => {
      expect(htmlContent).toMatch(/\.solution-card\s*{/);
    });

    test('should have hover effects', () => {
      expect(htmlContent).toMatch(/\.solution-card:hover/);
    });

    test('should have responsive media queries', () => {
      expect(htmlContent).toMatch(/@media\s*\(\s*max-width:\s*768px\s*\)/);
    });

    test('should have animations defined', () => {
      expect(htmlContent).toMatch(/@keyframes pulse-glow/);
    });
  });

  describe('Impact Section', () => {
    test('should have impact section with id', () => {
      expect(htmlContent).toMatch(/id="impatto"/);
    });

    test('should display impact title', () => {
      expect(htmlContent).toMatch(/Impatto Complessivo delle Automazioni/);
    });

    test('should mention 21 solutions in impact section', () => {
      expect(htmlContent).toMatch(/Con tutte le 21 soluzioni implementate/);
    });

    test('should show 100+ hours saved per month', () => {
      expect(htmlContent).toMatch(/100\+\s*ore/i);
      expect(htmlContent).toMatch(/Risparmiate mensili/);
    });

    test('should show 80% productivity increase', () => {
      expect(htmlContent).toMatch(/Aumento produttività/);
    });

    test('should show 99% error reduction', () => {
      expect(htmlContent).toMatch(/Errori ridotti/);
    });
  });

  describe('Footer', () => {
    test('should have footer element', () => {
      expect(htmlContent).toMatch(/<footer>[\s\S]*<\/footer>/);
    });

    test('should have footer title', () => {
      expect(htmlContent).toMatch(/n8n LocalHostAI Catalog/);
    });

    test('should link to LyberCode', () => {
      expect(htmlContent).toMatch(/<a[^>]*href="index\.html"[^>]*>LyberCode<\/a>/);
    });

    test('should have copyright info', () => {
      expect(htmlContent).toMatch(/© 2025 LyberCode/);
    });

    test('should mention customizable automations', () => {
      expect(htmlContent).toMatch(/personalizzabili e scalabili/);
    });
  });

  describe('Resource Links and Fonts', () => {
    test('should link to Google Fonts', () => {
      expect(htmlContent).toMatch(/fonts\.googleapis\.com/);
    });

    test('should preconnect to Google Fonts', () => {
      expect(htmlContent).toMatch(/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com"/);
    });

    test('should load Space Grotesk font', () => {
      expect(htmlContent).toMatch(/Space\+Grotesk/);
    });

    test('should have favicon SVG', () => {
      expect(htmlContent).toMatch(/data:image\/svg\+xml/);
    });
  });

  describe('Content Completeness', () => {
    test('should have at least 50 benefit items across all solutions', () => {
      const benefits = htmlContent.match(/<li>/g);
      expect(benefits.length).toBeGreaterThanOrEqual(50);
    });

    test('should have impact indicators (💡) in each solution', () => {
      const impacts = htmlContent.match(/💡/g);
      expect(impacts.length).toBe(21);
    });

    test('should have success checkmarks (✓) in CSS styling', () => {
      expect(htmlContent).toMatch(/content:\s*['"]✓['"]/);
    });

    test('should have proper container structure', () => {
      expect(htmlContent).toMatch(/<div class="container">/);
    });

    test('should have main solutions section with id', () => {
      expect(htmlContent).toMatch(/id="soluzioni"/);
    });
  });

  describe('HTML Validity', () => {
    test('should not have unclosed tags', () => {
      const openDivs = (htmlContent.match(/<div/g) || []).length;
      const closeDivs = (htmlContent.match(/<\/div>/g) || []).length;
      expect(openDivs).toBe(closeDivs);
    });

    test('should not have unclosed paragraphs', () => {
      const openPs = (htmlContent.match(/<p/g) || []).length;
      const closePs = (htmlContent.match(/<\/p>/g) || []).length;
      expect(openPs).toBe(closePs);
    });

    test('should not have unclosed lists', () => {
      const openUls = (htmlContent.match(/<ul/g) || []).length;
      const closeUls = (htmlContent.match(/<\/ul>/g) || []).length;
      expect(openUls).toBe(closeUls);
    });

    test('should not have unclosed list items', () => {
      const openLis = (htmlContent.match(/<li\b/g) || []).length;
      const closeLis = (htmlContent.match(/<\/li>/g) || []).length;
      expect(openLis).toBe(closeLis);
    });

    test('should have proper script closing', () => {
      const openScripts = (htmlContent.match(/<script/g) || []).length;
      const closeScripts = (htmlContent.match(/<\/script>/g) || []).length;
      expect(openScripts).toBe(closeScripts);
    });

    test('should have proper link closing', () => {
      const linkTags = htmlContent.match(/<link[^>]*>/g) || [];
      expect(linkTags.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    test('should have lang attribute on html', () => {
      expect(htmlContent).toMatch(/<html[^>]+lang="it"/);
    });

    test('should have proper heading hierarchy', () => {
      expect(htmlContent).toMatch(/<h1/);
      expect(htmlContent).toMatch(/<h2/);
    });

    test('should have proper image alt text when images are present', () => {
      const hasImages = /<img/g.test(htmlContent);
      if (hasImages) {
        expect(htmlContent).toMatch(/<img[^>]*alt=/);
      }
      expect(true).toBe(true);
    });

    test('should have aria-friendly navigation', () => {
      expect(htmlContent).toMatch(/<nav>/);
      expect(htmlContent).toMatch(/href="#/);
    });

    test('should use semantic HTML elements', () => {
      expect(htmlContent).toMatch(/<header>/);
      expect(htmlContent).toMatch(/<nav>/);
      expect(htmlContent).toMatch(/<footer>/);
    });
  });

  describe('Performance Considerations', () => {
    test('should have preconnect directives', () => {
      expect(htmlContent).toMatch(/rel="preconnect"/);
    });

    test('should use CSS variables for efficiency', () => {
      expect(htmlContent).toMatch(/var\(--/);
    });

    test('should have optimized grid layout', () => {
      expect(htmlContent).toMatch(/grid-template-columns:\s*repeat\(auto-fit/);
    });

    test('should have hover performance optimization', () => {
      expect(htmlContent).toMatch(/transition:/);
    });
  });

  describe('JavaScript and Interactivity', () => {
    test('should have filterSolutions function defined', () => {
      expect(htmlContent).toMatch(/function filterSolutions\(category\)/);
    });

    test('should have solution cards with data-category attributes', () => {
      expect(htmlContent).toMatch(/data-category="productivity"/);
      expect(htmlContent).toMatch(/data-category="documents"/);
      expect(htmlContent).toMatch(/data-category="social"/);
      expect(htmlContent).toMatch(/data-category="crm"/);
      expect(htmlContent).toMatch(/data-category="analytics"/);
      expect(htmlContent).toMatch(/data-category="communication"/);
      expect(htmlContent).toMatch(/data-category="finance"/);
    });

    test('should have DOMContentLoaded event listener', () => {
      expect(htmlContent).toMatch(/DOMContentLoaded/);
    });

    test('should have fadeIn animation defined', () => {
      expect(htmlContent).toMatch(/@keyframes fadeIn/);
    });

    test('should scroll to solutions section on filter', () => {
      expect(htmlContent).toMatch(/scrollIntoView/);
      expect(htmlContent).toMatch(/#soluzioni/);
    });

    test('should have query selector for category filter', () => {
      expect(htmlContent).toMatch(/#category-filter/);
    });
  });

  describe('Edge Cases', () => {
    test('should handle all special characters in Italian text', () => {
      expect(htmlContent).toMatch(/[àèéìòù]/);
    });

    test('should have UTF-8 meta tag', () => {
      expect(htmlContent).toMatch(/<meta charset="UTF-8"/);
    });

    test('should handle mobile viewport', () => {
      expect(htmlContent).toMatch(/<meta name="viewport" content="width=device-width, initial-scale=1\.0"/);
    });

    test('should not have any XSS vulnerabilities in attributes', () => {
      const xssPatterns = /javascript:/gi;
      expect(htmlContent.match(xssPatterns)).toBeNull();
    });

    test('should have proper URL encoding in href attributes', () => {
      expect(htmlContent).toMatch(/href="[^"]*"/g);
    });
  });
});
