<template>
	<tr :class="trClasses">
		<td>
			<div v-if="track.cover" class="tooltip relative cursor-pointer">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24">
					<path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
				</svg>

				<div class="tip">
					<img :src="'data:image/jpeg;charset=utf-8;base64,' + track.cover" />
				</div>
			</div>
		</td>
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
import GenreSelect from '@/components/GenreSelect.vue';
import useApp from '@/stores/app';

export default {
	components: { PlayButton, PauseButton, EditButton, GenreSelect },
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

.tooltip:hover .tip {
	display: block;
}

.tip {
	display: none;
	position: absolute;
	top: 120%;
	transform: translateX(20%);
	width: 100px;
	z-index: 100;
}
</style>
