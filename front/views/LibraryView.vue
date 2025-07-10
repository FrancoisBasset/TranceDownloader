<template>
	<BlockView @scroll="scrollToLibrary" ref="list" class="py-8">
		<div class="sticky top-0 flex justify-end pr-7" v-if="scrollTop !== 0">
			<TopButton @click="$refs.list.scrollTop = 0" />
		</div>
		<TrackList />
	</BlockView>
</template>

<script setup>
import BlockView from '@/components/BlockView.vue';
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
