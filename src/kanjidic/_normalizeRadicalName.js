/**
 * Additional radical names.
 * Reference: https://www.natubunko.net/mame/kotoba03.html#b17
 * Reference: https://www.sljfaq.org/afaq/radical-names.html#radicals-in-unicode
 */
import additionalNames from './radicalNames.json' with { type: 'json' }

/**
 * Join multiple radical names or use single radical name.
 */
export default character => {
  const { rad_name, ...rest } = character

  if (!rad_name && additionalNames[character.literal]) {
    rest.names = additionalNames[character.literal]
    return rest
  }

  rest.names = Array.isArray(rad_name)
    ? rad_name.join('・')
    : rad_name

  return rest
}
