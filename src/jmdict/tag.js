import { asArray } from '../array.js'

export const trimEntity = s => s.replaceAll('&', '').replaceAll(';', '')

export const asTags =
	(xs, tag) =>
			(xs ? asArray(xs) : [])
				.map(trimEntity)
				.map(x => `${tag}:${x}`)


export const extractTags =
	(tags, element) =>
		tags.reduce((acc, [key, prefix]) => {
			return acc.concat(asTags(element[key], prefix))
		}, [])
