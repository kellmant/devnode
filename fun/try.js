//const redis = require('redis')
const Rejson = require('iorejson')
const myjson = new Rejson('redis://redis:6379')
var myout = {}

module.exports.myget = async (k) => {
	try {
		myout = await myjson.mget(k, '.') 
		//await myjson.client.quit()
		return await myout
	} catch (err) {
		console.log(err)
	}
}

module.exports.myvals = async (k, p) => {
	try {
		myout = await myjson.get(k, p) 
		//await myjson.client.quit()
		await console.log('getting vals from ' + k + ' and ' + p)
		await console.log(myout)
		return await myout
	} catch (err) {
		console.log(err)
	}
}

module.exports.myset = async (f, p, k) => {
	try {
		myjson.set(f, p, k, 'NX')
		//await myjson.set(k.type, c, k)
		//return await myout
		//await myjson.client.quit()
	} catch (err) {
		console.log(err)
		console.log(k.name)
	}
}

module.exports.mykey = async (k, f) => {
	try {
		myout = await myjson.mget(k, f)
		//await myjson.client.quit()
		return await myout
	} catch (err) {
		console.log(err)
		console.log(k.name)
	}
}

module.exports.myobj = async (k, f) => {
	try {
		if (!f) {
			f = '.'
		}
		myout = await myjson.objkeys(k, f)
		mylen = await myjson.objlen(k, f)
		//await myjson.client.quit()
		console.log(await mylen)
		return await myout
	} catch (err) {
		console.log(err)
		console.log(k)
	}
}

module.exports.count = async (k) => {
	try {
		let f = '.'
		mylen = await myjson.objlen(k, f)
		console.log(await mylen)
		return await mylen
	} catch (err) {
		console.log(err)
		console.log(k)
	}
}
module.exports.rootkey = async (r, k) => {
	try {
		myjson.set(r, '.', k, 'NX')
		//await console.log(myout)
		//await myjson.client.quit()
		//return await myout
	} catch (err) {
		console.log(err)
		console.log(k)
	}
}

module.exports.append = async (f,c,k) => {
	try {
		myjson.set(f, '_' + c, k)
		//await console.log(myout)
		//await myjson.client.quit()
		//return await myout
	} catch (err) {
		console.log(err)
		console.log(k)
	}
}

module.exports.close = async () => {
	try {
		myjson.client.quit()
		return
		//return await myout
	} catch (err) {
		console.log(err)
	}
}

