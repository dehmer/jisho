
/**
 *
 */
export default character => {
  const { radical, ...rest } = character
  // Drop `nelson_c`; just use classical radical
  rest.radical = radical.classical
  return rest
}
