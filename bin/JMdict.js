#!/usr/bin/env node
const { readFileSync, writeFileSync } = require('fs')
const { XMLParser } = require('fast-xml-parser')
const R = require('ramda')
const normalize = require('../src/jmdict/normalize')
const { join } = require('../src/string')

const options = {
  ignoreAttributes: false,
  attributeNamePrefix: '',
  processEntities: false // keep entities as is; don't resolve
}

const filename = '/Users/dehmer/Public/Data/jp-resources/JMdict'
const xml = readFileSync(filename, 'utf8')
const parser = new XMLParser(options)
const raw = parser
  .parse(xml)
  .JMdict.entry

const entries = raw.map(normalize)

const data = entries.reduce((acc, { sequence, ...entry}) => {
  entry.headword.reduce((acc, headword, idx) => {
    if (headword.length === 3) acc.headword.push([sequence, idx, ...R.take(2, headword), '\\N'])
    else acc.headword.push([sequence, idx, ...R.take(3, headword)])
    R.last(headword).forEach(tag => acc.headword_tag.push([sequence, idx, ...tag.split(':')]))
    return acc
  }, acc)

  entry.meaning.reduce((acc, meaning, idx) => {
    const { tags, remark, ...rest } = meaning
    tags.forEach(tag => acc.meaning_tag.push([sequence, idx, ...tag.split(':')]))
    Object.entries(rest).forEach(([key /*, tags */]) => {
      const [_, lang, text] = key.match(/^(\w{3}):(.*)$/)
      if (text.includes('\\')) return
      acc.meaning.push([sequence, idx, lang, text])
    })
    return acc
  }, acc)

  return acc
}, { headword: [], headword_tag: [], meaning: [], meaning_tag: [] })


const headword = () => [
  '',
  '\\COPY headword FROM STDIN',
  ...data.headword.map(join('\t')),
  '\\.',
  ''
].join('\n')

const headword_tag = () => [
  '',
  '\\COPY headword_tag FROM STDIN',
  ...data.headword_tag.map(join('\t')),
  '\\.',
  ''
].join('\n')

const meaning = () => [
  '',
  '\\COPY meaning FROM STDIN',
  ...data.meaning.map(join('\t')),
  '\\.',
  ''
].join('\n')

const meaning_tag = () => [
  '',
  '\\COPY meaning_tag FROM STDIN',
  ...data.meaning_tag.map(join('\t')),
  '\\.',
  ''
].join('\n')

const files = {
  headword,
  headword_tag,
  meaning,
  meaning_tag,
}

Object.entries(files).forEach(([filename, fn]) => {
  writeFileSync(`pg/data/${filename}.sql`, fn())
})
