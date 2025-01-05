const { readFileSync } = require('fs')
const { XMLParser } = require('fast-xml-parser')
const normalize = require('./normalize')

const parse = filename => {
	const xml = readFileSync(filename, 'utf8')
	const parser = new XMLParser({
		ignoreAttributes: false,
		attributeNamePrefix: ''
	})

	const { character } = parser.parse(xml).kanjidic2
	return character.map(normalize)
}

module.exports = parse
