<template>
	<div class="view-container py-8" @scroll="scrollToLibrary" ref="list">
		<div class="sticky top-0 flex justify-end pr-7" v-if="scrollTop !== 0">
			<TopButton @click="list.scrollTop = 0" />
		</div>
		<TrackList @onEdit="track => (editingTrack = track)" />

		<TrackModal v-if="editingTrack" :key="editingTrack" :track="editingTrack" @onClose="editingTrack = null" />
	</div>
</template>

<script setup>
import { ref, onMounted, useTemplateRef } from 'vue';
import TopButton from '@/components/buttons/TopButton.vue';
import TrackList from '@/components/TrackList.vue';
import TrackModal from '@/components/TrackModal.vue';
import useApp from '@/stores/app';

const app = useApp();

const list = useTemplateRef('list');
const scrollTop = ref(0);
const editingTrack = ref(null);

onMounted(() => {
	list.value.scrollTop = 0;
});

function scrollToLibrary() {
	app.goTo('library');
	scrollTop.value = list.value.scrollTop;
}
</script>
