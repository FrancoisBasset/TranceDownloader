<template>
	<div>
		<b>Ajouter une vidéo</b>

		<div>Url : <input type="text" v-model="wish.url" /></div>
		<div v-if="wish.url">Artiste : <input type="text" v-model="wish.artist" /></div>
		<div v-if="wish.url">Titre : <input type="text" v-model="wish.title" /></div>
		<div v-if="wish.url">Genre : <GenreSelect @change="wish.genre = $event.target.value" :value="wish.genre" /></div>

		<iframe v-if="wish.url" class="mx-auto" width="350" height="200" :src="youtubeLink" frameborder="0"></iframe>

		<button @click="addWish()" class="bg-green-500 text-white">Ajouter</button>
	</div>
</template>

<script setup>
import GenreSelect from '@/components/GenreSelect.vue';
</script>

<script>
export default {
	data() {
		return {
			wish: {
				artist: '',
				title: '',
				genre: '',
				url: ''
			}
		};
	},
	computed: {
		youtubeLink() {
			return 'https://www.youtube.com/embed/' + this.wish.url.split('v=')[1];
		}
	},
	methods: {
		addWish() {
			fetch(import.meta.env.VITE_API + '/wishes', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.wish)
			}).then(response => {
				response.json().then(() => {
					this.wish = {
						artist: '',
						title: '',
						genre: '',
						url: ''
					};
					this.$emit('wishAdded');
				});
			});
		}
	},
	watch: {
		'wish.url'() {
			fetch('https://www.youtube.com/oembed?url=' + this.wish.url)
				.then(res => res.json())
				.then(json => {
					if (json.title.includes(' - ')) {
						this.wish.artist = json.title.split(' - ')[0];
						this.wish.title = json.title.split(' - ')[1];
					} else {
						this.wish.artist = json.author_name;
						this.wish.title = json.title;
					}
				});
		}
	}
};
</script>
