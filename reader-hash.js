#!/usr/bin/env node
const { readFileSync } = require('node:fs')
const { createHash } = require('node:crypto')

readFileSync('./reader-sentences', 'utf8')
  .split(/\r?\n/)
  .map(s => s.trim())
  .filter(s => s.length)
  .filter(s => !s.includes('#'))
  .map(s => [s, createHash('sha256').update(s).digest('base64url')])
  .forEach(xs => console.log(xs))
