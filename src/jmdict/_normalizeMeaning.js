const { asArray } = require('../array')
const { asTags } = require('./tag')

module.exports = entry => {
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

  // sense (stagk*, stagr*, pos*, xref*, ant*, field*, misc*, s_inf*, lsource*, dial*, gloss*)
  // Note: skipping `lsource` for now
  // Note: skipping `dial` for now

  const normalizeSense = sense => {
    const meaning = {}

    const tags = asTags(sense.pos, 'pos')
      .concat(asTags(sense.misc, 'misc'))
      .concat(asTags(sense.dial, 'dial'))
      .concat(asTags(sense.field, 'field'))

    const reduceArray = (prefix, xs, acc) => asArray(xs).reduce(((acc, x) => {
      acc.push(`${prefix}:${x}`)
      return acc
    }), acc)

    if (sense.stagk) reduceArray('stagk', sense.stagk, tags)
    if (sense.stagr) reduceArray('stagr', sense.stagr, tags)
    if (sense.xref) reduceArray('xref', sense.xref, tags)
    if (sense.ant) reduceArray('ant', sense.ant, tags)
    if (sense.s_inf) meaning.remark = sense.s_inf

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
