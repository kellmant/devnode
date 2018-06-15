"use strict";
// STOP - THIS IS A TEMPLATE
//
// copy this to the new filename for your class method
// put a copy of your main runtime with the class in bin/
// put a copy of the class constructor in class/
// put a copy of the functions your class needs in fun/

// main runtime
// recieve and process args from the callout
// this will show you return values of your args 
// for runtime
//
const path = require('path');
const scriptname = path.basename(__filename);
const classcall = `../class/${scriptname}`
//const myClass = require(classcall)
const doAuth = require('../bin/auth')
const doWrite = require('../fun/writefile')
const doKey = require('../fun/writekey')
const doParse = require('../fun/objkey')
const cpSession = require('../playground/session.json')
const Cptoken = require('../class/token')

// example runtime for your class method
//

module.exports = async () => {
	try {
		if (!cpSession.uid) {
			require('../bin/help')
			return
		}
		let Myevent = await new Cptoken(cpSession)
		//await doWrite('token', myToken)
		//await console.dir(cpSession)
		// run api commands here
		//
		await Myevent.print()
		let mydata = await Myevent.setOff(0, 500, 'full')
		let myshow = await Myevent.showObjects(cpSession, mydata)
		let mypage = await Myevent.setPage(myshow.data.from, myshow.data.to, myshow.data.total)
		//await console.dir(mydata)
		//await console.dir(mypage)
		await doParse(myshow.data)
		//await console.dir(myparsed)
		if (mypage.total > mydata.offset) {
			mydata.offset = Number(mydata.offset) + Number(mydata.limit)
			while (mypage.total > mydata.offset) {
				//console.log(`${mypage.total} is more than the ${mypage.to}`)
				mydata = await Myevent.setOff(mydata.offset, 500, 'full')
				myshow = await Myevent.showObjects(cpSession, mydata)
				mypage = await Myevent.setPage(myshow.data.from, myshow.data.to, myshow.data.total)
				//await console.dir(myshow.data.objects)
				await doParse(myshow.data)
				//await console.dir(myparsed)
				//await Myevent.print()
				//console.log(`${mydata.offset} of ${mypage.total} objects indexed`)
				mydata.offset = Number(mydata.offset) + Number(mydata.limit)
			}
			//console.log(`${mydata.offset} of ${mypage.total} objects indexed`)
		}

		//await doWrite('objects', myshow.data.objects)
		//await console.dir(myshow.data)
		//
		//let myclose = await myToken.closeToken(myToken)
		//await doWrite('session', myclose.data)
		//await console.dir(myclose.data)
		//return mypage
	} catch (err) {
		console.log('ERROR IN SESSION event for %j', cpSession)
		console.log(err)
	}
}

