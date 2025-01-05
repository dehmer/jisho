#!/usr/bin/env node
const { readFileSync, writeFileSync } = require('fs')
const { analyzeSync } = require("@enjoyjs/node-mecab")
const { split, join } = require('../src/string')

const filename = '/Users/dehmer/Public/Data/jp-resources/sentences/jpn-2023-11-11.tsv'
const input = readFileSync(filename, 'utf8')
const sentences = split('\n', input).map(split('\t'))

const analyze =
  s =>
    analyzeSync(s)
    .split('\n')
    .map(split('\t'))
    .filter(([surface, feature]) => surface && feature)
    .filter(([surface]) => surface !== 'EOS')
    .map(([surface, feature]) => [surface, ...feature.split(',')])


const lines = sentences
  .flatMap(([id, lang, surface]) => analyze(surface).map((xs, idx) => [lang, id, idx, ...xs]))
  .map(xs => xs.length === 13 ? xs : [...xs, '\\N', '\\N'])
  .map(join('\t'))

const content =
  [
    '\\COPY token FROM STDIN',
    ...lines,
    '\\.',
    ''
  ].join('\n')

writeFileSync('pg/data_token.sql', content)
