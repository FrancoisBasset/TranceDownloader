<template>
	<div>
		<b>Bibliothèque</b>
		<br /><br />
		<div class="bg-gray-100 !overflow-scroll rounded-lg h-[80vh]">
			<TrackList  />
		</div>
		<!--<DefinitionsForm id="definitions-form" v-if="library.track" :track="library.track" :key="library.track" />-->
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
import TrackList from '@/components/TrackList.vue';
//import DefinitionsForm from '@/components/DefinitionsForm.vue';
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
