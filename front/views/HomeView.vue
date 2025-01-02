<template>
	<div class="mb-28 flex flex-col gap-24">
		<LibraryView id="library" class="w-10/12 mx-auto mt-[40px]" />
		<WishesView id="wishes" class="w-10/12 mx-auto mt-[40px]" />
		<YouTubeView id="youtube" class="w-10/12 mx-auto mt-[40px]" />

		<MusicPlayer />
	</div>
</template>

<script setup>
import LibraryView from '@/views/LibraryView.vue';
import WishesView from '@/views/WishesView.vue';
import YouTubeView from '@/views/YouTubeView.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';
</script>

<script>
import useApp from '@/stores/app';

export default {
	data: () => ({
		app: useApp(),
		views: ['library', 'wishes', 'youtube']
	}),
	mounted() {
		const observer = new IntersectionObserver(this.handleIntersection, {
			root: null,
			threshold: 0.5
		});

		this.$nextTick(() => {
			this.views.forEach((view, index) => {
				const element = document.getElementById(view);
				if (element) {
					element.dataset.index = index;
					observer.observe(element);
				}
			});
		});
	},
	methods: {
		handleIntersection(entries) {
			entries.forEach(entry => {
				if (!this.app.direct && entry.isIntersecting && entry.intersectionRatio >= 0.5) {
					const index = parseInt(entry.target.dataset.index);
					
					this.app.mode = this.views[index];
				}
			});
		}
	}
}
</script>
