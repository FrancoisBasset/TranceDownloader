<template>
	<div class="flex flex-col text-start mx-auto">
		<img ref="image" :src="result.image" width="400" height="187" @click="transformToIframe" class="rounded-lg" />

		<text>{{ result.title }}</text>

		<div class="flex flex-row justify-between">
			<b class="py-1">{{ result.channel }}</b>
			<div class="flex flex-row justify-right">
				<b class="bg-teal-400 shadow-xl shadow-teal-400 text-white rounded-lg w-fit p-1">{{ result.views }}</b>
				<DownloadButton class="bg-orange-400 shadow-xl shadow-orange-400 fill-white rounded-lg w-fit p-1" @click="add" />
			</div>
		</div>
	</div>
</template>

<script setup>
import DownloadButton from '@/components/DownloadButton.vue';
</script>

<script>
import useApp from '@/stores/app';

export default {
	props: ['result'],
	data: () => ({
		app: useApp()
	}),
	methods: {
		transformToIframe() {
			this.$refs.image.outerHTML = `<iframe src="https://www.youtube.com/embed/${this.result.url.split('v=')[1]}" width="355" height="266" />`;
		},
		add() {
			this.app.goTo('wishes');
			this.app.wishUrl = this.result.url;
		}
	}
};
</script>
