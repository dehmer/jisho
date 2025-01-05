
/**
 *
 */
module.exports = character => {
  const { meaning, ...flattened } = character
  const meanings = Object.entries(meaning || {})
  return meanings.reduce((acc, [lang, meanings]) => {
    acc[`meaning:${lang}`] = meanings.join(', ')
    return acc
  }, flattened)
}
