const Rejson = require('../fun/try')
const Netmask = require('netmask').Netmask
const usedIn = require('../fun/whereused')
const geoip = require('geoip-plus');

module.exports = async (x) => {
	try {
		console.log(x.from + ' to ' + x.to + ' of total: ' + x.total)
		var cpRes = []
		var myblock = []
		var cpArr = {}
		var mycount = x.from--
		var hcnt = 0
		var ncnt = 0
		for (var z of x.objects) {
			if (z.subnet4) {
				//cpRes = []
				//myblock = []
				cpArr = {}
				var block = {}
				delete z.domain
				let mysup = z.subnet4 + '/' + z['mask-length4']
				block = new Netmask(mysup);
				z['block'] = await block
				console.log(z.block)
				//block.base = z.type
				//myblock = [{ 'base' : block.base, 'mask' : block.mask, 'first' : block.first, 'last' : block.last}]
				//console.log(myblock)
				//console.log(typeof block)
				//console.log(block)
				//console.log(z.name)
				//cpArr[block.base] = z
				cpArr[z.name] = z
				//myblock.push({ [z.name] : cpArr})
				myblock.push(cpArr)
			}
			//cpRes.push(myblock)
		}
		//cpRes.push(myblock[0])
		//cpRes.push(myblock)
		return await myblock
	} catch (err) {
		console.error(err)
	}
}



