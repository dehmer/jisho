
/**
 * NOTE: Drops potential miscounts.
 */
module.exports = character => {
  const { stroke_count, ...rest } = character
  rest.strokes = Array.isArray(stroke_count)
    ? stroke_count[0]
    : stroke_count
  return rest
}
