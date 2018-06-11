process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const axios = require('axios')



module.exports.read = function (x) {
	return new Promise(function(resolve, reject) {
		axios.defaults.headers.common['Accept'] = 'application/json'
		axios(x)
		.then(function (value, err) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
	})
}

