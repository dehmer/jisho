
/**
 *
 */
export default character => {
  const { misc, ...rest } = character
  return { ...rest, ...misc }
}
