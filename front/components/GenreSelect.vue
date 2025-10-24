<template>
	<select>
		<option v-for="genre in genres" :value="genre">{{ genre }}</option>
	</select>
</template>

<script setup>
const genres = [
	'Acid Trance',
	'Balearic Trance',
	'Classic Trance',
	'Dark Psytrance',
	'Dream Trance',
	'Euro Trance',
	'Forest Psytrance',
	'Full-on',
	'Futurepop',
	'Hardstyle',
	'Hard Trance',
	'Hi-Tech',
	'Morning Full-on',
	'Night Full-on',
	'Nitzhonot',
	'Progressive Psytrance',
	'Progressive Trance',
	'Psybient',
	'Psybreaks',
	'Psychill',
	'Psycore',
	'Psytrance',
	'Suomisaundi',
	'Tech Trance',
	'Trance',
	'Trance Goa',
	'Uplifting Trance',
	'Vocal Trance',
	'Zenonesque',
	'Other'
];
</script>
