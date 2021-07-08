/* Utilities */

export default ( func, delay ) => {

	let debounceTimer

	return function ( ...args ) {

		clearTimeout( debounceTimer )

		// Pass { abort: true } to cancel
		if ( args[0] && args[0].abort ) {

			return

		}

		const context = this
		debounceTimer = setTimeout( () => func.apply( context, args ), delay )

	}

}
