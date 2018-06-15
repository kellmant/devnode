
const Objectclass = require('../class/object')
const doKey = require('../fun/writekey')



module.exports = async (x) => {
	try {
		var cpRes = {}
		for (var i in x) {
			for (var j in x[i]) {
				const myObj = Object.keys(x[i][j]).reduce((p, c) => ({...p, [c]: x[i][j][c]}), {})
				cpRes.key = 'obj/' + myObj.type + '/' + myObj.uid
				cpRes.value = JSON.stringify(myObj)
				doKey(cpRes)
				}
			}
		return
	} catch (err) {
		console.error(err)
	}
}


//Object.entries(obj).forEach(([key, value]) => console.log(`${key}: ${value}`)); 

