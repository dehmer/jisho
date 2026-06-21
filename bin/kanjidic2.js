#!/usr/bin/env node
import fs from 'node:fs'
import { parse } from '../src/kanjidic/parse.js'

const filename = '/Users/dehmer/Public/Data/jp-resources/kanjidic2.xml'
const entries = parse(filename)
const dictionary = entries.reduce((acc, { literal, ...rest }) => {
  acc[literal] = rest
  return acc
}, {})

const onyomi = entry => {
    // 中: Add possibly missing onyomi ジュウ:
  if (entry.literal !== '中') return entry.onyomi
  else if (entry.onyomi.includes('ジュウ')) return entry.onyomi
  else return entry.onyomi + ', ジュウ'
}

const kanji = () => {
  const lines = entries.map(entry => [
      entry.literal,
      entry.radical,
      entry.strokes,
      entry.grade ?? '\\N',
      entry.jlpt ?? '\\N',
      entry.freq ?? '\\N',
      onyomi(entry) ?? '\\N',
      entry.kunyomi ?? '\\N',
      entry.nanori ?? '\\N'
    ].join('\t')
  )

  return [
    '',
    '\\COPY kanji FROM STDIN',
    ...lines,
    '\\.',
    ''
  ].join('\n')
}

const kanji_tag = () => {
  const fields = ['codepoint', 'reference', 'variant', 'lookup']
  const include = key => fields.includes(key)

  const lines = entries.reduce((acc, entry) => {
    Object.entries(entry).forEach(([key, value]) => {
      if (include(key.split(':')[0])) {
        acc.push([entry.literal, key, value].join('\t'))
      }
    })
    return acc
  }, [])

  return [
    '',
    '\\COPY kanji_tag FROM STDIN',
    ...lines,
    '\\.',
    ''
  ].join('\n')
}

const kanji_meaning = () => {
  const fields = ['meaning']
  const include = key => fields.includes(key)

  const lines = entries.reduce((acc, entry) => {
    Object.entries(entry).forEach(([key, value]) => {
      const tokens = key.split(':')
      if (include(tokens[0])) {
        acc.push([entry.literal, tokens[1], value].join('\t'))
      }
    })

    return acc
  }, [])

  return [
    '',
    '\\COPY kanji_meaning FROM STDIN',
    ...lines,
    '\\.',
    ''
  ].join('\n')
}

const radical = () => {
  const codepoint = {
    '6236': '6238', // 63: 戶 -> 戸
    '9751': '9752', // 174: 靑 -> 青
  }

  // Where radical stroke count differs from kanji stroke count
  const STROKES = {
    '牙': 4, // 92: 牙 - 4 -> 5
    '瓜': 5, // 97: 瓜 - 6 -> 5
    '臣': 6, // 131: 臣 - 7 -> 6
    '韋': 9, // 178: 韋 - 10 -> 9
    '龜': 16 // 213: 龜 - 18 -> 16
  }

  const strokes = literal => STROKES[literal] || dictionary[literal]?.strokes
  const names = literal => dictionary[literal]?.names

  const literal = codepoint => String.fromCharCode(parseInt(codepoint, 16))
  const lines = fs.readFileSync('/Users/dehmer/Public/Data/jp-resources/CJKRadicals.txt', 'utf8')
    .split(/\r?\n/)
    .filter(s => !s.startsWith('#'))
    .filter(s => s)
    .map(s => s.split(';').map(s => s.trim()))
    .filter(([x]) => !x.endsWith("'"))
    .map(([index, _, unified]) => [index, codepoint[unified] || unified])
    .map(([index, codepoint]) => [index, literal(codepoint)])
    .map(([index, literal]) => [index, literal, strokes(literal), names(literal)])
    .map(x => x.join('\t'))

  return [
    '',
    '\\COPY radical FROM STDIN',
    ...lines,
    '\\.',
    ''
  ].join('\n')
}

const radical_variant = () => {
  const variants = [
    [  9,  2, '2E85', '⺅', 'person'],
    [ 18,  2, '2E89', '⺉'],
    [ 26,  2, '2E8B', '⺋'],
    [ 42,  3, '2E8C', '⺌'],
    [ 42,  3, '2E8D', '⺍'],
    [ 43,  4, '2E8F', '⺏'],
    [ 43,  3, '2E8E', '⺎'],
    [ 47,  3, '5DDD', '川'],
    [ 58,  3, '2E94', '⺔'],
    [ 58,  3, '2E95', '⺕'],
    [ 61,  3, '2E96', '⺖'],
    [ 61,  4, '2E97', '⺗'],
    [ 64,  3, '2E98', '⺘'],
    [ 66,  4, '2E99', '⺙'],
    [ 71,  4, '2E9B', '⺛'],
    [ 78,  4, '2E9E', '⺞'],
    [ 85,  3, '2EA1', '⺡'],
    [ 85,  4, '2EA2', '⺢'],
    [ 86,  4, '2EA3', '⺣'],
    [ 87,  4, '2EA4', '⺤', 'paw'],
    [ 93,  4, '725C', '牜'],
    [ 94,  3, '2EA8', '⺨'],
    [ 96,  4, '738B', '王', 'king'],
    [103,  5, '2EAA', '⺪'],
    [109,  5, '2EAB', '⺫'], // also 122
    [113,  4, '2EAD', '⺭'],
    [118,  6, '2EAE', '⺮'],
    [122,  4, '2EB5', '⺵'],
    [122,  4, '2EB3', '⺳'],
    [122,  4, '2EB1', '⺱'],
    [122,  5, '2EAB', '⺫'], // also 109
    [123,  6, '2EB7', '⺷', 'ram'],
    [125,  4, '2EB9', '⺹'],
    [130,  4, '2EBC', '⺼'],
    [134,  7, '2EBD', '⺽'],
    [140,  3, '2EBE', '⺾'],
    [140,  4, '2EBF', '⺿'],
    [145,  5, '2EC2', '⻂'],
    [146,  6, '2EC3', '⻃'],
    [157,  7, '2ECA', '⻊'],
    [162,  4, '2ECD', '⻍'],
    [163,  3, '2ECF', '⻏'],
    [170,  3, '2ED6', '⻖'],
    [184,  9, '2EDE', '⻞']
  ]

  const lines = variants
    .map(x => x[4] === undefined ? [...x, '\\N'] : x)
    .map(x => x.join('\t'))

  return [
    '',
    '\\COPY radical_variant FROM STDIN',
    ...lines,
    '\\.',
    ''
  ].join('\n')
}

const files = {
  kanji,
  kanji_tag,
  kanji_meaning,
  radical,
  radical_variant
}

Object.entries(files).forEach(([filename, fn]) => {
  fs.writeFileSync(`pg/data/${filename}.sql`, fn())
})
