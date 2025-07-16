<template>
	<tr :class="trClasses">
		<td>{{ track.artist }}</td>
		<td>{{ track.title }}</td>
		<td>{{ track.genre }}</td>
		<td>{{ duration }}</td>
		<td>
			<PlayButton v-if="(app.currentTrack !== track || !app.isPlaying) && !editMode" @click="selectTrack" />
			<PauseButton v-else-if="app.currentTrack === track && app.isPlaying && !editMode" @click="app.isPlaying = false" />
		</td>
		<td>
			<EditButton @click="$emit('onEdit', track)" />
		</td>
	</tr>
</template>

<script>
import PlayButton from '@/components/buttons/PlayButton.vue';
import PauseButton from '@/components/buttons/PauseButton.vue';
import EditButton from '@/components/buttons/EditButton.vue';
import SaveButton from '@/components/buttons/SaveButton.vue';
import GenreSelect from '@/components/GenreSelect.vue';
import useApp from '@/stores/app';

export default {
	components: { PlayButton, PauseButton, EditButton, SaveButton, GenreSelect },
	emits: ['onEdit'],
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
