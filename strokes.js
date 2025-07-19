#!/usr/bin/env node

/**
 * Usages
 *   ./strokes.js 行
 */
const { readFileSync, writeFileSync } = require('node:fs')
const { Pool } = require('pg')
const minimist = require('minimist')
const R = require('ramda')

const queries = pool => {
  const kanjiStrokePaths = async literal => {
    const { rows } = await pool.query('SELECT path FROM stroke WHERE literal = $1 ORDER BY idx', [literal])
    return rows.map(R.prop('path'))
  }

  return {
    kanjiStrokePaths
  }
}

;(async () => {
  const pool = new Pool()
  const { kanjiStrokePaths } = queries(pool)
  const args = minimist(process.argv.slice(2))
  const literal = args._[0]
  const paths = await kanjiStrokePaths(literal)
  await pool.end()

  const context = {
    fragment: paths.map(d => `<path d="${d}"/>`).join('\n  ')
  }
  const template = readFileSync('./template.svg', 'utf8')
  const content = template.replace(/\${([^}]*)}/g, (r, k)=> context[k])
  writeFileSync(`${literal}.svg`, content)
})()
