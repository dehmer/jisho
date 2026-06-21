import { asArray } from '../array.js'

/**
 *
 */
export default character => {
  const { query_code, ...rest } = character
  const codes = asArray(query_code.q_code)
  return codes.reduce((acc, q_code) => {
    // NOTE: Don't treat four_corner as float.
    acc[`lookup:${q_code.qc_type}`] = String(q_code['#text'])
    return acc
  }, rest)
}
