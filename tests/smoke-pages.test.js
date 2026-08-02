import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ALL_PAGES = [
  'index.html', 'piscinas.html', 'suelos-terrazas.html', 'tecnologia.html',
  'realizaciones.html', 'quienes-somos.html', 'contacto.html',
  'aviso-legal.html', 'privacidad.html', 'cookies.html',
];

for (const page of ALL_PAGES) {
  test(`${page} contains the Islas Canarias distribution badge`, () => {
    const html = fs.readFileSync(page, 'utf8');
    assert.ok(html.includes('Islas Canarias'), `${page} is missing the "Islas Canarias" badge`);
  });

  test(`${page} has a canonical link tag`, () => {
    const html = fs.readFileSync(page, 'utf8');
    assert.ok(html.includes('rel="canonical"'), `${page} is missing a canonical tag`);
  });

  test(`${page} links to the CSS design tokens`, () => {
    const html = fs.readFileSync(page, 'utf8');
    assert.ok(html.includes('assets/css/tokens.css'), `${page} does not load tokens.css`);
  });
}

test('index.html has the full navigation to all interior pages', () => {
  const html = fs.readFileSync('index.html', 'utf8');
  const expectedLinks = [
    'piscinas.html', 'suelos-terrazas.html', 'tecnologia.html',
    'realizaciones.html', 'quienes-somos.html', 'contacto.html',
  ];
  for (const link of expectedLinks) {
    assert.ok(html.includes(`href="${link}"`), `index.html nav is missing a link to ${link}`);
  }
});

test('quienes-somos.html names Résineo and Apavi Green as the official distributor', () => {
  const html = fs.readFileSync('quienes-somos.html', 'utf8');
  assert.ok(html.includes('Résineo'), 'missing mention of Résineo');
  assert.ok(html.includes('distribuidor oficial'), 'missing "distribuidor oficial" wording');
});
