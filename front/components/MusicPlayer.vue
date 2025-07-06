<template>
	<div v-if="app.currentTrack" class="fixed bottom-0 w-full text-start bg-white">
		<text class="p-2">{{ app.currentTrack.artist }} - {{ app.currentTrack.title }}</text>
		<audio ref="audio" class="w-full" :src="currentUrl" controls autoplay @play="app.isPlaying = true" @pause="app.isPlaying = false" />
	</div>
</template>

<script>
import useApp from '@/stores/app';

export default {
	data: () => ({
		app: useApp()
	}),
	computed: {
		currentUrl() {
			return import.meta.env.VITE_AUDIO + this.app.currentTrack.url;
		}
	},
	watch: {
		'app.isPlaying'() {
			if (!this.$refs.audio) {
				return;
			}

			if (this.app.isPlaying) {
				this.$refs.audio.play();
			} else {
				this.$refs.audio.pause();
			}
		}
	}
};
</script>
