import svgpath from 'svgpath'
import { Bezier } from "bezier-js"
import * as R from 'ramda'

const of = d => svgpath(d)
const abs = path => path.abs()

/**
 * Converts smooth curves (T/t/S/s) to generic curves (Q/q/C/c).
 */
const unshort = path => path.unshort()
const toString = path => path.toString()
const round = precision => path => path.round(precision)

/**
 * Flatten C to polyline with `n` segments.
 */
const flatten = n => path => {
  path = unshort(path)
  path.iterate((segment, index, x, y) => {
    let result = undefined
    if (segment[0] === 'C') {
      // Cubic bézier (absolute)
      const curve = new Bezier([
        { x, y },
        { x: segment[1], y: segment[2] },
        { x: segment[3], y: segment[4] },
        { x: segment[5], y: segment[6] }
      ])

      const lut = curve.getLUT(n).flatMap(({ x, y }) => [x, y])
      lut.forEach(x => segment.push(x))
      const replacement = ['L', ...R.drop(2, lut)]
      result = [replacement]
    }

    return result
  })

  return path
}

export default {
  of,
  abs,
  unshort,
  toString,
  round,
  flatten
}
