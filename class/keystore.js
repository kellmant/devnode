"use strict";

const path = require('path');
const scriptname = path.basename(__filename);
const funcall = `../fun/${scriptname}`

const keystore = require(funcall)
const localkeys = process.env.ETCDCTL_ENDPOINTS 

//Constructor
// ES6 style
//

module.exports = class Keystore {

	constructor(keyhost) {
		this.keyhost = `http://${keyhost}:2379` || 'http://localhost:2379'
		this.options = {}
		this.result = []
	}

	print () {
		console.log(this)
		console.log('\n')
		
	}

	showRes () {
		console.log(Object.getOwnPropertyNames(this.result.node.nodes))
		console.log(Object.getOwnPropertyDescriptors(this.result.node.nodes))
		console.log(Object.getOwnPropertySymbols(this.result.node))
		console.log(Object.keys(this.result.node.nodes))
		console.log(Object.values(this.result.node.nodes))
		//console.log(Object.entries(this.result.node.nodes))
		//console.log(Object.keys(this.result.node.nodes))
		//console.log(Object.values(this.result.node.nodes))
		
	}

	getKeyhost () {
		return this.keyhost
	}

	setKeyhost (x) {
		if (!x) {
			const localkeys = process.env.ETCDCTL_ENDPOINTS 
			this.keyhost = localkeys
		} else {
			this.keyhost = `http://${x}:2379`
		}
		return this
	}

	setOpt (x) {
		if (x.recursive || !this.options.recursive)
		this.options.recursive = x.recursive || false
		return this
	}

	async getKey (x) {
		this.key = x 
		this.result = await keystore.read(this)
		return this
	}



}

/*
const myopts = {
	'recursive' : true
}

const myKeys = new Keystore()
async function main() {
	myKeys.print()
	myKeys.setKeyhost()
	myKeys.setOpt(myopts)
	await myKeys.getKey('apiadmin')
	await myKeys.showRes()
	//console.log(myopts)
}

main()
*/

