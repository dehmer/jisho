
module.exports = entry => {
  const { ent_seq, ...rest } = entry
  return {
    sequence: ent_seq,
    ...rest
  }
}
