//const { version } = require('../package.json')
const mypkg = require('../package.json')

module.exports = (args) => {
	console.log(`${mypkg.name} v${mypkg.version}`)
}

