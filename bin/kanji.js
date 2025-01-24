#!/usr/bin/env node
const path = require('node:path')
const { readFileSync } = require('node:fs')
const { glob } = require('glob')
const pg = require('pg')
const { Client } = pg
const client = new Client()


const dirname = '/Users/dehmer/Public/Data/jp-resources/kanji'

const lines = async file => {
	const name = path.basename(file, '.tsv')
	const [key, value] = name.split('#')
	const entries = await readFileSync(file, 'utf8')
	const lines = entries
		.split(/\r?\n/)
		.filter(x => x.trim().length)

	const columns = lines
		.map(line => line.split('\t'))
		.map(xs => xs.map(x => x.replaceAll('"', '')))

	return columns.map(([literal]) => [key, value, literal])
}

const selectKanji = 'SELECT 1 FROM kanji WHERE literal = $1'
const insertBookmark = 'INSERT INTO bookmark VALUES ($1, $2, $3)'

;(async () => {
	await client.connect()

	const files = await glob(`${dirname}/*.tsv`)
	await files.reduce(async (acc, file) => {
		return (await lines(file)).reduce(async (acc, [key, value, literal]) => {
			const { rowCount } = await client.query(selectKanji, [literal])
			if (rowCount === 1) {
				console.log(literal, key, value)
				await client.query(insertBookmark, [`kanji:${literal}`, key, value])
			}

			return acc
		}, acc)
	}, [])

	await client.end()
})()
