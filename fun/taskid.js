"use strict";

const path = require('path');
const scriptname = path.basename(__filename);
//const classcall = `../class/${scriptname}`
//const Rejson = require('../fun/rejson')
const doWrite = require('../fun/writefile')

const mytask = require('../playground/task.json')
const taskid = mytask[0]['task-id']


module.exports = async () => {
	try {
		var myarr = []
		var myvalue = {}
		//console.dir(await mytask)
		//console.log(await taskid)
		//await doWrite(args._[1], myarr)
		return taskid
	} catch (err) {
		console.log(err.message)
		throw new Error(err)
	}
}


