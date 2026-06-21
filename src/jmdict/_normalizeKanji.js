import { asArray } from '../array.js'
import { extractTags } from './tag.js'

const tags = kanji => extractTags([
  ['ke_inf', 'inf'],
  ['ke_pri', 'rank']
], kanji)

export default entry => {
  if (!entry.k_ele) return entry

  // k_ele (keb, ke_inf*, ke_pri*)
  const { k_ele, ...rest } = entry

  const normalize = kanji => ['kanji', kanji.keb, tags(kanji)]

  rest.headword = (rest.headword || []).concat(asArray(k_ele).map(normalize))
  return rest
}
