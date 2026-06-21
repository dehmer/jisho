import { spawn } from 'node:child_process'
import { EventEmitter } from 'node:events'

const lines = s =>
	s
		.split(/\r?\n/)
		.map(s => s.split('\t'))
		.filter(xs => xs.length === 2) // remove EOS
		.map(([surface, feature], idx) => [idx, surface, ...feature.split(',')])
		.map(xs => xs.length === 9 ? [...xs, '\\N', '\\N'] : xs)

export const mecab = () => {
	const emitter = new EventEmitter()
	let acc = Buffer.alloc(0)
	const mecab = spawn('mecab')

	mecab.stdout.on('data', chunk => {
		acc = Buffer.concat([acc, chunk], acc.length + chunk.length)
		const index = acc.indexOf('EOS\n')
		if (index === -1) return
		emitter.emit('data', acc.subarray(0, index + 4).toString('utf8'))
		acc = acc.subarray(index + 4, acc.length)
	})

	const analyze = surface => new Promise(resolve => {
		mecab.stdin.write(surface + '\n')
		emitter.once('data', data => resolve(lines(data)))
	})

	const dispose = () => mecab.kill()

	return {
		dispose,
		analyze
	}
}
