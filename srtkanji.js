#!/usr/bin/env node
const { readFileSync } = require('fs')
const R = require('ramda')

const kanji =
  readFileSync('/Users/dehmer/Public/Data/jp-resources/srt/ghost_in_the_shell.srt', 'utf8')
  .split(/\r?\n/)
  .map(s => s.replace(/[^\u4e00-\u9faf]/g, '').trim())
  .filter(R.identity)
  .flatMap(s => s.split(''))

console.log(JSON.stringify(R.uniq(kanji)))
