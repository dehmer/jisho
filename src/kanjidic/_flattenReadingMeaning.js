
/**
 * NOTE: Although multiple rmgroup are possible in theory,
 * each entry only has a single rmgroup (at most).
 */
export default character => {

  if (!character.reading_meaning) return character

  const { reading_meaning, ...rest } = character
  const { rmgroup, ...nanori } = reading_meaning

  return {
    ...rest,
    ...rmgroup,
    ...nanori
  }
}
