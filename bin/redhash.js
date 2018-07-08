"use strict";

const path = require('path');
const scriptname = path.basename(__filename);
const classcall = `../class/${scriptname}`
const Keystore = require('../fun/redis')


module.exports = async (args) => {
	try {
		let myvalue = {}
		let mylength = 0
		console.log('RUNTIME passed args : %j', args)
		if ((!args.hash) && (!args.key)) {
			args.hash = '*'
			myvalue = await Keystore.all(args.hash)
		} else {
			if (!args.key) {
			myvalue = await Keystore.hkeys(args.hash)
			mylength = await Keystore.hlen(args.hash)
			} else {
			myvalue = await Keystore.hget(args.hash, args.key)
			}
		}
		await console.log(typeof myvalue)
		await console.log('Keys: ')
		await console.dir(myvalue)
		await console.log('Length: ' + mylength)
		await console.log('Name: ' + myvalue.name)
	} catch (err) {
		console.log(err)
	}
}


