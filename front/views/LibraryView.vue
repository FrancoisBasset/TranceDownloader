<template>
	<div>
		<TrackSelector id="track-selector" v-if="library.ready" />
		<DefinitionsForm id="definitions-form" v-if="library.track" :track="library.track" :key="library.track" />
		<MusicPlayer id="music-player" :key="library.url" />
	</div>
</template>

<style scoped>
#track-selector {
	position: absolute;
	left: 5%;
	top: 15%;
}

#definitions-form {
	position: absolute;
	left: 50%;
	top: 15%;
}

#music-player {
	position: absolute;
	width: 100%;
	bottom: 0;
}
</style>

<script setup>
import TrackSelector from '@/components/TrackSelector.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';
import DefinitionsForm from '@/components/DefinitionsForm.vue';
import useLibraryStore from '@/stores/Library';
</script>

<script>
export default {
	data() {
		return {
			library: useLibraryStore()
		};
	},
	created() {
		this.library.initTracks();
	}
};
</script>
