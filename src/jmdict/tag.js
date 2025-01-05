const { asArray } = require('../array')

const trimEntity = s => s.replaceAll('&', '').replaceAll(';', '')

const asTags =
	(xs, tag) =>
			(xs ? asArray(xs) : [])
				.map(trimEntity)
				.map(x => `${tag}:${x}`)


const extractTags =
	(tags, element) =>
		tags.reduce((acc, [key, prefix]) => {
			return acc.concat(asTags(element[key], prefix))
		}, [])

module.exports = {
	trimEntity,
	asTags,
	extractTags
}
