#!/usr/bin/env node
const { readFileSync } = require('fs')
const { XMLParser } = require('fast-xml-parser')
const R = require('ramda')
const normalize = require('./src/jmdict/normalize')

const options = {
  ignoreAttributes: false,
  attributeNamePrefix: '',
  processEntities: false // keep entities as is; don't resolve
}

const filename = '/Users/dehmer/Public/Data/jp-resources/JMdict'
const xml = readFileSync(filename, 'utf8')
const parser = new XMLParser(options)
const entries = parser.parse(xml).JMdict.entry.map(normalize)
console.log(JSON.stringify(R.take(20, entries), null, 4))
