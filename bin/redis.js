"use strict";

const path = require('path');
const scriptname = path.basename(__filename);
const classcall = `../class/${scriptname}`
//const Keystore = require('../fun/redis')
const redis = require('redis')
//const jsonify = require('redis-jsonify')
const Rejson = require('../fun/rejson')
const doWrite = require('../fun/writefile')



module.exports = async (args) => {
	try {
		var myvalue = {}
		var mylength = 0
		console.log('RUNTIME passed args : %j', args)
		if (args.flush) {
			const client = redis.createClient('redis://redis:6379')
			await client.flushdb()
			await client.quit()
			//return
		}
		if ((args._[1]) && (args.index)) {
			let mycnt = 0
			let myvals = 0
			var safeindex = `['${args.index}']`
			//var safekey = `['${args._[1]}']`
			var safekey = args._[1]
			var grp = {}
			var obj = []
			grp.obj = obj
			mylength = await Rejson.count(args._[1])
			for (var i = 1; i < mylength; i++) {
				myvalue = await Rejson.mykey(safekey, '_' + i + safeindex)
				//myvalue = await Rejson.mykey(args._[1], ['_' + i + safeindex, '_' + i])
				//myvalue = await Rejson.mykey(args._[1], '_' + i)
				var mycvar = JSON.stringify(await myvalue)
				var sayfind = myvalue[0] + safeindex
				//console.dir(myvalue[0].name)
				if ((mycvar.length) < 7) {
					continue
				} else if (args.value){
					let newvals = myvalue.find(k => k == args.value)
					if (newvals) {
						myvals++
						let myhit = await Rejson.mykey(safekey, '_' + i)
						//grp.obj.push({'name' : myhit[0].name, 'uid' : myhit[0].uid})
						grp.obj.push(myhit[0])
						//console.log('name: ' + myhit[0].name + ' uid: ' + myhit[0].uid)
						} else {
							continue
						}
				} else {
					mycnt++
				console.dir(await myvalue)
				}
				
				}
				console.log(await mycnt + ' of ' + mylength + ' objects have ' + args.index + ' '  + args._[0] + ' ' + args._[1])
				console.dir(grp)
				console.log(typeof grp)
				console.log(grp.length)
				console.log(myvals + ' => ' + safeindex + ' ' + args.value)
				if (args.value) {
					await doWrite(args.value, grp)
				}
				args._[1] = 'ls'
		}
		if ((args._[1]) && (args.schema)) {
			if (args._[2]) {
			myvalue = await Rejson.myobj(args._[1], args._[2])
			} else {
			myvalue = await Rejson.myobj(args._[1], '.')
			}
			console.log(await myvalue)
			args._[1] = 'ls'
		}
		if ((args._[2]) && (args._[1] !== 'ls')) {
			if (!args._[3]) {
			myvalue = await Rejson.mykey(args._[1], args._[2])
			} else {
			let safekey = `['${args._[2]}']['${args._[3]}']`
			myvalue = await Rejson.mykey(args._[1], safekey)
			}
			console.log(await myvalue)
			args._[1] = 'ls'
			//return await myvalue
		}
		if ((args._[1] === 'ls') || (!args._[1])) {
			console.log(' ')
			let myhelp = { '_' : ['rls'] }	
			let myout = await require('../bin/rls')(myhelp)
			console.dir(await myout)
			args._[1] = 'ls'
			//await rclient.quit()
			}
		if (args._[1] !== 'ls' && (!args._[2])) {
			myvalue = await Rejson.myobj(args._[1])
			console.dir(await myvalue)
			console.log(await myvalue.length)
			console.log(typeof myvalue)
			//return 
			//return await Rejson.close()
		}
		await Rejson.close()
	} catch (err) {
		console.log(err.message)
		throw new Error(err)
	}
}


