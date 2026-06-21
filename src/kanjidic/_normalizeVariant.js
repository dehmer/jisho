import { asArray } from '../array.js'

/**
 *
 */
export default character => {
  const { variant, ...rest } = character
  if (!variant) return rest

  const variants = asArray(variant)
  return variants.reduce((acc, variant) => {
    acc[`variant:${variant.var_type}`] = variant['#text'].toString().toUpperCase()
    return acc
  }, rest)
}
