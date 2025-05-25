<template>
	<div @scroll="scrollToLibrary" ref="list" class="bg-zinc-100 !overflow-scroll rounded-lg h-[80vh] shadow-2xl py-8">
		<div class="sticky top-0 flex justify-end pr-7" v-if="scrollTop !== 0">
			<TopButton @click="$refs.list.scrollTop = 0" />
		</div>
		<TrackList />
	</div>
</template>

<script setup>
import TrackList from '@/components/TrackList.vue';
import TopButton from '@/components/TopButton.vue';
</script>

<script>
import useApp from '@/stores/app';
export default {
	data: () => ({
		app: useApp(),
		scrollTop: 0
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
