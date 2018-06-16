
const Objectclass = require('../class/object')

module.exports = async (x) => {
	try {
		//var cpRes = {}
		Object.entries(x).forEach(([key, value]) => console.log(`${key}: ${value}`)); 
		//return cpRes
	} catch (err) {
		console.error(err)
	}
}



