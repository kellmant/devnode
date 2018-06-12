
	const menus = {
		
	main:` 
		ctrl [command] <options>

	    [command] 	   Description
	    =================================================
	     version  ... show controller version
	     keystore ... example etcd class method
	     api      ... example api call with axios
	     login    ... login to <CPapiHost>
	     logout   ... end current session login
	
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

	login:`
		ctrl login <host>

		<host>     .... specify the configured api host

		Ex. ctrl login smc

		
							`,

	logout:`
		ctrl logout

		           .... end current api session

		Ex. ctrl logout

		
		`
	}

module.exports = (args) => {
	const subCmd = args._[0] === 'help'
	 ? args._[1]
	 : args._[0]


	console.log(menus[subCmd] || menus.main)

	}


		
