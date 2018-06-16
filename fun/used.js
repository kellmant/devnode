
const Objectclass = require('../class/object')
const doKey = require('../fun/writekey')
const Keystore = require('../class/token')



module.exports = async (x) => {
	try {
		var cpRes = {}
		for (var i in x) {
			for (var j in x[i]) {
				const myObj = Object.keys(x[i][j]).reduce((p, c) => ({...p, [c]: x[i][j][c]}), {})
				console.dir(myObj)
				const Myevent = new Keystore('keystore.toonces')
				//let mydata = await Myevent.setOff(0, 500, 'full')
				let mydata = {}
				mydata.uid = myObj.uid
				let myshow = await Myevent.whereIn(cpSession, mydata, args)
		let mypage = await Myevent.setPage(myshow.data.from, myshow.data.to, myshow.data.total)
		process.stdout.write(' ' + myshow.data.to + ' of ' + myshow.data.total + ' ')
				//var cpType = myObj.type
				cpRes.key = 'obj/tag/' + myObj.uid + '/' + x[i][j]
				let cpData = new Objectclass(myshow.data)
				cpRes.value = JSON.stringify(cpData)
				await doKey(cpRes)
			}
		}
		return
	} catch (err) {
		console.error(err)
	}
}


//Object.entries(obj).forEach(([key, value]) => console.log(`${key}: ${value}`)); 

