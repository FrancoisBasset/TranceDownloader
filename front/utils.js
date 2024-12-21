function getRandomColorNumber() {
	return Math.floor((crypto.getRandomValues(new Uint32Array(1)) / 10000000000) * 105) + 80;
}

export function getRandomColor() {
	const r = getRandomColorNumber();
	const g = getRandomColorNumber();
	const b = getRandomColorNumber();

	return `rgb(${r}, ${g}, ${b})`;
}
