#!/usr/bin/env node
const { readFileSync, writeFileSync } = require('node:fs')

const filename = '/Users/dehmer/Public/Data/jp-resources/kradfile-u.txt'
const lines = readFileSync(filename, 'utf8')
  .split(/\r?\n/)
	.filter(s => !s.startsWith('#'))
	.filter(s => s.trim().length > 0)
	.map(s => s.split(' : '))
	.flatMap(([literal, radicals]) => radicals.split(' ').map(radical => [literal, radical]))
	.map(([literal, radical]) => `${literal}\t${radical}`)

const content =	[
	'',
	'\\COPY krad FROM STDIN',
	...lines,
	'\\.',
	''
].join('\n')

writeFileSync(`pg/data/krad.sql`, content)