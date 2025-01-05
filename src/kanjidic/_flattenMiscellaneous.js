
/**
 *
 */
module.exports = character => {
  const { misc, ...rest } = character
  return { ...rest, ...misc }
}
