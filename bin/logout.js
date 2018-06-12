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
//const doAuth = require('../bin/auth')
const doWrite = require('../fun/writefile')
const Cptoken = require('../class/token')
//const cpSession = require('../playground/session.json')

// example runtime for your class method
//

module.exports = async () => {
	try {
		const cpSession = require('../playground/session.json')
		if (!cpSession.uid) {
			require('../bin/help')
			return
		}
		const endToken = new Cptoken(cpSession)
		//
		let myclose = await endToken.closeToken(endToken)
		await doWrite('session', myclose.data)
		await console.dir(myclose.data)
	} catch (err) {
		console.log('ERROR IN SESSION LOGIN for %j', cpSession)
		console.log(err)
		return process.exit(1)
	}
}

