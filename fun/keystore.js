const Etcd = require('node-etcd')


module.exports.read = function (x) {
		const etcd = new Etcd(x.keyhost)
		return new Promise(function(resolve, reject) {
			etcd.get(x.key, x.options, function (err, res) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
	})
}

module.exports.update =  function (x) {
		return new Promise(function(resolve, reject) {
			const etcd = new Etcd(x.keyhost)
			etcd.set(x.key, x.value, x.options, function (err, res) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
	})
}

module.exports.create = function (x) {
		const etcd = new Etcd(x.keyhost)
		return new Promise(function(resolve, reject) {
			etcd.create(x.key, x.value, x.options, function (err, res) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
	})
}


