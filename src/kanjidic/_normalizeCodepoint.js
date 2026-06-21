
/**
 *
 */
export default character => {
  const { codepoint, ...rest } = character

  // NOTE: ucs = unicode code point
  // NOTE: CJK Unified Ideographs (Block U4E00)

  return codepoint.cp_value.reduce((acc, cp) => {
    acc[`codepoint:${cp.cp_type}`] = cp['#text']
    return acc
  }, rest)
}
