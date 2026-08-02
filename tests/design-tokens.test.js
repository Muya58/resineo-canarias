import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('tokens.css defines the core brand color variables', () => {
  const css = fs.readFileSync('assets/css/tokens.css', 'utf8');
  const requiredVars = [
    '--color-sand-light',
    '--color-sand-mid',
    '--color-stone-dark',
    '--color-graphite',
    '--color-green',
    '--color-green-hover',
    '--color-border',
  ];
  for (const varName of requiredVars) {
    assert.ok(css.includes(varName), `tokens.css is missing ${varName}`);
  }
});
