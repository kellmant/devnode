
const Objectclass = require('../class/object')

module.exports = async (x) => {
	try {
		for (var i in x) {
			for (var j in x[i]) {
				const myObjs = Object.keys(x[i][j]).reduce((p, c) => ({...p, [c]: x[i][j][c]}), {})
				var cpType = myObjs.type
				let cpRes = {}
				//if (myObjs.state) {
				//	var cpUid = myObjs.uid
				//	var cpName = myObjs.name
				//} else {
				//	var cpName = myObjs.name
				//	var cpUid = myObjs.uid
				//}
				let cpData = new Objectclass(myObjs)
				if (cpType == 'host') {
					cpRes = cpData.host(myObjs)
				} else if (cpType == 'network') {
					cpRes = cpData.network(myObjs)
				} else if (cpType == 'group') {
					cpRes = cpData.group(myObjs)
				} else {
					continue
				}
				//myObjs.mycmd = '/' + cpName
				await console.dir(cpRes)
				await console.log('\n')
				//return myObjs
			}
		}
	} catch (err) {
		console.error(err)
	}
}


