<template>
	<div class="flex flex-col gap-2">
		<b>Ajouter une vidéo</b>

		<div>Url : <input type="text" v-model="wish.url" :class="inputClasses" /></div>

		<div v-if="videoFound" class="flex flex-col gap-2">
			<div>Artiste : <input type="text" v-model="wish.artist" /></div>
			<div>Titre : <input type="text" v-model="wish.title" /></div>
			<div>Genre : <GenreSelect @change="wish.genre = $event.target.value" :value="wish.genre" /></div>

			<iframe class="mx-auto shadow-xl rounded-lg" width="350" height="200" :src="youtubeLink" frameborder="0"></iframe>

			<div>
				<button @click="addWish" :class="addButtonClasses">Ajouter</button>
				<button @click="cancelWish" class="red-button">Annuler</button>
			</div>
		</div>
	</div>
</template>

<script>
import GenreSelect from '@/components/GenreSelect.vue';
import useApp from '@/stores/app';
import useWishes from '@/stores/wishes';

function getInitialWish() {
	return {
		artist: '',
		title: '',
		genre: '',
		url: ''
	};
}

export default {
	components: { GenreSelect },
	data() {
		return {
			videoFound: null,
			wish: getInitialWish()
		};
	},
	setup: () => ({
		app: useApp(),
		wishesStore: useWishes()
	}),
	computed: {
		youtubeLink() {
			return 'https://www.youtube.com/embed/' + this.wish.url.split('v=')[1] + '?mute=0&autoplay=1';
		},
		inputClasses() {
			if (this.wish.url === '') {
				return [];
			}

			if (this.videoFound === false) {
				return ['video-not-found'];
			}

			return [];
		},
		formCompleted() {
			return this.wish.url && this.wish.artist && this.wish.title && this.wish.genre;
		},
		addButtonClasses() {
			return {
				'green-button': this.formCompleted,
				'cursor-not-allowed': !this.formCompleted
			};
		}
	},
	methods: {
		addWish() {
			if (!this.formCompleted) {
				return;
			}

			this.wishesStore.addWish(this.wish).then(() => {
				this.wish = getInitialWish();
				this.app.goTo('youtube');
			});
		},
		cancelWish() {
			this.wish = getInitialWish();
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
