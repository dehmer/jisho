
/**
 *
 */
export default character => {
  const { reading, ...rest } = character

  if (!reading) return rest

  const readings = Array.isArray(reading)
    ? reading
    : [reading]

  rest.reading = readings.reduce((acc, reading) => {
    acc[reading.r_type] = acc[reading.r_type] || []
    acc[reading.r_type].push(reading['#text'])
    return acc
  }, {})

  return rest
}
