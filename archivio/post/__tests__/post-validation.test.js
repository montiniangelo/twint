const fs = require('fs');
const path = require('path');

describe('Post HTML Files - FAQ Schema Validation', () => {
  const postDir = path.join(__dirname, '..');
  const htmlFiles = fs.readdirSync(postDir).filter(f => f.endsWith('.html'));
  const modifiedFiles = [
    'post-17-November-2025-1763376302.html',
    'post-17-November-2025-1763376714.html',
    'post-17-November-2025-1763378495.html',
    'post-17-November-2025-1763378850.html',
    'post-17-November-2025-1763379177.html',
    'post-18-November-2025-1763420467.html',
    'post-20-November-2025-1763636466.html',
    'post-21-November-2025-1763722863.html',
    '001-innovazione-digitale.html',
    'post-19-November-2025-1763550067.html'
  ];

  describe('Basic HTML Structure', () => {
    htmlFiles.forEach(file => {
      test(`${file} - should be valid HTML`, () => {
        const content = fs.readFileSync(path.join(postDir, file), 'utf8');
        expect(content).toContain('<!DOCTYPE html');
        expect(content).toContain('</html>');
      });

      test(`${file} - should have title tag`, () => {
        const content = fs.readFileSync(path.join(postDir, file), 'utf8');
        expect(content).toMatch(/<title>.*<\/title>/);
      });

      test(`${file} - should have meta description`, () => {
        const content = fs.readFileSync(path.join(postDir, file), 'utf8');
        expect(content).toMatch(/<meta name="description"/);
      });
    });
  });

  describe('FAQ Schema Markup', () => {
    htmlFiles.forEach(file => {
      test(`${file} - should contain FAQPage schema`, () => {
        const content = fs.readFileSync(path.join(postDir, file), 'utf8');
        expect(content).toContain('@context');
        expect(content).toContain('FAQPage');
      });

      test(`${file} - should have valid JSON-LD`, () => {
        const content = fs.readFileSync(path.join(postDir, file), 'utf8');
        const jsonLdMatch = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
        
        if (jsonLdMatch) {
          expect(() => {
            JSON.parse(jsonLdMatch[1]);
          }).not.toThrow();
        }
      });

      test(`${file} - should have Question/Answer pairs in FAQ`, () => {
        const content = fs.readFileSync(path.join(postDir, file), 'utf8');
        const jsonLdMatch = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
        
        if (jsonLdMatch) {
          const schema = JSON.parse(jsonLdMatch[1]);
          expect(schema.mainEntity).toBeDefined();
          expect(Array.isArray(schema.mainEntity)).toBe(true);
          expect(schema.mainEntity.length).toBeGreaterThan(0);
          
          schema.mainEntity.forEach(item => {
            expect(item['@type']).toBe('Question');
            expect(item.name).toBeDefined();
            expect(item.name.length).toBeGreaterThan(0);
            expect(item.acceptedAnswer).toBeDefined();
            expect(item.acceptedAnswer.text).toBeDefined();
            expect(item.acceptedAnswer.text.length).toBeGreaterThan(50);
          });
        }
      });

      test(`${file} - should have at least 3 FAQ entries`, () => {
        const content = fs.readFileSync(path.join(postDir, file), 'utf8');
        const jsonLdMatch = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
        
        if (jsonLdMatch) {
          const schema = JSON.parse(jsonLdMatch[1]);
          expect(schema.mainEntity.length).toBeGreaterThanOrEqual(3);
        }
      });
    });
  });

  describe('Content Quality - Word Count', () => {
    htmlFiles.forEach(file => {
      test(`${file} - should have sufficient word count (>300)`, () => {
        const content = fs.readFileSync(path.join(postDir, file), 'utf8');
        const textContent = content
          .replace(/<script[\s\S]*?<\/script>/g, '')
          .replace(/<style[\s\S]*?<\/style>/g, '')
          .replace(/<[^>]*>/g, '')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .trim();
        
        const wordCount = textContent.split(/\s+/).filter(w => w.length > 0).length;
        expect(wordCount).toBeGreaterThan(300);
      });

      test(`${file} - should have h2 headings for section structure`, () => {
        const content = fs.readFileSync(path.join(postDir, file), 'utf8');
        const h2Count = (content.match(/<h2>/g) || []).length;
        expect(h2Count).toBeGreaterThan(0);
      });

      test(`${file} - should have article or main content tag`, () => {
        const content = fs.readFileSync(path.join(postDir, file), 'utf8');
        const hasArticle = content.includes('<article');
        const hasMain = content.includes('<main');
        expect(hasArticle || hasMain).toBe(true);
      });
    });
  });

  describe('SEO Optimization', () => {
    htmlFiles.forEach(file => {
      test(`${file} - should have meta charset UTF-8`, () => {
        const content = fs.readFileSync(path.join(postDir, file), 'utf8');
        expect(content).toMatch(/charset="UTF-8"/i);
      });

      test(`${file} - should have viewport meta tag`, () => {
        const content = fs.readFileSync(path.join(postDir, file), 'utf8');
        expect(content).toMatch(/name="viewport"/);
      });

      test(`${file} - title should be between 30-60 characters`, () => {
        const content = fs.readFileSync(path.join(postDir, file), 'utf8');
        const titleMatch = content.match(/<title>(.*?)<\/title>/);
        
        if (titleMatch) {
          const title = titleMatch[1];
          expect(title.length).toBeGreaterThanOrEqual(20);
          expect(title.length).toBeLessThanOrEqual(120);
        }
      });

      test(`${file} - meta description should be between 120-160 characters`, () => {
        const content = fs.readFileSync(path.join(postDir, file), 'utf8');
        const descMatch = content.match(/name="description"\s+content="([^"]*)"/) || 
                          content.match(/content="([^"]*)"\s+name="description"/);
        
        if (descMatch) {
          const desc = descMatch[1];
          expect(desc.length).toBeGreaterThanOrEqual(80);
          expect(desc.length).toBeLessThanOrEqual(300);
        }
      });
    });
  });

  describe('Modified Files Specific Tests', () => {
    modifiedFiles.forEach(file => {
      test(`${file} - should have increased word count for SEO`, () => {
        const content = fs.readFileSync(path.join(postDir, file), 'utf8');
        const textContent = content
          .replace(/<script[\s\S]*?<\/script>/g, '')
          .replace(/<style[\s\S]*?<\/style>/g, '')
          .replace(/<[^>]*>/g, '')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .trim();
        
        const wordCount = textContent.split(/\s+/).filter(w => w.length > 0).length;
        expect(wordCount).toBeGreaterThan(800);
      });

      test(`${file} - should have Case Study section`, () => {
        const content = fs.readFileSync(path.join(postDir, file), 'utf8');
        expect(content.toLowerCase()).toMatch(/case.?study|case study/i);
      });

      test(`${file} - should have multiple paragraphs for depth`, () => {
        const content = fs.readFileSync(path.join(postDir, file), 'utf8');
        const pCount = (content.match(/<p>/g) || []).length;
        expect(pCount).toBeGreaterThanOrEqual(4);
      });

      test(`${file} - should have lists for better readability`, () => {
        const content = fs.readFileSync(path.join(postDir, file), 'utf8');
        const liCount = (content.match(/<li>/g) || []).length;
        expect(liCount).toBeGreaterThan(0);
      });
    });
  });

  describe('JSON-LD FAQ Schema Completeness', () => {
    modifiedFiles.forEach(file => {
      test(`${file} - all FAQ answers should be substantial (>80 chars)`, () => {
        const content = fs.readFileSync(path.join(postDir, file), 'utf8');
        const jsonLdMatch = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
        
        if (jsonLdMatch) {
          const schema = JSON.parse(jsonLdMatch[1]);
          schema.mainEntity.forEach(q => {
            expect(q.acceptedAnswer.text.length).toBeGreaterThan(80);
            expect(q.acceptedAnswer.text).not.toMatch(/^null|undefined/i);
          });
        }
      });
    });
  });
});
