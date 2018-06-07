
	const menus = {
		
	main:` 
		ctrl [command] <options>

		help ............... show controller help
		version ............ show controller version
		keystore .............. example etcd class method
	

	=================================================
							`,
	
	keystore:`
		ctrl keystore --<option> <setting>

		 --keystore ..... <hostname for etcd service>
		 --key      ..... <name of key>

		                          `,

	show:`
		ctrl show <object type>

		hosts .... host objects
		networks .... network objects
		groups .... group objects
		unused-objects .... unused objects
		all <async> .... get all the main object types (add 'async' for concurrent gets)
		objects .... all objects in the domain
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


		
