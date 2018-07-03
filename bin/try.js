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
const doParse = require('../fun/tagit')
const Keystore = require('../class/keystore')
const Cpobject = require('../class/object')
const CpLive = require('../fun/session')
const Cpapi = require('../class/cpapi')
let mykey = 'tag'
// example runtime for your class method
//

module.exports = async (args) => {
	try {
		if (args._[1]) {
		//	console.log(args._[1])
			mykey = args._[1]
		}
		//let myData = {}
		const cpSession = await CpLive()
		const myRes = await doParse()
		Object.keys(myRes).forEach(key => {
			let myData = JSON.parse(myRes[key].data)
			console.dir(myData.tags)
			const Myapi = new Cpapi(cpSession)
			Myapi.setData(myData)
			Myapi.setCmd(myRes[key].cmd)
			Myapi.print()
			Myapi.apiPost().then((res) => { console.log(res)})
		})
	} catch (err) {
		console.log('ERROR IN SESSION event : ' + err.message)
		//console.log(err)
	} finally {
		//let runcmd = {'_':['logout']}
		//require('../bin/logout')(runcmd)
		//const cpSession = await CpLive()
		//const Myclose = new Cpapi(cpSession)
		//Myclose.setCmd('publish')
		//Myclose.print()
		//await Myclose.apiPost()
		console.log(scriptname + ' runtime finally done.')
	}
}

