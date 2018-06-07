const minimist = require('minimist')
const showme = function(x) {
	console.dir(x)
}

const mload = './bin/'
console.log('\n')

module.exports = () => {
//
	let cmd = 'version'
	const args = minimist(process.argv.slice(2))
	if (typeof args._[0] !== 'undefined') {
		cmd = args._[0] 
	} //else {
	//	cmd = 'help'
	//}

	console.log('showing cmd arg input: %j', cmd)

	if (args._[0] == 'version' || args.version || args.v) {
		console.log('version args : %j', args)
		cmd = 'version'
	}
	if (args._[0] == 'help' || args.help || args.h) {
		console.log('help args : %j', args)
		cmd = 'help'
	}

	switch (cmd) {
		case 'version':
			console.log('running ' + mload + cmd)
			require(mload + cmd)
				break
		case 'help':
			console.log('running help')
			require(mload + cmd)(args)
				break
		default:
			//let mload = `./bin/${cmd}`
			console.log('running ' + mload + cmd)
			require(mload + cmd)(args)
				break
	}
}

