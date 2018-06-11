process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const axios = require('axios')



module.exports = function (x) {
	console.log(`sending ${x.url} to api call . . . `)
	return new Promise(function(resolve, reject) {
		axios.defaults.headers.common['Accept'] = 'application/json'
		axios(x)
		.then(function (res, err) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
	})
}

