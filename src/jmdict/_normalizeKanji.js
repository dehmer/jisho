const { asArray } = require('../array')
const { extractTags } = require('./tag')

module.exports = entry => {
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
