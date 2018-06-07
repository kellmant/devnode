"use strict";

//Constructor
// ES6 style
//

class Obj {

	constructor(x) {
		this.uid = x.uid || 'not defined'
		this.name = x.name || 'no name'
		this.type = x.type || 'not my type'
	}

	getType () {
		return this.type
	}

	getName () {
		return this.name
	}

	getUid () {
		return this.uid
	}

}

const y = {
	'uid' : '1234',
	//'name' : "kellman meghu",
	'type' : 'network'
}

const newHost = new Obj(y)

console.log(newHost)
console.log(newHost.getType())
console.log(newHost.getName())
console.log(newHost.getUid())

//module.exports = Cpobj
