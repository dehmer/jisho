const { tokenizeSync } = require("@enjoyjs/node-mecab")

const tokens = s => tokenizeSync(s)
	.filter(tokens => !['BOS', 'EOS'].includes(tokens.surface))

module.exports = tokens
