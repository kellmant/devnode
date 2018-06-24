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
const doParse = require('../fun/testobj')
const Keystore = require('../class/keystore')
const Cpobject = require('../class/object')
let mykey = 'tags'

// example runtime for your class method
//

module.exports = async (args) => {
	try {
		if (args._[1]) {
			console.log(args._[1])
			mykey = args._[1]
		}
		const myKeystore = new Keystore()
		let myValue = await myKeystore.getKey(mykey)
		//let myValue = JSON.parse(await myKeystore.resVal())
		Object.entries(myValue.node.nodes).forEach(([key, value]) => {
			console.log('this key : ' + value)
		})
	} catch (err) {
		console.log('ERROR IN SESSION event : ' + err.message)
		console.log(err)
	} finally {
		//let runcmd = {'_':['logout']}
		//require('../bin/logout')(runcmd)
		console.log('try runtime finally done.')
	}
}

