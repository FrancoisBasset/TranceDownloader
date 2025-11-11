<template>
	<div class="view-container pb-8" @scroll="scrollToYouTube" ref="list">
		<div class="sticky top-0 z-10 bg-zinc-100 p-4">
			<div class="relative flex justify-center">
				<div class="flex gap-2">
					<input type="text" v-model="searchText" @keydown.enter="search" placeholder="Rechercher sur YouTube" autocomplete="off" class="px-3 py-2" />
					<button :class="searchButtonClasses" @click="search">Rechercher</button>
					<button v-if="!emptySearch" class="red-button" @click="clear">Effacer</button>
				</div>

				<div v-if="scrollTop !== 0" class="absolute right-0 top-0">
					<TopButton @click="list.scrollTop = 0" />
				</div>
			</div>
		</div>
		<YouTubeResultsList :results="results" />
	</div>
</template>

<script setup>
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue';
import YouTubeResultsList from '@/components/YouTubeResultsList.vue';
import TopButton from '@/components/buttons/TopButton.vue';
import useApp from '@/stores/app';

const app = useApp();

const list = useTemplateRef('list');

const searchText = ref('');
const results = ref([]);
const scrollTop = ref(0);

const emptySearch = computed(() => {
	return searchText.value.trim() === '';
});

const searchButtonClasses = computed(() => {
	return {
		'green-button': !emptySearch.value,
		'!cursor-not-allowed': emptySearch.value
	};
});

onMounted(() => {
	list.value.scrollTop = 0;
});

function search() {
	if (emptySearch.value) {
		return;
	}

	scrollToYouTube();

	fetch(import.meta.env.VITE_API + '/youtube?search=' + searchText.value)
		.then(res => res.json())
		.then(json => {
			results.value = json;
		});
}

function clear() {
	searchText.value = '';
	results.value = [];
	scrollTop.value = 0;
}

function scrollToYouTube() {
	app.goTo('youtube');
	scrollTop.value = list.value.scrollTop;
}

watch(
	() => app.youtubeSearch,
	() => {
		searchText.value = app.youtubeSearch;
	}
);
</script>
