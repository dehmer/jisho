#!/usr/bin/env node
const path = require('node:path')
const { readFileSync, writeFileSync } = require('node:fs')
const { glob } = require('glob')

const sources = {
	vocabulary: '/Users/dehmer/Public/Data/jp-resources/vocabulary',
	kanji: '/Users/dehmer/Public/Data/jp-resources/kanji'
}

const entries = (type, file) => {
	const name = path.basename(file, '.tsv')
	const [key, value] = name.split('#')
	const entries = readFileSync(file, 'utf8')
	const lines = entries
		.split(/\r?\n/)
		.filter(x => x.trim().length)

	const columns = lines
		.map(line => line.split('\t'))
		.map(xs => xs.map(x => x.replaceAll('"', '')))

	return columns
	  .map(([kanji, reading]) => [ kanji.trim() ? kanji : '\\N', reading])
		.map(([kanji, reading]) => [type, key, value, kanji, reading].join('\t'))
}

;(async () => {

	const lines = await Object.entries(sources).reduce(async (acc, [type, directory]) => {
		const files = await glob(`${directory}/*.tsv`)
		return files.reduce((acc, file) => {
			return acc.concat(entries(type, file))
		}, await acc)
	}, [])

	const content =
		[
			'\\COPY deck FROM STDIN',
			...lines,
			'\\.',
			''
		].join('\n')

	writeFileSync('pg/data/deck.sql', content)
})()
