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

const delay = async () => {
	const incmd = {'_':['login']}
	const startup = require('../bin/login')(incmd, scriptname)
	await console.log(startup)
	return startup
}
const myoffset = 0
const pglimit = 500
const details = 'full'
const classcall = `../class/${scriptname}`
//const myClass = require(classcall)

const doParse = require('../fun/anyobj')
const doWrite = require('../fun/writefile')
const usedIn = require('../fun/whereused')
const Rejson = require('../fun/rejson')
const getUid = require('../fun/reduid')
const redis = require('redis')
const jsonify = require('redis-jsonify')

const cpLive = require('../fun/session')
const Cpapi = require('../class/cpapi')
const Keystore = require('../class/keystore')
const Cpobject = require('../class/object')
let mycmd = 'show-sessions'

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
		if (args.last) {
			console.log('showing last published')
			mycmd = 'show-last-published-session'
		}
		if (args.uid) {
			console.log('showing session : ' + args.uid)
			mycmd = 'show-session'
		}
		const cpSession = await cpLive()
		await console.dir(cpSession)
		if (!cpSession.uid) {
			require('../bin/login')
			console.log('No Active Session, please login')
		}
		let Myapi = await new Cpapi(cpSession)
		await Myapi.print()
		if ((mycmd !== 'show-session') || (!args.uid)) {
		await Myapi.setCnt(myoffset, pglimit)
		await Myapi.setDetail(details)
		}
		if (args) {
		await Myapi.addData(args)
		}
		await Myapi.setCmd(mycmd)
		await Myapi.print()
		let mycpres = await Myapi.apiPost()
		await doWrite('dump', mycpres)
		let parsedArr = []
		let parsedObj = {}
		var getRes = {}
		//parsedArr.push(await doParse(mycpres))
		parsedArr.push(await mycpres)
		//parsedObj = await doParse(mycpres)
		//parsedArr.push(parsedObj)
		if (mycpres.total > mycpres.to) {
			let inoffset = Number(myoffset) + Number(pglimit)
			while (mycpres.total > inoffset) {
				await Myapi.setCnt(inoffset, pglimit)
				mycpres = await Myapi.apiPost()
				//getRes = mycpres
				//parsedObj = await doParse(mycpres)
				parsedArr.push(await mycpres)
				inoffset = Number(inoffset) + Number(pglimit)
			}
		}
		//parsedObj[args.filter] = await doParse(getRes)
		//parsedArr.push(parsedObj)
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
		//Object.entries(parsedArr.objects).forEach(([key, value]) => { 
			//console.log('XXXXX ')
			//Rejson.filter('net', '_' + args.filter, value)
		//	console.log(value)
		//	console.log(key)
		//	console.log('XXXXX ')
		//})
		//console.dir(parsedArr)
		console.log(parsedArr.length)
		console.log(typeof parsedArr)
		await doWrite('try', parsedArr)
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

