
/**
 *
 */
module.exports = character => {
  const { reading, nanori, ...filtered } = character

  if (reading) {
    const { ja_on, ja_kun } = character.reading
    if (ja_on) filtered.onyomi = ja_on.join(', ')
    if (ja_kun) filtered.kunyomi = ja_kun.join(', ')
  }

  if (nanori) filtered.nanori = Array.isArray(nanori) ? nanori.join(', ') : nanori

  return filtered
}
