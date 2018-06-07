"use strict";
// STOP - THIS IS A TEMPLATE
//
// copy this to the new filename for your class method
// put a copy of your main runtime for the class in bin/
// put a copy of the class constructor in class/
// put a copy of the functions your class needs in fun/

// main runtime
// recieve and process args from the callout
// this will show you return values of your args 
// for runtime
//
const path = require('path');
const scriptname = path.basename(__filename);
const classcall = `../class/${scriptname}`
const myClass = require(classcall)

// example runtime for your class method
//
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


//Class Constructor
// ES6 style
//
// this is your class method for constructing objects
// be sure to export it, as well as call the functions it needs 
// to return your values to the object
// will call the script of the same name in fun/
//
const path = require('path');
const scriptname = path.basename(__filename);
const funcall = `../fun/${scriptname}`
const myFunc = require(funcall)

class MyClass {

	constructor(x) {
		this.x = x
	}

	print () {
		console.log(this)
		console.log('\n')
		
	}

	showRes () {
		console.log(Object.getOwnPropertyNames(this.result))
		console.log(Object.getOwnPropertyDescriptors(this.result))
		console.log(Object.getOwnPropertySymbols(this.result))
		console.log(Object.keys(this.result))
		console.log(Object.values(this.result))
	}

	getX (x) {
		if (!x) {
			return this
		} else {
			return this.x
		}
	}

	setX (x) {
		if (!x) {
			return
		} else {
			this.x = x
		}
		return this
	}

}

