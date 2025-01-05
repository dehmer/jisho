#!/usr/bin/env node
const { readFileSync } = require('fs')
const { XMLParser } = require('fast-xml-parser')
const R = require('ramda')

// Necessary for kanji ranking:
const kanjidic2 = JSON.parse(readFileSync('data/kanjidic2.json'))

const asArray = x => Array.isArray(x) ? x : [x]
const trimEntity = s => s.replaceAll('&', '').replaceAll(';', '')
const asTags = (xs, tag) => (xs ? asArray(xs) : [])
  .map(trimEntity)
  .map(x => `${tag}:${x}`)

const extractTags = (tags, element) =>
  tags.reduce((acc, [key, prefix]) => {
    return acc.concat(asTags(element[key], prefix))
  }, [])

const Entry = {}

Entry.normalizeSequence = entry => {
  const { ent_seq, ...rest } = entry
  return {
    sequence: ent_seq,
    ...rest
  }
}

Entry.normalizeKanji = entry => {
  if (!entry.k_ele) return entry

  // <!ELEMENT k_ele (keb, ke_inf*, ke_pri*)>
  const { k_ele, ...rest } = entry

  const normalize = kanji => {
    const key = kanji.keb
    const value = extractTags([
      ['ke_inf', 'inf'],
      ['ke_pri', 'rank']
    ], kanji)

    return [key, value]
  }

  return {
    ...rest,
    kanji: asArray(entry.k_ele).reduce((acc, element) => {
      const [key, value] = normalize(element)
      acc[key] = value
      return acc
    }, {})
  }
}

Entry.normalizeReading = entry => {
  // <!ELEMENT r_ele (reb, re_nokanji?, re_restr*, re_inf*, re_pri*)>
  const { r_ele, ...rest } = entry

  const normalize = reading => {
    const key = reading.reb
    const value = extractTags([
      ['re_inf', 'inf'],
      ['re_pri', 'rank']
    ], reading)

    return [key, value]
  }

  return {
    ...rest,
    reading: asArray(r_ele).reduce((acc, element) => {
      const [key, value] = normalize(element)
      acc[key] = value
      return acc
    }, {})
  }
}

Entry.normalizeMeaning = entry => {
  const { sense, ...rest } = entry

  const fns = {
    'string': gloss => [`eng:${gloss}`, []],
    'boolean': gloss => [`eng:${String(gloss)}`, []],
    'number': gloss => [`eng:${String(gloss)}`, []],
    'object': gloss => {
      const key = `${gloss['xml:lang'] || 'eng'}:${gloss['#text']}`
      const value = asTags(gloss.g_type, 'type')
      return [key, value]
    }
  }

  const normalizeGlossary = gloss => fns[typeof gloss](gloss)

  // <!ELEMENT sense (stagk*, stagr*, pos*, xref*, ant*, field*, misc*, s_inf*, lsource*, dial*, gloss*)>
  // NOTE: skipping `lsource` for now
  // NOTE: skipping `dial` for now
  const normalizeSense = sense => {
    const meaning = {}
    if (sense.stagk) meaning.stagk = asArray(sense.stagk)
    if (sense.stagr) meaning.stagr = asArray(sense.stagr)
    if (sense.xref) meaning.synonym = asArray(sense.xref)
    if (sense.ant) meaning.antonym = asArray(sense.ant)
    if (sense.s_inf) meaning.remark = sense.s_inf

    const tags = asTags(sense.pos, 'pos')
      .concat(asTags(sense.misc, 'misc'))
      .concat(asTags(sense.dial, 'dial'))
      .concat(asTags(sense.field, 'field'))

    return (sense.gloss ? asArray(sense.gloss) : [])
      .reduce((acc, element) => {
        const [key, value] = normalizeGlossary(element)
        acc[key] = value
        return acc
      }, { ...meaning, tags })
  }


  return {
    ...rest,
    meaning: asArray(sense)
      .map(normalizeSense)
      .filter(sense => Object.keys(sense).length > 1)
  }
}

const Kanji = {}
Kanji.rank = kanji => {
  const rank = character => kanjidic2[character]
    ? parseInt(kanjidic2[character].rank, 36)
    : 0

  const max = Math.max(...kanji.split("").map(rank))
  return max > 0 ? max.toString(36).padStart(6, '0') : undefined
}


Entry.normalize = entry => {
  // <!ELEMENT entry (ent_seq, k_ele*, r_ele+, sense+)>
  const normalizations = [
    Entry.normalizeSequence,
    Entry.normalizeKanji,
    Entry.normalizeReading,
    Entry.normalizeMeaning
  ]

  const normalized = normalizations.reduce((acc, fn) => fn(acc), entry)
  console.log('normalized', JSON.stringify(normalized, null, 2))
  return normalized
}

const options = {
  ignoreAttributes: false,
  attributeNamePrefix: '',
  processEntities: false // keep entities as is; don't resolve
}

//
const parse = () => {
  const xml = readFileSync('./data/JMdict-ger', 'utf8')
  const parser = new XMLParser(options)
  const entries = parser.parse(xml).JMdict.entry.map(Entry.normalize)
  return entries
}

module.exports = {
  parse
}

const xml = readFileSync('./data/JMdict-ger', 'utf8')
const parser = new XMLParser(options)
const entries = parser.parse(xml).JMdict.entry.map(Entry.normalize)
// console.log(JSON.stringify(entries, null, 2))

// const ranks = entries.flatMap(entry => {
//   if (!entry.kanji) return undefined
//   return Object.keys(entry.kanji).map(kanji => {
//     return [entry.sequence, kanji, Kanji.rank(kanji)]
//   })
// })
//   .filter(rank => rank)
//   .filter(([,, rank]) => rank)

// const ordered = R.sort((a, b) => a[2].localeCompare(b[2]), ranks)
// console.log(JSON.stringify(ordered, null, 2))
