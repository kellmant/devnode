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

const delay = async () => {
	const incmd = {'_':['login']}
	const startup = require('../bin/login')(incmd)
	await console.log(startup)
	return startup
}
const myoffset = 0
const pglimit = 500
const details = 'standard'
const path = require('path');
const scriptname = path.basename(__filename);
const classcall = `../class/${scriptname}`
//const myClass = require(classcall)

const doParse = require('../fun/testobj')
const getUid = require('../fun/reduid')
const redis = require('redis')
const jsonify = require('redis-jsonify')

const cpLive = require('../fun/session')
const Cpapi = require('../class/cpapi')
const Keystore = require('../class/keystore')
const Cpobject = require('../class/object')
let mycmd = 'show-objects'

// example runtime for your class method
//

module.exports = async (args) => {
	try {
		let newcpdata = {}
		await delay()
		if (args._[1]) {
			console.log(args._[1])
			mycmd = args._[1]
		}
		if (args.unused) {
			console.log('showing unused objects')
			mycmd = 'show-unused-objects'
		}
		const cpSession = await cpLive()
		await console.dir(cpSession)
		if (!cpSession.uid) {
			require('../bin/login')
			console.log('No Active Session, please login')
		}
		let Myapi = await new Cpapi(cpSession)
		await Myapi.print()
		if (mycmd !== 'show-commands') {
		await Myapi.setCnt(myoffset, pglimit)
		await Myapi.setDetail(details)
		}
		if (args) {
		await Myapi.addData(args)
		}
		await Myapi.setCmd(mycmd)
		await Myapi.print()
		let mycpres = await Myapi.apiPost()
		let parsedObj = []
		parsedObj.push(await doParse(mycpres))
		//parsedObj += await doParse(mycpres)
		if (mycpres.total > mycpres.to) {
			let inoffset = Number(myoffset) + Number(pglimit)
			while (mycpres.total > inoffset) {
				await Myapi.setCnt(inoffset, pglimit)
				mycpres = await Myapi.apiPost()
				parsedObj.push(await doParse(mycpres))
				//parsedObj += await doParse(mycpres)
				inoffset = Number(inoffset) + Number(pglimit)
			}
		}
		if (mycmd === 'show-unused-objects') {
			args.filter = 'unused'
			args.type = 'object'
			if (!args.tags) {
				args.tags = 'unused'
			}
		}
		if (!args.filter) {
			args.filter = 'all'
		}
		if (!args.type) {
			args.type = 'object'
		}

		//const rclient = jsonify(redis.createClient('redis://redis:6379'))
		let mycnt = 0
		var myOid = {}
		var myHash = {}
		var myreturn = {}
		//var newArray = Array.from(Object.values(parsedObj))
		//console.log(newArray)
		Object.entries(parsedObj).forEach(([key, value]) => { 
			console.dir(value)
			console.log(value.length)
		})
		//console.dir(parsedObj)
		console.log(parsedObj.length)
		console.log(typeof parsedObj)
		//console.log(newArray[0])
	} catch (err) {
		console.log('ERROR IN SESSION event : ' + err.message)
		console.log(err)
	} finally {
		let runcmd = {'_':['logout']}
		require('../bin/logout')(runcmd)
		return
	}
}

