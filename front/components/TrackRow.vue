<template>
	<tr :class="trClasses">
		<td v-if="!editMode">{{ track.artist }}</td>
		<td v-else class="p-4"><input type="text" v-model="track.artist" class="rounded-lg shadow-xl" /></td>

		<td v-if="!editMode">{{ track.title }}</td>
		<td v-else class="p-4"><input type="text" v-model="track.title" class="rounded-lg shadow-xl" /></td>

		<td v-if="!editMode">{{ track.genre }}</td>
		<td v-else class="p-4"><GenreSelect @change="track.genre = $event.target.value" :value="track.genre" class="rounded-lg shadow-xl" /></td>

		<td>{{ duration }}</td>

		<td>
			<PlayButton v-if="(app.currentTrack !== track || !app.isPlaying) && !editMode" @click="selectTrack" />
			<PauseButton v-else-if="app.currentTrack === track && app.isPlaying && !editMode" @click="app.isPlaying = false" />
		</td>
		<td>
			<EditButton v-if="!editMode" @click="editMode = true" />
			<SaveButton v-if="editMode" @click="save" />
		</td>
	</tr>
</template>

<script>
import PlayButton from '@/components/PlayButton.vue';
import PauseButton from '@/components/PauseButton.vue';
import EditButton from '@/components/EditButton.vue';
import SaveButton from '@/components/SaveButton.vue';
import GenreSelect from '@/components/GenreSelect.vue';
import useApp from '@/stores/app';

export default {
	components: { PlayButton, PauseButton, EditButton, SaveButton, GenreSelect },
	props: ['track'],
	data: () => ({
		editMode: false,
		duration: '↻'
	}),
	setup: () => ({
		app: useApp()
	}),
	async created() {
		const audio = document.createElement('audio');
		audio.src = import.meta.env.VITE_AUDIO + '/' + this.track.url;

		while (isNaN(audio.duration)) {
			await new Promise(r => setTimeout(r, 10));
		}

		const duration = Math.round(audio.duration);

		let minutes = Math.floor(duration / 60);
		if (minutes < 10) {
			minutes = '0' + minutes;
		}
		let seconds = duration % 60;
		if (seconds < 10) {
			seconds = '0' + seconds;
		}

		this.duration = minutes + ':' + seconds;
	},
	computed: {
		trClasses() {
			if (this.editMode) {
				return ['rounded-lg', 'shadow-lg', 'shadow-orange-500'];
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
input[type='text'],
select {
	height: 20px;
	margin: 0;
	width: 150px;
}
</style>
