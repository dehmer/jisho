const { analyzeSync } = require("@enjoyjs/node-mecab")
const { split } = require('../string')

const cluster = xs => [
  xs[0], // surface (original text)
  [xs[1], xs[2], xs[3], xs[4]].join(':'), // position of speech with up to three details
  [xs[5], xs[6]].join(':'), // conjugation type and form
  xs[7], // dictionary/basic form
  [xs[8], xs[9]].join(':') // reading, pronunciation
]

const feature = (([surface, feature]) =>
  cluster([surface, ...feature.split(',')]))

const analyze = s => analyzeSync(s)
  .split('\n')
  .map(split('\t'))
  .filter(([surface, feature]) => surface && feature)
  .filter(([surface]) => surface !== 'EOS')
  .map(feature)

module.exports = analyze
