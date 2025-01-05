const { asArray } = require('../array')

/**
 *
 */
module.exports = character => {
  const { radical, ...rest } = character
  const rad_value = asArray(radical.rad_value)

  rest.radical = rad_value.reduce((acc, rad_value) => {
    acc[rad_value.rad_type] = rad_value['#text']
    return acc
  }, {})

  return rest
}
