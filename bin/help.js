
	const menus = {
		
	main:` 
		ctrl [command] <options>

	    [command] 	   Description
	    =================================================
	     login    ... login to <CPapiHost>
	     logout   ... end current session login

	     cache    ... capture all uid as json object to keystore
	     object   ... show objects on cpapi store
	     try      ... example api call for check point objects
	
	     keystore ... etcd class method for key management
	     setkey   ... set key value in keystore

	     version  ... show controller version

		use 'ctrl help [command]' for more info
	    =================================================
							`,
	
	cache:`
		ctrl cache 

		           ..... saves local cache of CP objects
			   backed up to uid/ in your keystore as 
			   key=uid, value='json object properties'
		           This becomes the reference for the object
			   properties and information, allowing further
			   REST req to the CP api server to be liited to UID.
			   This will reduce load on the smartcenter, as well
			   as leverage local processing to update objects.

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
		ctrl object [command] --[option] <setting>

		 --type       ..... specify type of object to show
		 --filter     ..... filter expression
		 --tags       ..... add tag value (repeat for as many as needed)

		 [command]             ..... (optional) cpapi commands can be passed to the api
		 show-unused-objects   ..... find and tag unused objects

		 ex. ctrl object --type host --filter "MyHost" --tags "DMZ Host" --tags "My App"

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


		
