/**
 * Rank by
 *   1st: grade
 *   2nd: radical number
 *   3rd: stroke count
 *   4th: frequency
 */
module.exports = character => {
  // Total of 30 bit
  const grade = character.grade || 0b1111 // 1 thru 6 and 8 thru 10 ( 4 bit)
  const radical = character.radical // 1 to 214                     ( 8 bit)
  const strokes = character.strokes // 1 to 34                      ( 6 bit)
  const frequency = character.freq || 0b111111111111 // 1 to 2,500  (12 bit)

  const components = [
    [grade, 0],
    [radical, 8],
    [strokes, 6],
    [frequency, 12]
  ]

  return components.reduce((acc, [value, offset]) => (acc << offset) | value, 0)
}
