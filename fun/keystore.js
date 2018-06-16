const Etcd = require('node-etcd')
const etcdObjectify = require('etcd-result-objectify')


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
				process.stdout.write('.')
				resolve(res)
			}
		})
	})
}

module.exports.create = function (x) {
		return new Promise(function(resolve, reject) {
		const etcd = new Etcd(x.keyhost)
			etcd.create(x.key, x.value, x.options, function (err, res) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
	})
}


module.exports.destroy = function (x) {
		return new Promise(function(resolve, reject) {
		const etcd = new Etcd(x.keyhost)
			etcd.del(x.key, x.options, function (err, res) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
	})
}

module.exports.uids = function () {
		return new Promise(function(resolve, reject) {
		const etcd = new Etcd('http://keystore.toonces:2379')
			etcd.get('obj/tag', { recursive: true }, function (err, res) {
			if (err) {
				reject(err)
			} else {
				const resObj = etcdObjectify(res.node)
				console.log(typeof resObj)
				resolve(resObj)
			}
		})
	})
}
