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
