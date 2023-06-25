<template>
	<div>
		<label style="font-size: 20px;">Définitions :</label>
		<br>
		
		<select @change="onDefinitionSelect($event.target.value)" size="20">
			<option v-for="definition of definitions" :key="definition" :style="{color: Object.keys(library.track).includes(definition) ? 'red' : 'white'}">{{ definition }}</option>
		</select>
		<br><br>
		
		<input type="text" v-model="value" />
		<br><br>
		
		<button @click="update()">Enregistrer</button>
		<br>
		
		<button @click="removeTags()">Supprimer tags</button>
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
	height: 40%;
	color: white;
	background-color: rgb(90, 90, 90);
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
				this.library.initTracks();
			});
		},
		removeTags() {
			/*fetch('http://localhost:3000/trancedownloader/library/', {
				method: 'DELETE',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					url: this.mutableTrack.url
				})
			}).then(() => {*/
			this.library.track = {
				url: this.library.track.url
			};
			//});
		}
	}
};
</script>
