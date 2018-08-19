"use strict";

const path = require('path');
const scriptname = path.basename(__filename);
//const classcall = `../class/${scriptname}`
//const Rejson = require('../fun/rejson')
const doWrite = require('../fun/writefile')

//const diff = require('hyperdiff')
//const diff = require('comparison-object-diff')
//const diff = require('just-diff')
//const diff = require('deep-diff').diff;
//
const groupBy = require('json-groupby')

const diff = require('diff-arrays-of-objects');
const removeDuplicates = require('removeduplicates');
const ddiff = require("deep-object-diff").diff;
const addedDiff = require("deep-object-diff").addedDiff;
const deletedDiff = require("deep-object-diff").deletedDiff;
const detailedDiff = require("deep-object-diff").detailedDiff;
const updatedDiff = require("deep-object-diff").updatedDiff;
const sortobject = require('deep-sort-object');
const sort = require('sort-any');
const objTry = require('../playground/try.json')
const objDmp = require('../playground/dump.json')
//const Obja = require('../playground/store/rulebase01.json')
const objPolicy = require('../playground/policy.json')


module.exports = async () => {
	try {
		const mysorted = sortobject(objTry)
		await doWrite('sorted', mysorted)
		const mygrp = groupBy(objDmp.rulebase, ['rulebase.type'])
		await doWrite('group', mygrp)
		//const mydedup = removeDuplicates(objTry)
		//await doWrite('dedup', mydedup)
		const mydiff = diff(objPolicy, objTry)
		//console.dir(await mydiff)
		console.log(await typeof mydiff)
		await doWrite('policy-diff', mydiff)
		return mysorted
	} catch (err) {
		console.log(err.message)
		throw new Error(err)
	}
}


