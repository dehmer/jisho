#!/usr/bin/env node
const { readFileSync } = require('node:fs')
const { spawn, exec } = require('node:child_process')
const { createHash } = require('node:crypto')
const path = require('node:path')
const { glob } = require('glob')

const dirname = '/Users/dehmer/Public/Data/jp-resources/audio'

process.stdin.setRawMode(true)
process.stdin.resume()
process.stdin.setEncoding('utf8')

const voices = [
  'Kyoko (Enhanced)',
  'Otoya (Enhanced)'
]

const say = sentence => new Promise((resolve, reject) => {
  const voice = voices[Math.floor(Math.random() * 2)]
  const process = spawn("say", ['-v', voice, sentence])
  process.on('close', () => resolve())
})

const play = (filename) => new Promise(resolve => {
  exec(`afplay ${filename}`, resolve)
})

const key = () => new Promise((resolve) => {
  process.stdin.once('data', resolve)
})

const removecomment = s => {
  const idx = s.indexOf('#')
  return idx === -1 ? s : s.substring(0, idx)
}

const sentences = readFileSync('./reader-sentences', 'utf8')
  .split(/\r?\n/)
  .filter(s => s.trim().length)
  .map(removecomment)
  .map(s => s.trim())

;(async () => {
  const audiofiles = await glob(`${dirname}/*.*`)
  const hashes = audiofiles.reduce((acc, filename) => {
    const extname = path.extname(filename)
    const basename = path.basename(filename, extname)
    acc[basename] = filename
    return acc
  }, {})

  const loop = async acc => {
    const [xs, index] = await acc
    const idx = index ?? Math.floor(Math.random() * xs.length)
    const sentence = xs[idx]
    const hash = createHash('sha256').update(sentence).digest('base64url')

    console.log(
      '[',
      1 + sentences.length - xs.length,
      '/', sentences.length,
      ']',
      sentence
    )

    await (hashes[hash] ? play(hashes[hash]) : say(sentence))

    switch (await key()) {
      case '\u0003': return process.exit()
      case 'q': return process.exit()
      case 'r': loop([xs, idx]); break
      default:
        xs.splice(idx, 1)
        if (xs.length === 0) process.exit()
        loop([[...xs], null])
    }
  }

  loop([[...sentences], null])
})()
