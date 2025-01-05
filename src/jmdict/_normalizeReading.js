const { asArray } = require('../array')
const { extractTags } = require('./tag')

module.exports = entry => {
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
