<template>
	<div @scroll="onScroll" ref="list" class="bg-zinc-100 !overflow-scroll rounded-lg h-[80vh] shadow-2xl">
		<div class="sticky top-3 flex justify-end pr-3" v-if="scrollTop !== 0">
			<TopButton @click="$refs.list.scrollTop = 0" />
		</div>
		<div class="p-6">
			<input type="text" v-model="searchText" autocomplete="off" class="shadow-xl rounded-lg bg-white" />
			<button :class="searchButtonClasses" @click="search">OK</button>
			<button v-if="!emptySearch" class="bg-red-500 text-white !w-30 shadow-lg rounded-lg shadow-red-500" @click="clear">Effacer</button>
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

			this.app.goTo('youtube');

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
		onScroll() {
			this.scrollTop = this.$refs.list.scrollTop;
		}
	}
};
</script>
