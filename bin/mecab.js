#!/usr/bin/env node
const { readFileSync, createWriteStream } = require('node:fs')
const { split } = require('../src/string')
const mecab = require('../src/mecab')

const filename = '/Users/dehmer/Public/Data/jp-resources/sentences/jpn-2023-11-11.tsv'
const input = readFileSync(filename, 'utf8')
const sentences = split('\n', input).filter(s => s.length).map(split('\t'))

;(async () => {
  const { analyze, dispose } = mecab()
  const output = createWriteStream('pg/data/token.sql')
  output.write('\\COPY token FROM STDIN\n')

  await sentences.reduce(async (acc, [id, lang, surface]) => {
    const output = await acc
    const lines = await analyze(surface)
    lines
      .map(features => [lang, id, ...features])
      .map(line => line.join('\t'))
      .forEach(line => output.write(line + '\n'))

    return acc
  }, output)

  output.write('\\.\n')
  dispose()
})()
