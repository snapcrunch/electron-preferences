function s4() {

	return Math.floor((1 + Math.random()) * 0x1_00_00)
		.toString(16)
		.slice(1);

}

export function newGuid() {

	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

}
