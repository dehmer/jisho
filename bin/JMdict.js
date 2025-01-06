#!/usr/bin/env node
const { readFileSync, writeFileSync } = require('fs')
const { XMLParser } = require('fast-xml-parser')
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
const raw = parser.parse(xml).JMdict.entry
const entries = raw.map(normalize)

const data = entries.reduce((acc, { sequence, ...entry}) => {
  return Object.entries(entry).reduce((acc, [key, value]) => {
    const { headword, headword_tag, meaning, meaning_tag} = acc
    const [type, ...xs] = key.split(':')

    switch (type) {
      case 'kanji':
        headword.push([sequence, type, xs[0], '\\N'])
        value.forEach(tag => headword_tag.push([sequence, type, xs[0], ...tag.split(':')]))
        break
      case 'reading':
        if (xs.length === 1) {
          headword.push([sequence, type, ...xs, '\\N'])
          value.forEach(tag => headword_tag.push([sequence, type, xs[0], ...tag.split(':')]))
        }
        else {
          xs[0].split(',').forEach(xref => headword.push([sequence, type, xs[1], xref]))
          value.forEach(tag => headword_tag.push([sequence, type, xs[1], ...tag.split(':')]))
        }
        break
      case 'meaning':
        value.forEach(({ tags, remark, ...meanings}, idx) => {
          tags.forEach(tag => meaning_tag.push([sequence, idx, ...tag.split(':')]))
          Object.entries(meanings).forEach(([key, tags]) => {
            const [_, lang, text] = key.match(/^(\w{3}):(.*)$/)
            if (text.includes('\\')) return
            meaning.push([sequence, idx, lang, text])
          })
        })
        break
    }

    return acc
  }, acc)
}, { headword: [], headword_tag: [], meaning: [], meaning_tag: []})

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
