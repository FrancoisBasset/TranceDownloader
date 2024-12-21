<template>
	<div>
		<h1>Modifier</h1>
		<select v-model="selectedWish" @change="onWishSelected()">
			<option v-for="w of wishes" :key="w" :value="w" :selected="w.id === selectedWish.id">{{ w.artist }} {{  w.track }}</option>
		</select>
		<br /><br />

		<label>Artiste : </label>
		<input type="text" v-model="artist" />
		<br /><br />

		<label>Track : </label>
		<input type="text" v-model="track" />
		<br /><br />
		
		<button @click="updateWish()">Modifier</button>
		<br /><br />
		<button @click="deleteWish()">Supprimer</button>
		<button @click="initWishes()">Init</button>
	</div>
</template>

<style scoped>
div {
	width: 50%;
	height: 45%;
	background-color: rgb(130, 96, 58);
}
</style>

<script>
export default {
	props: [
		'wishes',
		'wish'
	],
	emits: [
		'wishUpdated'
	],
	data() {
		return {
			selectedWish: null,
			artist: '',
			track: ''
		};
	},
	created() {
		this.selectedWish = this.wish;
		this.artist = this.wish.artist;
		this.track = this.wish.track;
	},
	methods: {
		onWishSelected() {
			this.artist = this.selectedWish.artist;
			this.track = this.selectedWish.track;
		},
		updateWish() {
			fetch(import.meta.env.VITE_API + '/trancedownloader/wishes/' + this.selectedWish.id, {
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					artist: this.artist,
					track: this.track
				})
			}).then(() => {
				localStorage.clear();
				this.$emit('wishUpdated');
			});
		},
		deleteWish() {
			fetch(import.meta.env.VITE_API + '/trancedownloader/wishes/' + this.selectedWish.id, {
				method: 'DELETE'
			}).then(() => {
				localStorage.clear();
				this.$emit('wishUpdated');
			});
		},
		initWishes() {
			fetch(import.meta.env.VITE_API + '/trancedownloader/wishes', {
				method: 'PATCH'
			}).then(() => {
				this.$emit('wishUpdated');
			});
		}
	}
};
</script>
