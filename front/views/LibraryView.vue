<template>
	<BlockView @scroll="scrollToLibrary" ref="list" class="py-8">
		<div class="sticky top-0 flex justify-end pr-7" v-if="scrollTop !== 0">
			<TopButton @click="$refs.list.scrollTop = 0" />
		</div>
		<TrackList />
	</BlockView>
</template>

<script>
import BlockView from '@/components/BlockView.vue';
import TrackList from '@/components/TrackList.vue';
import TopButton from '@/components/TopButton.vue';
import useApp from '@/stores/app';

export default {
	components: { BlockView, TrackList, TopButton },
	data: () => ({
		scrollTop: 0
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
