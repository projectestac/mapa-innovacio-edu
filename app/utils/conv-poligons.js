#!/usr/bin/env node

// Usage: node conv-poligons.js > ../public/data/poligons.json

const raw = require('./poligons-raw.json');

const result = raw.map(({ tipus, id, nom, poligons }) => {
  return {
    tipus,
    id,
    nom,
    poligons: poligons.map(arr => arr.map(({ lat, lng }) => `${lat}|${lng}`).join(',')),
  }
});

console.log(JSON.stringify(result, 1));
