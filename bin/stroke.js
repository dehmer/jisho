#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import * as R from 'ramda'
import { glob } from 'glob'
import { XMLParser } from 'fast-xml-parser'
import { svgPathBbox } from 'svg-path-bbox'
import SVGPath from '../src/svgpath.js'

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: ''
})

/*
<svg xmlns="http://www.w3.org/2000/svg" width="109" height="109" viewBox="0 0 109 109">
</svg>
*/

/**
 *
 */
const filenames = async (filepath) => {
  const options = {
    ignore: {
      // Ignore variants:
      ignored: p => !/^0[0-9a-f]{4}\.svg$/.test(p.name)
    }
  }

  return glob(filepath + '/*.*', options)
}

/**
 *
 */
const parse = filename => {
  const basename = path.basename(filename, '.svg').substring(1)
  const literal = String.fromCharCode(parseInt(basename, 16))
  const content = readFileSync(filename, 'utf8')
  return [literal, parser.parse(content).svg]
}

/**
 *
 */
const extractPaths = ([literal, arg], acc = []) => {
  if (Array.isArray(arg)) arg.forEach(x => extractPaths([literal, x], acc))
  else {
    // Note: Traversal does not neccessarily result in correct stroke order.
    if (arg.path) extractPaths([literal, arg.path], acc)
    if (arg.g) extractPaths([literal, arg.g], acc)
    if (arg.d) {
      const id = parseInt(arg.id.match(/^kvg:[0-9a-f]{5}-s(\d+)/)[1])
      const precision = 2
      const segmentCount = 8
      const normalized = R.compose(
        SVGPath.toString,
        SVGPath.round(precision),
        SVGPath.flatten(segmentCount),
        SVGPath.abs,
        SVGPath.of
      )(arg.d)

      const bbox = svgPathBbox(normalized)
      acc.push([literal, id, ...bbox, normalized])
    }
  }

  return acc
}

;(async () => {
  const filepath = '/Users/dehmer/Public/Data/jp-resources/kanjivg'
  const files = await filenames(filepath)
  const lines = files.flatMap(R.compose(extractPaths, parse))

  const content =	[
    '\\COPY stroke FROM STDIN',
    ...lines.map(xs => xs.join('\t')),
    '\\.',
    ''
  ].join('\n')

  writeFileSync(`pg/data/stroke.sql`, content)
})()
