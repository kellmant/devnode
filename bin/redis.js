"use strict";

const path = require('path');
const scriptname = path.basename(__filename);
const classcall = `../class/${scriptname}`
const Keystore = require('../fun/redis')
const redis = require('redis')
const jsonify = require('redis-jsonify')



module.exports = async (args) => {
	try {
		const rclient = jsonify(redis.createClient('redis://redis:6379'))
		let myvalue = {}
		var mylength = 0
		console.log('RUNTIME passed args : %j', args)
		if (args.flush) {
			const client = redis.createClient('redis://redis:6379')
			await client.flushdb()
			await client.quit()
		}
		if ((args.key) && (args._[1])) {
			await rclient.hget(args._[1], args.key, function (err, reply) {
					console.dir(reply)
					console.log(reply.name)
					console.log(reply.type)
					console.log(reply.uid)
					console.log(typeof reply)
			})
			await rclient.quit()
			return reply
		}
		if (args._[1] === 'ls') {
			let myhelp = { '_' : ['rls'] }	
			let myout = await require('../bin/rls')(myhelp)
			args._[1] = 'ROOT hash of key'
			}
		if (!args._[1]) {
			args.hash = '*'
			rclient.keys(args.hash, function (err, replies) {
				replies.forEach(function (reply, j) {
					rclient.hvals(reply, function (err, objreplies) {
						objreplies.forEach(function (objreply, i) {
							mylength++
						})
					process.stdout.write(reply)
					process.stdout.write('   ' + objreplies.length + ' keys')
					console.log('  of ' + mylength + ' objects indexed')
					})
				})
				rclient.quit()
			})

			} else {
			rclient.hvals(args._[1], function (err, replies) {
			//console.log(replies.length + ' objects')
				replies.forEach(function (reply, i) {
					let objres = JSON.parse(reply)
					//console.log(objres)
					process.stdout.write(objres.uid)
					process.stdout.write(' : ' + objres.name)
					console.log(typeof objres)
				})
				console.log(replies.length + ' ' + args._[1] + ' objects')
				rclient.quit()
			})
		}
	} catch (err) {
		console.log(err.message)
		throw new Error(err)
	}
}


