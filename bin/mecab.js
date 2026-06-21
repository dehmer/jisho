#!/usr/bin/env node
import { readFileSync, createWriteStream } from 'node:fs'
import { split } from '../src/string.js'
import { mecab } from '../src/mecab.js'

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
