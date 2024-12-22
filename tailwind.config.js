import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./front/**/*.vue'
	],
	theme: {
		colors: {
			...colors
		}
	}
};
