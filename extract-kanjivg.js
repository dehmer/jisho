#!/usr/bin/env node
const { readFileSync } = require('fs')
const R = require('ramda')
const { glob } = require('glob')
const { XMLParser } = require('fast-xml-parser')
const { optimize } = require('svgo')

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: ''
})

const extractPaths = (o, acc = []) => {
  if (!o) return acc
  if (o.g) extractPaths(o.g, acc)
  if (Array.isArray(o)) o.forEach(x => extractPaths(x, acc))

  if (o.path) {
    const paths = Array.isArray(o.path) ? o.path : [o.path]
    // console.log('found', paths.map(R.prop('id')))
    paths.forEach(path => acc.push(path.d))
  }

  return acc
}

/*
<svg xmlns="http://www.w3.org/2000/svg" width="109" height="109" viewBox="0 0 109 109">
</svg>
*/

const zeroPad = places => n => String(n).padStart(places, '0')

;(async () => {
  const options = {
    ignore: {
      // Ignore variants:
      ignored: p => !/^0[0-9a-f]{4}\.svg$/.test(p.name)
    }
  }
  const files = await glob('./data/kanjivg/*.*', options)
  console.log('#', files.length)
  // const pad = zeroPad(2)
  // files.map(filename => {
  //   const cp = filename.substring(13, 18)
  //   const content = readFileSync(filename, 'utf8')
  //   const svg = parser.parse(content).svg
  //   const paths = extractPaths(svg)
  //   paths.forEach((x, i) => console.log(`${cp}-${pad(i)}`, x))
  // })
})()