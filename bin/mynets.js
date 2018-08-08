"use strict";

const path = require('path');
const scriptname = path.basename(__filename);
const classcall = `../class/${scriptname}`
//const Keystore = require('../fun/redis')
const redis = require('redis')
//const jsonify = require('redis-jsonify')
const Rejson = require('../fun/rejson')
const doWrite = require('../fun/writefile')
const myindex = 'subnet4'
var safekey = 'all'


module.exports = async () => {
	try {
		var myvalue = {}
		var mylength = 0
		var mycnt = 0
		var myvals = 0
		var safeindex = `['${myindex}']`
		var grp = {}
		var obj = []
		grp.obj = obj
		mylength = await Rejson.count(safekey)
		for (var i = 1; i < mylength; i++) {
			myvalue = await Rejson.mykey(safekey, '_' + i + safeindex)
			grp.obj.push(myvalue)
		}
		console.log(await grp.obj)
		let mysetit = await Rejson.cproot('net', grp.obj) 
		console.log(await typeof mysetit)
		console.log(await grp.obj.length)
			//await doWrite(args.value, grp)
		await Rejson.close()
	} catch (err) {
		console.log(err.message)
		throw new Error(err)
	}
}


