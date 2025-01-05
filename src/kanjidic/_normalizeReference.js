const { asArray } = require('../array')

/**
 *
 */
module.exports = character => {
  const { dic_number, ...rest } = character

  if (!dic_number) return rest

  const dic_refs = asArray(dic_number.dic_ref)
  return dic_refs.reduce((acc, dic_ref) => {
    const text = dic_ref['#text'].toString()
    const key = `reference:${dic_ref.dr_type}`
    const value = dic_ref.dr_type === 'moro' && dic_ref.m_vol && dic_ref.m_page
      ? `${dic_ref.m_vol}-${dic_ref.m_page}-${text}`
      : text

    acc[key] = value
    return acc
  }, rest)
}
