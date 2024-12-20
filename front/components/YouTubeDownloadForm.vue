<template>
	<div>
		<h1>Télécharger</h1>

		<label>Artiste : </label>
		<input type="text" v-model="artist" />
		<br><br>

		<label>Track : </label>
		<input type="text" v-model="track" />
		<br><br>

		<label>Genre : </label>
		<select v-model="genre">
			<option value="Acid Trance">Acid Trance</option>
			<option value="Balearic Trance">Balearic Trance</option>
			<option value="Classic Trance">Classic Trance</option>
			<option value="Dark Psytrance">Dark Psytrance</option>
			<option value="Dream Trance">Dream Trance</option>
			<option value="Euro Trance">Euro Trance</option>
			<option value="Forest Psytrance">Forest Psytrance</option>
			<option value="Full-on">Full-on</option>
			<option value="Futurepop">Futurepop</option>
			<option value="Hard Trance">Hard Trance</option>
			<option value="Hi-Tech">Hi-Tech</option>
			<option value="Morning Full-on">Morning Full-on</option>
			<option value="Night Full-on">Night Full-on</option>
			<option value="Nitzhonot">Nitzhonot</option>
			<option value="Progressive Psytrance">Progressive Psytrance</option>
			<option value="Progressive Trance">Progressive Trance</option>
			<option value="Psybient">Psybient</option>
			<option value="Psybreaks">Psybreaks</option>
			<option value="Psychill">Psychill</option>
			<option value="Psycore">Psycore</option>
			<option value="Psytrance">Psytrance</option>
			<option value="Suomisaundi">Suomisaundi</option>
			<option value="Tech Trance">Tech Trance</option>
			<option value="Trance">Trance</option>
			<option value="Trance Goa">Trance Goa</option>
			<option value="Uplifting Trance">Uplifting Trance</option>
			<option value="Vocal Trance">Vocal Trance</option>
			<option value="Zenonesque">Zenonesque</option>
		</select>
		<br><br>

		<button @click="download()">Télécharger</button>
	</div>
</template>

<style scoped>
div {
	width: 50%;
	height: 80%;
	background-color: rgb(125, 67, 86);
}
</style>

<script>
export default {
	props: [
		'result'
	],
	data() {
		return {
			artist: '',
			track: '',
			genre: ''
		};
	},
	mounted() {
		if (this.result) {
			if (this.result.title.includes('-')) {
				this.artist = this.result.title.split('-')[0].trim();
				this.track = this.result.title.split('-')[1].trim();
			} else {
				this.artist = this.result.title;
				this.track = this.result.title;
			}
		}
	},
	methods: {
		download() {
			console.log(this.artist, this.track, this.genre);

			fetch(import.meta.env.VITE_API + '/trancedownloader/youtube', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					url: this.result.url,
					artist: this.artist.trim(),
					track: this.track.trim(),
					genre: this.genre
				})
			});
		}
	}
};
</script>
