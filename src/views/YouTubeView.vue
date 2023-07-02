<template>
	<div>
		<div id="searchDiv">
			<input type="text" v-model="searchText" @keydown="search($event)" id="searchInput" autocomplete="off" />
		</div>
		<VideoResultsTable id="resultsTable" :results="results" @resultSelected="result => this.resultSelected = result" />
		<YouTubeDownloadForm id="downloadForm" :result="resultSelected" :key="resultSelected" />
	</div>
</template>

<style scoped>
#searchDiv {
	position: absolute;
	width: 100%;
	height: 10%;
	top: 10%;

	background-color: rgb(116, 59, 112);
	text-align: center;
}

#searchInput {
	width: 700px;
	height: 50px;
	font-size: 20px;
	margin-top: 20px;
}

#resultsTable {
	position: absolute;
	top: 20%;
}

#downloadForm {
	position: absolute;
	top: 20%;
	right: 0;
	text-align: center;
}
</style>

<script>
import VideoResultsTable from '../components/VideoResultsTable.vue';
import YouTubeDownloadForm from '../components/YouTubeDownloadForm.vue';

export default {
	components: {
		VideoResultsTable,
		YouTubeDownloadForm
	},
	data() {
		return {
			searchText: '',
			results: [],
			resultSelected: null
		};
	},
	mounted() {
		if (localStorage.getItem('search')) {
			this.searchText = localStorage.getItem('search');
			localStorage.removeItem('search');
			this.search();
		}
	},
	methods: {
		search(e) {
			if (!e || e.key === 'Enter') {
				fetch(import.meta.env.VITE_API + '/trancedownloader/youtube?search=' + this.searchText).then(response => {
					response.json().then(json => {
						this.results = json.response;
					});
				});
			}
		}
	}
};
</script>
