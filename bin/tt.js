"use strict";

const path = require('path');
const scriptname = path.basename(__filename);
//const classcall = `../class/${scriptname}`
const Rejson = require('../fun/rejson')
const doWrite = require('../fun/writefile')



module.exports = async (args) => {
	try {
		var myarr = []
		var myvalue = {}
		if (args._[1])  {
			myvalue = await Rejson.myobj(args._[1])
			console.log(await myvalue)
			console.log('trying to get my values out')
			myarr = await Rejson.myvals(args._[1], myvalue)
			console.log(await myarr)
		}
		console.log('trying to write my values to file')
		await doWrite(args._[1], myarr)
		await console.log(myvalue[-1])
		await console.log(typeof myarr)
		await Rejson.close()
	} catch (err) {
		console.log(err.message)
		throw new Error(err)
	}
}


