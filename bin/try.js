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
const pglimit = 500
const details = 'standard'
const path = require('path');
const scriptname = path.basename(__filename);
const classcall = `../class/${scriptname}`
//const myClass = require(classcall)
const doWrite = require('../fun/writefile')
const doKey = require('../fun/writekey')
// this parser will backup all objects to obj/uid
//
//const doParse = require('../fun/objkey')
// this will just dump the key for analysis
//const doParse = require('../fun/testobj')

const doParse = require('../fun/used')
const cpLive = require('../fun/session')
const Cptoken = require('../class/token')
const Keystore = require('../class/keystore')
const cpSession = cpLive()

// example runtime for your class method
//

module.exports = async (args) => {
	try {
		//await console.dir(cpSession)
		if (!cpSession.uid) {
			require('../bin/login')
			console.log('No Active Session, please login')
		}
		if (args) {
		//	require('../bin/login')
			console.dir(args)
		}

		let Mycache = await new Keystore()
		let myUsed = await Mycache.getUids()
		for (var i in myUsed) {
		await console.log(myUsed[i])
		}
		//await console.dir(myUsed)
		return
	} catch (err) {
		console.log('ERROR IN SESSION event for %j', cpSession)
		console.log(err)
	}
}

