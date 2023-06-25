<template>
	<div>
		<TrackSelector id="track-selector" v-if="library.ready" />
		<MusicPlayer id="music-player" v-if="library.track" :url="'http://localhost:3000' + library.track.url" />
		<DefinitionsForm id="definitions-form" v-if="library.track" :track="library.track" :key="library.track" />
	</div>
</template>

<style scoped>
#track-selector {
	position: absolute;
	left: 5%;
	top: 15%;
}

#music-player {
	position: absolute;
	left: 50%;
	top: 15%;
}

#definitions-form {
	position: absolute;
	left: 50%;
	top: 45%;
}
</style>

<script>
import TrackSelector from '../components/TrackSelector.vue';
import MusicPlayer from '../components/MusicPlayer.vue';
import DefinitionsForm from '../components/DefinitionsForm.vue';
import useLibraryStore from '../stores/Library';

export default {
	components: {
		TrackSelector,
		MusicPlayer,
		DefinitionsForm
	},
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
