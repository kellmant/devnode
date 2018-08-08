const Rejson = require('../fun/try')
const Netmask = require('netmask').Netmask
const usedIn = require('../fun/whereused')

module.exports = async (x) => {
	try {
		console.log(x.from + ' to ' + x.to + ' of total: ' + x.total)
		var cpRes = []
		var myblock = []
		var cpArr = {}
		var mycount = x.from--
		var hcnt = 0
		var ncnt = 0
		if (x.hasOwnProperty('objects')) {
			//console.log(' has objects property to index')
			Object.entries(x.objects).forEach(([key, value]) => { 
				delete value.domain
				if (value.type === 'network') {
					let mysup = value.subnet4 + '/' + value['mask-length4']
					var block = new Netmask(mysup);
					//myblock = [{ 'base' : block.base, 'mask' : block.mask, 'first' : block.first, 'last' : block.last}]
					//let supnet = myblock[0] + '.' + myblock[1]
					console.log(myblock)
					console.log(typeof myblock)
					ncnt++
					//cpArr[value.type] = {[value.name] : [value]}
					cpArr[value.name] = value
					myblock.push({[block.base] : cpArr})
					//myblock.push(cpArr)
					//cpRes.push(myblock[cpArr])
					//cpRes.push(supnet[cpArr])
					//cpRes.push({[value.type][cpArr]})
					//return
				} else if (value.type === 'host') {
					let myhup = value['ipv4-address']
					let myhst = myhup.split('.');
					let suphst = myhst[0] + '.' + myhst[1]
					//suphst.name = value.name
					hcnt++
					cpArr[value.name] = value
					cpRes.push({ 'network' : [ cpArr ] })
					//cpArr[value['ipv4-address']] = value
					//cpArr[suphst][value.name] = value
					//return
				} else {
					//cpArr[value.type] = value
					console.log('obj look on type: ')
					console.log(value.type)
					//return
				}
				//cpRes.push(cpArr)
				//cpRes.push({[value.name] : [value]})
				//Rejson.rootkey(value.domain['domain-type'], { 'name' : value.domain.name})
				//Rejson.append(value.domain['domain-type'], mycount, value)	
				//console.log(value)
			})
			//Object.entries(x.objects).forEach(([key, value]) => cpRes.push({[value.uid] : value}))
			//Object.entries(x.objects).forEach(([key, value]) => { console.dir(key + ' ' + value.type + ' : ' + value.name + ' = ' + value)})
			//await Rejson.close()
			//console.dir(cpRes[0])
			console.log('my count is : ' + ncnt + ' networks and ' +  hcnt + ' hosts')
			cpRes.push(myblock[0])
			return cpRes[0]
			}
	} catch (err) {
		console.error(err)
	}
}



