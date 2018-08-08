

module.exports = async (x) => {
	try {
		var cpRes = []
		//Object.entries(x).forEach(([key, value]) => console.log(`obj/${key}: ${value}`)); 
		Object.entries(x.objects).forEach(([key, value]) => cpRes.push(value))
		return cpRes
	} catch (err) {
		console.error(err)
	}
}



