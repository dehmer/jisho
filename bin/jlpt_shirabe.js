#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'

const files = {
  N5: readFileSync('/Users/dehmer/Public/Data/jp-resources/jlpt_shirabe/N5.tsv', 'utf8'),
  N4: readFileSync('/Users/dehmer/Public/Data/jp-resources/jlpt_shirabe/N4.tsv', 'utf8'),
  N3: readFileSync('/Users/dehmer/Public/Data/jp-resources/jlpt_shirabe/N3.tsv', 'utf8'),
  N2: readFileSync('/Users/dehmer/Public/Data/jp-resources/jlpt_shirabe/N2.tsv', 'utf8'),
  N1: readFileSync('/Users/dehmer/Public/Data/jp-resources/jlpt_shirabe/N1.tsv', 'utf8')
}

const lines = Object.entries(files)
  .map(([key, content]) => [key, content.split(/\r?\n/)])
  .flatMap(([key, lines]) => lines.map(line => [key, line.split('\t')[0]]))
  .map(([key, kanji]) => [key, kanji.replaceAll('"', '')])
  .filter(([key, kanji]) => kanji.length)
  .map(([key, kanji]) => `${kanji}\tjlpt:shirabe\t${key}`)
  // .join('\n')

const content = [
  '\\COPY kanji_tag FROM STDIN',
  ...lines,
  '\\.',
  ''
].join('\n')

writeFileSync(`pg/data/jlpt_shirabe.sql`, content)
