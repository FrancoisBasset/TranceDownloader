<template>
	<BlockView @scroll="scrollToYouTube" ref="list">
		<div class="sticky top-0 z-10 bg-zinc-100 p-4">
			<div class="relative flex justify-center">
				<div class="flex gap-2">
					<input type="text" v-model="searchText" @keydown.enter="search" placeholder="Rechercher sur YouTube" autocomplete="off" class="px-3 py-2" />
					<button :class="searchButtonClasses" @click="search">Rechercher</button>
					<button v-if="!emptySearch" class="red-button" @click="clear">Effacer</button>
				</div>

				<div v-if="scrollTop !== 0" class="absolute right-0 top-0">
					<TopButton @click="$refs.list.scrollTop = 0" />
				</div>
			</div>
		</div>
		<YouTubeResultsList :results="results" />
	</BlockView>
</template>

<script>
import BlockView from '@/components/BlockView.vue';
import YouTubeResultsList from '@/components/YouTubeResultsList.vue';
import TopButton from '@/components/buttons/TopButton.vue';
import useApp from '@/stores/app';

export default {
	components: { BlockView, YouTubeResultsList, TopButton },
	data() {
		return {
			searchText: '',
			results: [],
			scrollTop: 0
		};
	},
	setup: () => ({
		app: useApp()
	}),
	computed: {
		emptySearch() {
			return this.searchText.trim() === '';
		},
		searchButtonClasses() {
			return {
				'green-button': !this.emptySearch,
				'!cursor-not-allowed': this.emptySearch
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
