
	const menus = {
		
	main:` 
		ctrl [command] <options>

	    [command] 	   Description
	    =================================================
	     version  ... show controller version
	     keystore ... etcd class method for key management
	     setkey   ... set key value in keystore
	     login    ... login to <CPapiHost>
	     logout   ... end current session login
	     cache    ... capture all uid as json object to keystore
	     object   ... show objects on cpapi store
	     try      ... example api call for check point objects
	
		use 'ctrl help [command]' for more info
	    =================================================
							`,
	
	keystore:`
		ctrl keystore --[option] <setting>

		 --keyhost ..... <hostname for etcd service>
		 --key     ..... <name of key>

		                          `,

	setkey:`
		ctrl setkey --[option] <setting>

		 --keyhost ..... hostname for etcd service
		 --key     ..... name of key
		 --value   ..... key value to set
		 --ttl     ..... time to live of key in seconds

		                          `,

	try:`
		ctrl try

		           ..... fixed config for test

		                           `,

	object:`
		ctrl object --[option] <setting>

		 --type       ..... specify type of object to show
		 --filter     ..... filter expression

		 ex. ctrl object --type host --filter "MyHost"

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


		
