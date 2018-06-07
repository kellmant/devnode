const minimist = require('minimist')
const showme = function(x) {
	console.dir(x)
}

console.log('\n')

module.exports = () => {
//
	let cmd = {}
	const args = minimist(process.argv.slice(2))
	if (typeof args._[0] !== 'undefined') {
		cmd = args._[0] 
	} else {
		cmd = 'help'
	}

	let mload = './bin/'
	console.log('showing cmd arg input: %j', cmd)

	if (args.version || args.v) {
		console.log('version args : %j', args)
		cmd = 'version'
	}

	if (cmd == 'help' || args.help || args.h) {
		console.log('help args : %j', args)
		cmd = 'help'
	}

	switch (cmd) {
		case 'version':
			//let mload = './bin/version'
			require(mload + cmd)
				break
		case 'help':
			require(mload + cmd)(args)
				break
		default:
			//let mload = `./bin/${cmd}`
			require(mload + cmd)(args)
				break
	}
}

