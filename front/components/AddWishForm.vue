<template>
	<div>
		<h1>Ajouter</h1>

		<label>Artiste : </label>
		<input type="text" v-model="artist" />
		<br /><br />

		<label>Track : </label>
		<input type="text" v-model="track" />
		<br /><br />

		<button @click="addWish()">Ajouter</button>
	</div>
</template>

<style scoped>
div {
	width: 50%;
	height: 45%;
	background-color: rgb(63, 104, 73);
}
</style>

<script>
export default {
	emits: [
		'wishAdded'
	],
	data() {
		return {
			artist: '',
			track: ''
		};
	},
	methods: {
		addWish() {
			fetch(import.meta.env.VITE_API + '/trancedownloader/wishes', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					artist: this.artist,
					track: this.track
				})
			}).then(response => {
				response.json().then(() => {
					this.artist = '';
					this.track = '';

					localStorage.clear();
					this.$emit('wishAdded');
				});
			});
		}
	}
};
</script>
