<template>
	<div class="flex flex-col text-start mx-auto">
		<img ref="image" :src="result.image" width="400" height="187" @click="transformToIframe" class="rounded-lg" />

		<text>{{ result.title }}</text>

		<div class="flex flex-row justify-between">
			<b class="py-1">{{ result.channel }}</b>
			<div class="flex flex-row justify-right">
				<b class="green-button">{{ result.views }}</b>
				<DownloadButton class="orange-button" @click="add" />
			</div>
		</div>
	</div>
</template>

<script>
import DownloadButton from '@/components/DownloadButton.vue';
import useApp from '@/stores/app';

export default {
	components: { DownloadButton },
	props: ['result'],
	setup: () => ({
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
