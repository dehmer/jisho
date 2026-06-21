import { readFileSync } from 'node:fs'
import { XMLParser } from 'fast-xml-parser'
import { normalize } from './normalize.js'

export const parse = filename => {
	const xml = readFileSync(filename, 'utf8')
	const parser = new XMLParser({
		ignoreAttributes: false,
		attributeNamePrefix: '',

		/**
		 * Leave tag values alone.
		 * Especially in <cp_value cp_type="ucs">4e95</cp_value>
		 * where '4e95' would be parsed into 4e+95
		 */
		parseTagValue: false
	})

	const { character } = parser.parse(xml).kanjidic2
	return character.map(normalize)
}
