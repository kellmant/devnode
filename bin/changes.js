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
const setsys = []

const delay = async (mysys) => {
	const incmd = {'_':['login']}
	const startup = require('../bin/login')(incmd, mysys)
	await console.log(startup)
	return startup
}
const myoffset = 0
const pglimit = 3
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
let mycmd = 'show-changes'

// example runtime for your class method
//

module.exports = async (args) => {
	try {
		setsys.desc = scriptname
		if (args.domain) {
			setsys.domain = args.domain
		}
		await delay(setsys)
		let newcpdata = {}
		if (args._[1]) {
			console.log(args._[1])
			mycmd = args._[1]
		}
		if (args.last) {
			console.log('showing last published')
			mycmd = 'show-last-published-session'
		}
		if (args.from) {
			console.log('showing changes from ' + args.from)
		}
		const cpSession = await cpLive()
		await console.dir(cpSession)
		if (!cpSession.uid) {
			require('../bin/login')
			console.log('No Active Session, please login')
		}
		let Myapi = await new Cpapi(cpSession)
		await Myapi.print()
		if (!args.last) {
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
		parsedArr.push(await mycpres)
		//parsedObj = await doParse(mycpres)
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
		//const rclient = jsonify(redis.createClient('redis://redis:6379'))
		//console.log(newArray)
		//Object.entries(parsedArr).forEach(([key, value]) => { 
			//console.log(value)
			//console.log('XXXXX ')
			//Rejson.filter('net', '_' + args.filter, value)
			//console.log(value)
			//console.log(key)
			//console.log('XXXXX ')
		//})
		//console.dir(parsedArr)
		await doWrite('task', parsedArr)
		//console.log(newArray[0])
		console.log(' ')
		console.log(parsedArr[0]['task-id'])
		console.log(' ')
	} catch (err) {
		console.log('ERROR IN SESSION event : ' + err.message)
		//console.log(err)
		throw err
	} finally {
		let runcmd = {'_':['logout']}
		require('../bin/logout')(runcmd)
		return
	}
}

