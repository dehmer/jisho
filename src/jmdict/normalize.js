import normalizeSequence from './_normalizeSequence.js'
import normalizeKanji from './_normalizeKanji.js'
import normalizeReading from './_normalizeReading.js'
import normalizeMeaning from './_normalizeMeaning.js'

const normalizations = [
	normalizeSequence,
	normalizeReading,
	normalizeKanji,
	normalizeMeaning
]

// entry (ent_seq, k_ele*, r_ele+, sense+)
export const normalize = entry =>
  normalizations.reduce((acc, fn) => fn(acc), entry)
