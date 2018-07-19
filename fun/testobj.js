

module.exports = async (x) => {
	try {
		console.log(x.from + ' to ' + x.to + ' of total: ' + x.total)
		var cpRes = []
		if (x.hasOwnProperty('objects')) {
			//console.log(' has objects property to index')
			Object.entries(x.objects).forEach(([key, value]) => cpRes.push({[value.uid] : value}))
			//Object.entries(x.objects).forEach(([key, value]) => { console.dir(key + ' ' + value.type + ' : ' + value.name + ' = ' + value)})
			return cpRes
			}
	} catch (err) {
		console.error(err)
	}
}



