const R = require('ramda')

const split = R.curry((delimiter, s) => s.split(delimiter))
const join = separator => xs => xs.join(separator)

module.exports = {
	split,
	join
}
