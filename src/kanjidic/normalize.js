import normalizeCodepoint from './_normalizeCodepoint.js'
import normalizeRadical from './_normalizeRadical.js'
import flattenMiscellaneous from './_flattenMiscellaneous.js'
import normalizeReference from './_normalizeReference.js'
import flattenReadingMeaning from './_flattenReadingMeaning.js'
import normalizeReading from './_normalizeReading.js'
import normalizeMeaning from './_normalizeMeaning.js'
import normalizeVariant from './_normalizeVariant.js'
import normalizeQuery from './_normalizeQuery.js'
import normalizeStrokes from './_normalizeStrokes.js'
import filterReading from './_filterReading.js'
import flattenMeaning from './_flattenMeaning.js'
import filterRadical from './_filterRadical.js'
import normalizeRadicalName from './_normalizeRadicalName.js'

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

export const normalize =
  character =>
    normalizations.reduce((acc, fn) => fn(acc), character)
