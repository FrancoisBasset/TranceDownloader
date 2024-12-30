<template>
	<div>
		<b>Ajouter une vidéo</b>

		<div>Url : <input type="text" v-model="wish.url" :class="inputClasses" /></div>

		<div v-if="videoFound">
			<div>Artiste : <input type="text" v-model="wish.artist" /></div>
			<div>Titre : <input type="text" v-model="wish.title" /></div>
			<div>Genre : <GenreSelect @change="wish.genre = $event.target.value" :value="wish.genre" /></div>

			<iframe class="mx-auto" width="350" height="200" :src="youtubeLink" frameborder="0"></iframe>

			<button @click="addWish()" :class="addButtonClasses">Ajouter</button>
			<button @click="wish = getInitialWish()" class="bg-red-500 text-white w-20">Annuler</button>
		</div>
	</div>
</template>

<script setup>
import GenreSelect from '@/components/GenreSelect.vue';
</script>

<script>
import useApp from '@/stores/app';

function getInitialWish() {
	return {
		artist: '',
		title: '',
		genre: '',
		url: ''
	};
}

export default {
	data() {
		return {
			app: useApp(),
			videoFound: null,
			wish: getInitialWish()
		};
	},
	computed: {
		youtubeLink() {
			return 'https://www.youtube.com/embed/' + this.wish.url.split('v=')[1];
		},
		inputClasses() {
			if (this.wish.url === '') {
				return [];
			}

			if (this.videoFound === false) {
				return ['!border-[1px]', '!border-solid', '!border-red-500'];
			}

			return [];
		},
		formCompleted() {
			return this.wish.url && this.wish.artist && this.wish.title && this.wish.genre;
		},
		addButtonClasses() {
			return {
				'bg-green-500': this.formCompleted,
				'bg-gray-500': !this.formCompleted,
				'text-white': true,
				'w-20': true,
				'cursor-not-allowed': !this.formCompleted
			};
		}
	},
	methods: {
		addWish() {
			if (!this.formCompleted) {
				return;
			}

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
				.then(res => {
					if (res.status !== 200) {
						this.videoFound = false;
						return Promise.reject();
					}

					return res.json();
				})
				.then(json => {
					if (json.title.includes(' - ')) {
						this.wish.artist = json.title.split(' - ')[0];
						this.wish.title = json.title.split(' - ')[1];
					} else {
						this.wish.artist = json.author_name.replace(' - Topic', '');

						this.wish.title = json.title;
					}

					this.wish.title = this.wish.title.replace(' (Original Mix)', '');
					this.wish.title = this.wish.title.replace(' (Extended Mix)', '');

					this.videoFound = true;
				});
		},
		'app.wishUrl'() {
			this.wish.url = this.app.wishUrl;
		}
	}
};
</script>
