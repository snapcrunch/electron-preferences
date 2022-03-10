/*
	Debounce utility function

	Debounce a function by wrapping it in a debounce and providing a delay in ms:

	const debouncedFunction = debounce((arg1) => {
		// do whatever
	}, 500)

	myRapidlyUpdatingThing.onChange(() => {
		debouncedFunction()
	})

	call debouncedFunction({abort: true}) before the delay to cancel the function from being called
*/

const debounce = (func, delay) => {

	let debounceTimer;

	return function (...args) {

		clearTimeout(debounceTimer);

		// Pass { abort: true } to cancel
		if (args[0] && args[0].abort) {

			return;

		}

		const _this = this;
		debounceTimer = setTimeout(() => func.apply(_this, args), delay);

	};

};

export default debounce;
