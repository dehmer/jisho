const normalizeCodepoint = require('./_normalizeCodepoint')
const normalizeRadical = require('./_normalizeRadical')
const flattenMiscellaneous = require('./_flattenMiscellaneous')
const normalizeReference = require('./_normalizeReference')
const flattenReadingMeaning = require('./_flattenReadingMeaning')
const normalizeReading = require('./_normalizeReading')
const normalizeMeaning = require('./_normalizeMeaning')
const normalizeVariant = require('./_normalizeVariant')
const normalizeQuery = require('./_normalizeQuery')
const normalizeStrokes = require('./_normalizeStrokes')
const filterReading = require('./_filterReading')
const flattenMeaning = require('./_flattenMeaning')
const filterRadical = require('./_filterRadical')
const normalizeRadicalName = require('./_normalizeRadicalName')

const normalizations = [
  normalizeCodepoint,
  normalizeRadical,
  flattenMiscellaneous,
  normalizeReference,
  flattenReadingMeaning,
  normalizeReading,
  normalizeMeaning,
  normalizeVariant,
  normalizeQuery,
  normalizeStrokes,
  filterReading,
  flattenMeaning,
  filterRadical,
  normalizeRadicalName
]

const normalize = character =>
  normalizations.reduce((acc, fn) => fn(acc), character)

module.exports = normalize
