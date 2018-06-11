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
const myClass = require(classcall)

// example runtime for your class method
//

module.exports = async (args) => {
	try {
		//if (!args._[1]) {
		//	require('../bin/help')(args)
		//	return
		//}
		console.dir(args)
		const myThing = new myClass(args)
		myThing.print()
		//await myThing.setAuth()
		//await myThing.print()
		//let myapi = await myThing.getToken()
		//await console.dir(myapi.data)
		//return myapi.data
	} catch (err) {
		console.log(err)
	}
}

