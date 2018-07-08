"use strict";

const path = require('path');
const scriptname = path.basename(__filename);
const classcall = `../class/${scriptname}`
const Keystore = require('../fun/redis')


module.exports = async (args) => {
	try {
		console.log('RUNTIME passed args : %j', args)
		if (!args.key) {
			args.key = '*'
		}
		//console.log(JSON.stringify(await Keystore.get(args.key), null, 2))
		const myvalue = await Keystore.all(args.key)
		//await console.dir(myvalue)
		await console.log(typeof myvalue)
		if (myvalue === null) {
			await console.log(args.key + ' not a key in redis')
		} else {
			await console.log('Keys: ')
			await console.dir(myvalue)
		}
		return await myvalue
	} catch (err) {
		console.log(err)
	}
}


