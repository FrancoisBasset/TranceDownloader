<template>
	<div v-if="app.currentTrack" class="fixed bottom-0 w-full text-start bg-teal-100">
		<div class="flex flex-row justify-between">
			<div class="flex flex-row">
				<img v-if="app.currentTrack.cover" :src="'data:image/jpeg;charset=utf-8;base64,' + app.currentTrack.cover" class="h-10" />
				<text class="p-2">{{ app.currentTrack.artist }} - {{ app.currentTrack.title }}</text>
			</div>
			<StopAudioButton @click="app.currentTrack = null" />
		</div>
		<audio ref="audio" class="w-full" :src="currentUrl" controls autoplay @play="app.isPlaying = true" @pause="app.isPlaying = false" />
	</div>
</template>

<script>
import StopAudioButton from '@/components/buttons/StopAudioButton.vue';
import useApp from '@/stores/app';

export default {
	components: { StopAudioButton },
	setup: () => ({
		app: useApp()
	}),
	computed: {
		currentUrl() {
			if (this.app.currentTrack.url.includes('http')) {
				return this.app.currentTrack.url;
			}
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
