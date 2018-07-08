const redis = require('redis')
const jsonify = require('redis-jsonify')


module.exports.get = function (k) {
		const client = jsonify(redis.createClient('redis://redis:6379'))
		return new Promise(function(resolve, reject) {
			client.get(k, function (err, res) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
		client.quit(function () {	})
	})
}

module.exports.all = async (k) => {
		const client = jsonify(redis.createClient('redis://redis:6379'))
		return new Promise(function(resolve, reject) {
			client.keys(k, function (err, res) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
		client.quit(function () {	})
	})
}

module.exports.set = async (k, v) => {
		const client = jsonify(redis.createClient('redis://redis:6379'))
		return new Promise(function(resolve, reject) {
			client.set(k, v, function (err, res) {
			if (err) {
				reject(err)
			} else {
				process.stdout.write('+')
				resolve(res)
			}
		})
		client.quit(function () {	})
	})
}

module.exports.hset = async (h, k, v) => {
		const client = jsonify(redis.createClient('redis://redis:6379'))
		return new Promise(function(resolve, reject) {
			client.hset(h, k, v, function (err, res) {
			if (err) {
				reject(err)
			} else {
				process.stdout.write('+')
				resolve(res)
			}
		})
		client.quit(function () {	})
	})
}

module.exports.hget = async (f, k) => {
		const client = jsonify(redis.createClient('redis://redis:6379'))
		return new Promise(function(resolve, reject) {
			client.hget(f, k, function (err, res) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
		client.quit()
	})
}

module.exports.hkeys = async (h) => {
		const client = jsonify(redis.createClient('redis://redis:6379'))
		return new Promise(function(resolve, reject) {
			client.hkeys(h, function (err, res) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
		client.quit(function () {	})
	})
}

module.exports.hlen = async (h) => {
		const client = redis.createClient('redis://redis:6379')
		return new Promise(function(resolve, reject) {
			client.hlen(h, function (err, res) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
		client.quit(function () {	})
	})
}

module.exports.expire = async (k, v, exp) => {
		const client = jsonify(redis.createClient('redis://redis:6379'))
		return new Promise(function(resolve, reject) {
			client.setex(k, exp, v, function (err, res) {
			if (err) {
				reject(err)
			} else {
				process.stdout.write('.')
				resolve(res)
			}
		})
		client.quit(function () {	})
	})
}

