<template>
	<div>
		<b class="text-lg">YouTube</b>
		<br /><br />
		<div class="bg-sky-100 !overflow-scroll rounded-lg h-[80vh]">
			<div>
				<input type="text" v-model="searchText" autocomplete="off" />
				<button class="bg-green-500 text-white" @click="search">OK</button>
			</div>
			<YouTubeResultsList :results="results" />
		</div>
	</div>
</template>

<script setup>
import YouTubeResultsList from '@/components/YouTubeResultsList.vue';
</script>

<script>
import useApp from '@/stores/app';

export default {
	data() {
		return {
			app: useApp(),
			searchText: '',
			results: []
		};
	},
	methods: {
		search() {
			this.app.goTo('youtube');

			fetch(import.meta.env.VITE_API + '/youtube?search=' + this.searchText)
				.then(res => res.json())
				.then(json => {
					this.results = json.response;
				});
		}
	}
};
</script>
