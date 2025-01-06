const { asArray } = require('../array')
const { extractTags } = require('./tag')

module.exports = entry => {
  if (!entry.k_ele) return entry

  // k_ele (keb, ke_inf*, ke_pri*)
  const { k_ele, ...rest } = entry

  const normalize = kanji => {
    const key = kanji.keb

    // Flatten ke_inf and ke_pri into array of prefixed values.
    const value = extractTags([
      ['ke_inf', 'inf'],
      ['ke_pri', 'rank']
    ], kanji)

    return [key, value]
  }

  return asArray(entry.k_ele).reduce((acc, element) => {
    const [key, value] = normalize(element)
    acc[`kanji:${key}`] = value
    return acc
  }, rest)
}
