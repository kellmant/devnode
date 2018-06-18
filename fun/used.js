
const Objectclass = require('../class/object')
const doKey = require('../fun/writekey')
const Cptoken = require('../class/token')
const cpLive = require('../fun/session')



module.exports = async (x) => {
	try {
			let cpSession = await cpLive()
		const Myevent = new Cptoken(cpSession)
				let mydata = {}
				mydata.uid = x
				let myshow = await Myevent.usedIn(cpSession, mydata)
				await console.dir(myshow)
				return
				//var cpType = myObj.type
				cpRes.key = 'obj/tag/' + x.filter + myObj.uid + '/' + x[i][j]
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

