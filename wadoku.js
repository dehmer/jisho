#!/usr/bin/env node
const { readFileSync } = require('fs')
const { XMLParser } = require('fast-xml-parser')
const R = require('ramda')

const xml = readFileSync('./data/wadoku-xml-20240107/wadoku.xml', 'utf8')
const options = {
  ignoreAttributes: false,
  attributeNamePrefix: ''
}
const parser = new XMLParser(options)
const { entry: entries } = parser.parse(xml).entries
entries.forEach(entry => console.log(JSON.stringify(entry, null, 4)))
