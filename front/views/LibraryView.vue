<template>
	<div class="view-container py-8" @scroll="scrollToLibrary" ref="list">
		<div class="sticky top-0 flex justify-end pr-7" v-if="scrollTop !== 0">
			<TopButton @click="$refs.list.scrollTop = 0" />
		</div>
		<TrackList @onEdit="track => editingTrack = track" />

		<TrackModal v-if="editingTrack" :key="editingTrack" :track="editingTrack" @onClose="editingTrack = null" />
	</div>
</template>

<script>
import TopButton from '@/components/buttons/TopButton.vue';
import TrackList from '@/components/TrackList.vue';
import TrackModal from '@/components/TrackModal.vue';
import useApp from '@/stores/app';

export default {
	components: { TrackList, TrackModal, TopButton },
	data: () => ({
		scrollTop: 0,
		editingTrack: null
	}),
	setup: () => ({
		app: useApp()
	}),
	mounted() {
		this.$refs.list.scrollTop = 0;
	},
	methods: {
		scrollToLibrary() {
			this.app.goTo('library');
			this.scrollTop = this.$refs.list.scrollTop;
		}
	}
};
</script>
