<template>
	<div>
		<b class="text-lg">Bibliothèque</b>
		<br /><br />
		<div @scroll="onScroll" ref="list" class="bg-sky-100 !overflow-scroll rounded-lg h-[80vh]">
			<div class="sticky top-3 flex justify-end pr-3" v-if="scrollTop !== 0">
				<TopButton @click="$refs.list.scrollTop = 0" />
			</div>
			<TrackList />
		</div>
	</div>
</template>

<script setup>
import TrackList from '@/components/TrackList.vue';
import TopButton from '@/components/TopButton.vue';
</script>

<script>
export default {
	data: () => ({
		scrollTop: 0
	}),
	mounted() {
		this.$refs.list.scrollTop = 0;
	},
	methods: {
		onScroll() {
			this.scrollTop = this.$refs.list.scrollTop;
		}
	}
}
</script>
