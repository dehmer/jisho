#!/usr/bin/env node
const { readFileSync, writeFileSync } = require('node:fs')
const { glob } = require('glob')

const classes = {
	1: '1',
	2: 'Pre-1',
	3: '2',
	4: 'Pre-2',
	5: '3',
	6: '4',
	7: '5',
	8: '6',
	9: '7',
	10: '8',
	11: '9',
	12: '10'
}

const directory = '/Users/dehmer/Public/Data/jp-resources/kanken'

;(async () => {
	const files = await glob(`${directory}/*.txt`)
	const lines = files.flatMap(filename => {
		const index = parseInt(filename.match(/^.*\/kanken-(\d+).*$/, 'g')[1])
		const kanji = readFileSync(filename, 'utf8').split(/\r?\n/)
		const clazz = classes[index]
		return kanji.map(literal => [literal, clazz, 12 - index + 1])
	}).map(xs => xs.join('\t'))

	const content =
		[
			'\\COPY kanken FROM STDIN',
			...lines,
			'\\.',
			''
		].join('\n')

	writeFileSync('pg/data/kanken.sql', content)
})()
