const normalizeSequence = require('./_normalizeSequence')
const normalizeKanji = require('./_normalizeKanji')
const normalizeReading = require('./_normalizeReading')
const normalizeMeaning = require('./_normalizeMeaning')

const normalizations = [
	normalizeSequence,
	normalizeReading,
	normalizeKanji,
	normalizeMeaning
]

// entry (ent_seq, k_ele*, r_ele+, sense+)
const normalize = entry =>
  normalizations.reduce((acc, fn) => fn(acc), entry)

module.exports = normalize
