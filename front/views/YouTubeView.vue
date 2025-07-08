<template>
	<div @scroll="scrollToYouTube" ref="list" class="view-container">
		<div class="sticky top-0 z-10 bg-zinc-100 p-4">
			<div class="relative flex justify-center">
				<div class="flex gap-2">
					<input type="text" v-model="searchText" @keydown.enter="search" autocomplete="off" class="px-3 py-2" />
					<button :class="searchButtonClasses" @click="search">OK</button>
					<button v-if="!emptySearch" class="bg-red-500 text-white !w-30 shadow-lg rounded-lg shadow-red-500" @click="clear">Effacer</button>
				</div>

				<div v-if="scrollTop !== 0" class="absolute right-0 top-0">
					<TopButton @click="$refs.list.scrollTop = 0" />
				</div>
			</div>
		</div>
		<YouTubeResultsList :results="results" />
	</div>
</template>

<script setup>
import YouTubeResultsList from '@/components/YouTubeResultsList.vue';
import TopButton from '@/components/TopButton.vue';
</script>

<script>
import useApp from '@/stores/app';

export default {
	data() {
		return {
			app: useApp(),
			searchText: '',
			results: [],
			scrollTop: 0
		};
	},
	computed: {
		emptySearch() {
			return this.searchText.trim() === '';
		},
		searchButtonClasses() {
			return {
				'bg-white': this.emptySearch,
				'bg-teal-400': !this.emptySearch,
				'text-white': !this.emptySearch,
				'!w-12': true,
				'cursor-not-allowed': this.emptySearch,
				'rounded-lg': true,
				'shadow-xl': true,
				'shadow-teal-400': !this.emptySearch
			};
		}
	},
	methods: {
		search() {
			if (this.emptySearch) {
				return;
			}

			this.scrollToYouTube();

			fetch(import.meta.env.VITE_API + '/youtube?search=' + this.searchText)
				.then(res => res.json())
				.then(json => {
					this.results = json.response;
				});
		},
		clear() {
			this.searchText = '';
			this.results = [];
		},
		scrollToYouTube() {
			this.scrollTop = this.$refs.list.scrollTop;
			this.app.goTo('youtube');
		}
	},
	watch: {
		'app.youtubeSearch'() {
			this.searchText = this.app.youtubeSearch;
		}
	}
};
</script>
