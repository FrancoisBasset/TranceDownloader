<template>
	<div>
		<label style="font-size: 20px;">Définitions :</label>
		<br>
		
		<select @change="onDefinitionSelect($event.target.value)" size="3">
			<option v-for="definition of definitions" :key="definition" :style="{color: Object.keys(library.track).includes(definition) ? 'green' : 'white'}">
				<b>{{ definition }}</b>
			</option>
		</select>
		<br><br>
		
		<input type="text" v-model="value" />
		<br><br>
		
		<button @click="update()">Enregistrer</button>
		<br>
	</div>
</template>

<style scoped>
div {
	width: 50%;
	height: 55%;
	background-color: rgb(55, 101, 89);
	text-align: center;
}

select {
	width: 40%;
	height: 80px;
	color: white;
	
	border: none;
	outline: none;
	padding: 10px;
}

button {
	width: 150px;
	height: 50px;
	font-size: 20px;
	cursor: pointer;
}
</style>

<script>
import definitions from '../definitions';
import useLibraryStore from '../stores/Library'

export default {
	props: [
		'track'
	],
	data() {
		return {
			library: useLibraryStore(),
			definitions: definitions,
			definition: '',
			value: ''
		};
	},
	methods: {
		onDefinitionSelect(definition) {
			this.definition = definition;
			this.value = this.library.track[definition];
		},
		update() {
			fetch('http://localhost:3000/trancedownloader/library', {
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					url: this.library.track.url,
					tag: this.definition,
					value: this.value
				})
			}).then(() => {
				this.library.track[this.definition] = this.value;
				if (this.library.artist) {
					this.library.artist = this.library.track.artist;
				}
				this.library.initTracks();

				if (this.library.mode === 'artist' && this.library.artist) {
					this.library.headLabel = 'Artistes > ' + this.library.artist;
				} else if (this.library.mode === 'genre' && this.library.genre && this.library.artist) {
					this.library.headLabel = 'Genres > ' + this.library.genre + ' > ' + this.library.artist;
				} else if (this.library.mode === 'genre' && this.library.genre) {
					this.library.headLabel = 'Genres > ' + this.library.genre;
				}
			});
		}
	}
};
</script>
