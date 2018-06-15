
const Objectclass = require('../class/object')
const doKey = require('../fun/writekey')



module.exports = async (x) => {
	try {
		var cpRes = {}
		for (var i in x) {
			for (var j in x[i]) {
				const myObjs = Object.keys(x[i][j]).reduce((p, c) => ({...p, [c]: x[i][j][c]}), {})
				var cpType = myObjs.type
				cpRes.key = 'opb/' + cpType + '/' + myObjs.uid
				let cpData = new Objectclass(myObjs)
				if (cpType == 'host') {
					cpRes.value = JSON.stringify(cpData.host(myObjs))
					await doKey(cpRes)
				} else if (cpType == 'network') {
					cpRes.value = JSON.stringify(cpData.network(myObjs))
					await doKey(cpRes)
				//} else if (cpType == 'group') {
				//	cpRes = cpData.group(myObjs)
				} else {
					continue
				}
			}
		}
		return
	} catch (err) {
		console.error(err)
	}
}


//Object.entries(obj).forEach(([key, value]) => console.log(`${key}: ${value}`)); 

