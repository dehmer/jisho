const { asArray } = require('../array')
const { extractTags } = require('./tag')

module.exports = entry => {
  // r_ele (reb, re_nokanji?, re_restr*, re_inf*, re_pri*)
  // Note: dropping `re_nokanji` for now.
  const { r_ele, ...rest } = entry

  const normalize = reading => {
    const key =
      reading.re_restr
        ? `${reading.re_restr}:${reading.reb}` // Prefix with restriction if any.
        : reading.reb

    // Flatten ke_inf and ke_pri into array of prefixed values.
    const value = extractTags([
      ['re_inf', 'inf'],
      ['re_pri', 'rank']
    ], reading)

    return [key, value]
  }

  return asArray(r_ele).reduce((acc, element) => {
    const [key, value] = normalize(element)
    acc[`reading:${key}`] = value
    return acc
  }, rest)
}
