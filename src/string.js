import * as R from 'ramda'

export const split = R.curry((delimiter, s) => s.split(delimiter))
export const join = separator => xs => xs.join(separator)
