"use strict";
//
// ctrl policy - collect policy by name.
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
let mycmd = 'show-access-rulebase'
//let mydom = 'System Data'
var objects = {}
var parsedArr = []
var parsedObj = {}

// example runtime for your class method
//

module.exports = async (args) => {
	try {
		setsys.desc = scriptname
		if (args.domain) {
			setsys.domain = args.domain
		}
		await delay(setsys)
		if (!args.name) {
			args.name = 'Network'
		}
		if (args.sort) {
			let order = [{ 'ASC': args.sort }]
			args.order = order
		}
		args.dict = false
		const cpSession = await cpLive()
		await console.dir(cpSession)
		if (!cpSession.uid) {
			require('../bin/login')
			console.log('No Active Session, please login')
		}
		let Myapi = await new Cpapi(cpSession)
		await Myapi.print()
		if (mycmd !== 'show-package') {
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
		//objects = mycpres['objects-dictionary']
		//parsedArr.objects = mycpres['objects-dictionary']
		//parsedArr.objects = []
		//parsedArr.objects.push(await mycpres['objects-dictonary'])
		parsedArr.push(await mycpres)
		//parsedObj = await doParse(mycpres)
		//parsedArr.push(parsedObj)
		if (mycpres.total > mycpres.to) {
			let inoffset = Number(myoffset) + Number(pglimit)
			while (mycpres.total > inoffset) {
				await Myapi.setCnt(inoffset, pglimit)
				mycpres = await Myapi.apiPost()
				//parsedArr.objects += mycpres['objects-dictionary']
				//getRes = mycpres
				//parsedObj = await doParse(mycpres)
				//parsedArr[objects].push(await mycpres['objects-dictonary'])
				parsedArr.push(await mycpres)
				inoffset = Number(inoffset) + Number(pglimit)
			}
		}
		console.log(parsedArr.length)
		console.log(typeof parsedArr)
		await doWrite('try', parsedArr)
	} catch (err) {
		console.log('ERROR IN SESSION event : ' + err.message)
		console.log(err)
	} finally {
		let runcmd = {'_':['logout']}
		require('../bin/logout')(runcmd)
	}
}
