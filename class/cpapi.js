"use strict";
//
//Class Constructor
// ES6 style
//
// this is your class method for constructing objects
// be sure to export it, as well as call the functions it needs
// to return your values to the object
// will call the script of the same name in fun/
//
// axios API constructor for Check Point
// class/cpapi
const myApi = require('../fun/api')


module.exports = class Cpapi {

	constructor(that) {
		this.method = 'post'
		this.headers = { 'X-chkp-sid': that.sid }
		this.baseURL = that.url + '/'
		this.data = {}
	}

	cntObj (from, to, total) {
		this.data.from = from
		this.data.to = to
		this.data.total = total
		return this
	}

	setCnt (offset, limit) {
		this.data.offset = offset
		this.data.limit = limit
		return this
	}

	setDetail (detail) {
		this.data['details-level'] = detail
		return this
	}

	setCmd (cmd) {
		this.url = cmd
		return this
	}

	addData (mydata) {
		this.data.push(mydata)
		return this
	}

	print () {
		console.dir(this)
		console.log('\n')

	}

	show () {
		console.log(Object.getOwnPropertyNames(this))
		console.log(Object.getOwnPropertyDescriptors(this))
		console.log(Object.getOwnPropertySymbols(this))
		//console.log(Object.keys(this) + ' : ' + Object.values(this))
		//console.log(Object.values(this))
	}

	async apiPost () {
		let apires = await myApi(this).catch((err) => { throw new Error(err)})
		return apires
	}

}

