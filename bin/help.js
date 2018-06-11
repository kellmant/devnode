
	const menus = {
		
	main:` 
		ctrl [command] <options>

	    [command] 	   Description
	    =================================================
	     version  ... show controller version
	     keystore ... example etcd class method
	     api      ... example api call with axios
	
		use 'ctrl help [command]' for more info
	    =================================================
							`,
	
	keystore:`
		ctrl keystore --<option> <setting>

		 --keyhost ..... <hostname for etcd service>
		 --key      ..... <name of key>

		                          `,

	api:`
		ctrl api --<key> <value>

		 --key     ..... <value to assign>

		                           `,

	backup:`
		ctrl backup <options>

		all                 .... backup all objects
		hosts               .... backup host objects
		networks            .... backup network objects
		groups              .... backup group object references

		Ex. ctrl backup show-objects

		
							`
	}

module.exports = (args) => {
	const subCmd = args._[0] === 'help'
	 ? args._[1]
	 : args._[0]


	console.log(menus[subCmd] || menus.main)

	}


		
