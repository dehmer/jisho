#!/usr/bin/env node
const fs = require('node:fs')
const { split, join } = require('../src/string')

const sentence = () => {
  const inputs = [
    [
      '/Users/dehmer/Public/Data/jp-resources/sentences/jpn-ger-2023-11-11.tsv',
      [['jpn', 0, 1], ['ger', 2, 3]]
    ],
    [
      '/Users/dehmer/Public/Data/jp-resources/sentences/eng-ger.2023-11-11.tsv',
      [['eng', 0, 1], ['ger', 2, 3]]
    ],
    [
      '/Users/dehmer/Public/Data/jp-resources/sentences/jpn-eng-2023-11-11.tsv',
      [['jpn', 0, 1], ['eng', 2, 3]]
    ],
    [
      '/Users/dehmer/Public/Data/jp-resources/sentences/jpn-2023-11-11.tsv',
      [['jpn', 0, 2]]
    ]
  ]

  const sentences = inputs.reduce((acc, input) => {
    const content = fs.readFileSync(input[0], 'utf8')
    const lines = split(/\r?\n/, content).filter(s => s.trim().length).map(split('\t'))
    return lines.reduce((acc, line) => {
      return input[1].reduce((acc, [lang, ki, vi]) => {
        const key = `${lang}:${line[ki]}`
        const value = line[vi]
        acc[key] = value
        return acc
      }, acc)
    }, acc)
  }, {})

  const lines = Object.entries(sentences)
    .map(([key, value]) => [...key.split(':'), value])
    .map((xs => xs.join(`\t`)))

  return [
    '\\COPY sentence FROM STDIN',
    ...lines,
    '\\.',
    ''
  ].join('\n')
}

const translation = () => {
  const inputs = [
    [
      '/Users/dehmer/Public/Data/jp-resources/sentences/jpn-ger-2023-11-11.tsv',
      ['jpn', 0, 'ger', 2]
    ],
    [
      '/Users/dehmer/Public/Data/jp-resources/sentences/eng-ger.2023-11-11.tsv',
      ['eng', 0, 'ger', 2]
    ],
    [
      '/Users/dehmer/Public/Data/jp-resources/sentences/jpn-eng-2023-11-11.tsv',
      ['jpn', 0, 'eng', 2]
    ]
  ]

  const lines = inputs.flatMap(input => {
    const [filename, [lang_a, ki_a, lang_b, ki_b]] = input
    const content = fs.readFileSync(filename, 'utf8')
    const lines = split(/\r?\n/, content).filter(s => s.trim().length).map(split('\t'))
    return lines.map(line => [lang_a, lang_b, line[ki_a], line[ki_b]])
  }).map(join('\t'))

  return [
    '\\COPY translation FROM STDIN',
    ...lines,
    '\\.',
    ''
  ].join('\n')
}

const files = {
  sentence,
  translation
}

Object.entries(files).forEach(([filename, fn]) => {
  fs.writeFileSync(`pg/data/${filename}.sql`, fn())
})
