const { asArray } = require('../array')
const { extractTags } = require('./tag')

// Flatten ke_inf and ke_pri into array of prefixed values.
const tags = reading => extractTags([
  ['re_inf', 'inf'],
  ['re_pri', 'rank']
], reading)

module.exports = entry => {
  // r_ele (reb, re_nokanji?, re_restr*, re_inf*, re_pri*)
  // Note: dropping `re_nokanji` for now.
  const { r_ele, ...rest } = entry

  const normalize =
    reading =>
      reading.re_restr
        ? ['reading', reading.reb, reading.re_restr, tags(reading)]
        : ['reading', reading.reb, tags(reading)]

  rest.headword = (rest.headword || []).concat(asArray(r_ele).map(normalize))
  return rest
}
