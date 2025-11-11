<template>
	<div class="mb-28 flex flex-col gap-24">
		<LibraryView id="library" class="w-10/12 mx-auto mt-[40px]" />
		<WishesView id="wishes" class="w-10/12 mx-auto mt-[40px]" />
		<YouTubeView id="youtube" class="w-10/12 mx-auto mt-[40px]" />
		<EveryNoiseView id="everynoise" class="w-10/12 mx-auto mt-[40px]" />

		<MusicPlayer />
	</div>
</template>

<script setup>
import { nextTick, onMounted } from 'vue';
import LibraryView from '@/views/LibraryView.vue';
import WishesView from '@/views/WishesView.vue';
import YouTubeView from '@/views/YouTubeView.vue';
import EveryNoiseView from '@/views/EveryNoiseView.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';
import useApp from '@/stores/app';

const app = useApp();

const views = ['library', 'wishes', 'youtube', 'everynoise'];

onMounted(() => {
	const observer = new IntersectionObserver(handleIntersection, {
		root: null,
		threshold: 0.5
	});

	nextTick(() => {
		views.forEach((view, index) => {
			const element = document.getElementById(view);
			if (element) {
				element.dataset.index = index;
				observer.observe(element);
			}
		});
	});
});

function handleIntersection(entries) {
	entries.forEach(entry => {
		if (!app.direct && entry.isIntersecting && entry.intersectionRatio >= 0.5) {
			const index = parseInt(entry.target.dataset.index);

			app.mode = views[index];
		}
	});
}
</script>
