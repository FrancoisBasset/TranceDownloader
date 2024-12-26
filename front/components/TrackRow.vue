<template>
	<tr :class="trClasses">
		<td v-if="!editMode">{{ track.artist }}</td>
		<td v-else><input type="text" v-model="track.artist" /></td>

		<td v-if="!editMode">{{ track.title }}</td>
		<td v-else><input type="text" v-model="track.title" /></td>

		<td v-if="!editMode">{{ track.genre }}</td>
		<td v-else><GenreSelect @change="track.genre = $event.target.value" :value="track.genre" /></td>
		<td>
			<PlayButton v-if="app.currentTrack !== track || !app.isPlaying" @click="selectTrack" />
			<PauseButton v-else-if="app.currentTrack === track && app.isPlaying" @click="app.isPlaying = false" />
		</td>
		<td>
			<EditButton v-if="!editMode" @click="editMode = true" />
			<SaveButton v-if="editMode" @click="save" />
		</td>
	</tr>
</template>

<script setup>
import PlayButton from '@/components/PlayButton.vue';
import PauseButton from '@/components/PauseButton.vue';
import EditButton from '@/components/EditButton.vue';
import SaveButton from '@/components/SaveButton.vue';
import GenreSelect from '@/components/GenreSelect.vue';
</script>

<script>
import useApp from '@/stores/app';

export default {
	props: ['track'],
	data: () => ({
		app: useApp(),
		editMode: false
	}),
	computed: {
		trClasses() {
			if (this.editMode) {
				return ['bg-red-500'];
			}

			if (this.app.currentTrack === this.track) {
				return ['text-white', 'bg-green-500'];
			}

			return ['hover:bg-orange-100'];
		}
	},
	methods: {
		selectTrack() {
			this.app.currentTrack = this.track;
			this.app.isPlaying = true;
		},
		save() {
			fetch(import.meta.env.VITE_API + '/library', {
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					url: this.track.url,
					artist: this.track.artist,
					title: this.track.title,
					genre: this.track.genre
				})
			}).then(() => {
				this.editMode = false;
			});
		}
	}
};
</script>

<style scoped>
input[type="text"], select {
	height: 20px;
	margin: 0;
	width: 150px;
}
</style>