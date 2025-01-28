#!/usr/bin/env node
const path = require('node:path')
const { readFileSync } = require('node:fs')
const { glob } = require('glob')
const pg = require('pg')
const { Client } = pg
const client = new Client()


const dirname = '/Users/dehmer/Public/Data/jp-resources/vocabulary'

const lines = file => {
	const name = path.basename(file, '.tsv')
	const [key, value] = name.split('#')
	const entries = readFileSync(file, 'utf8')
	const lines = entries
		.split(/\r?\n/)
		.filter(x => x.trim().length)

	const columns = lines
		.map(line => line.split('\t'))
		.map(xs => xs.map(x => x.replaceAll('"', '')))

	return columns.map(([kanji, reading]) => [key, value, kanji, reading])
}

const selectReading = "SELECT DISTINCT seq_no FROM headword WHERE headword_txt = $1"
const selectKanjiAndReading = "SELECT DISTINCT seq_no FROM (SELECT * FROM headword WHERE headword_txt = $1) kanji JOIN (SELECT * FROM headword WHERE headword_txt = $2) reading USING (seq_no)"
const insertBookmark = "INSERT INTO bookmark VALUES ($1, $2, $3, $4, $5)"
;(async () => {
	await client.connect()

	const files = await glob(`${dirname}/*.tsv`)
	await files.reduce(async (acc, file) => {
		return lines(file).reduce(async (acc, [key, value, kanji, reading]) => {
			const query = {
				text: kanji ? selectKanjiAndReading : selectReading,
				values: kanji ? [kanji, reading] : [reading]
			}

			const { rowCount, rows } = await client.query(query)
			if (rowCount === 1) {
				const { seq_no } = rows[0]
				console.log(seq_no, key, value, query.values)
				await client.query(
					insertBookmark,
					[`headword:${seq_no}`, kanji, reading, key, value]
				)
			}

			return acc
		}, acc)
	}, [])

	await client.end()
})()
