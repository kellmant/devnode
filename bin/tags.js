"use strict";

const path = require('path');
const scriptname = 'keystore'
const classcall = `../class/${scriptname}`
const Keystore = require(classcall)


module.exports = async (args) => {
	try {
		const myKeys = new Keystore()
		myKeys.print()
		console.log('RUNTIME passed args : %j', args)
		//return
		if (args.keyhost) {
				myKeys.setKeyhost(args.keyhost)
		} else {
				myKeys.setKeyhost()
		}
		await myKeys.setOpt(args)
		if (!args.value) {
		await myKeys.getKey(args.key)
		//await myKeys.print()
		await myKeys.showRes()
		let myvalue = await myKeys.resVal()
		await console.log(myvalue)
			return myvalue
		} else {
		await myKeys.setKey(args.key, args.value)
			return 
		}
	} catch (err) {
		console.log(err)
	}
}


