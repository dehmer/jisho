import { asArray } from '../array.js'

/**
 *
 */
export default character => {
  const { meaning, ...rest } = character

  if (!meaning) return rest
  const meanings = asArray(meaning)

  rest.meaning = meanings.reduce((acc, meaning) => {
    const [text, lang] = typeof meaning === "object"
      ? Object.values(meaning)
      : [meaning, 'en']
    acc[lang] = acc[lang] || []

    // NOTE: Treat 'true' as string (本).
    acc[lang].push(String(text))
    return acc
  }, {})

  return rest
}
