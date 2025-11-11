<template>
	<div class="flex flex-col gap-2">
		<b>Ajouter une vidéo à partir d'un lien YouTube</b>

		<div>URL : <input type="text" v-model="wish.url" :class="inputClasses" /></div>

		<div v-if="videoFound" class="flex flex-col gap-2">
			<div>Artiste : <input type="text" v-model="wish.artist" /></div>
			<div>Titre : <input type="text" v-model="wish.title" /></div>
			<div>Genre : <GenreSelect @change="wish.genre = $event.target.value" :value="wish.genre" /></div>

			<iframe class="mx-auto shadow-xl rounded-lg" width="350" height="200" :src="youtubeLink" frameborder="0"></iframe>

			<div>
				<button @click="addWish" :class="addButtonClasses">Ajouter</button>
				<button @click="resetWish" class="red-button">Annuler</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import GenreSelect from '@/components/GenreSelect.vue';
import useApp from '@/stores/app';
import useWishes from '@/stores/wishes';
import { computed, reactive, ref, watch } from 'vue';

function getInitialWish() {
	return {
		artist: '',
		title: '',
		genre: '',
		url: ''
	};
}

const app = useApp();
const wishesStore = useWishes();

const videoFound = ref(null);
let wish = reactive(getInitialWish());

const youtubeLink = computed(() => {
	return 'https://www.youtube.com/embed/' + wish.url.split('v=')[1] + '?mute=0&autoplay=1';
});

const inputClasses = computed(() => {
	const notFound = wish.url !== '' && videoFound.value === false;

	return notFound ? ['video-not-found'] : [];
});

const formCompleted = computed(() => {
	return wish.url && wish.artist && wish.title && wish.genre;
});

const addButtonClasses = computed(() => {
	return {
		'green-button': formCompleted,
		'!cursor-not-allowed': !formCompleted
	};
});

function addWish() {
	if (!formCompleted.value) {
		return;
	}

	wishesStore.addWish(wish).then(() => {
		resetWish();
		app.goTo('youtube');
	});
}

function resetWish() {
	Object.assign(wish, getInitialWish());
}

watch(
	() => wish.url,
	() => {
		fetch('https://www.youtube.com/oembed?url=' + wish.url)
			.then(res => {
				if (res.status !== 200) {
					videoFound.value = false;
					return Promise.reject();
				}

				return res.json();
			})
			.then(json => {
				if (json.title.includes(' - ')) {
					wish.artist = json.title.split(' - ')[0];
					wish.title = json.title.split(' - ')[1];
				} else {
					wish.artist = json.author_name.replace(' - Topic', '');

					wish.title = json.title;
				}

				wish.title = wish.title.replace(' (Original Mix)', '');
				wish.title = wish.title.replace(' (Extended Mix)', '');

				videoFound.value = true;
			});
	}
);

watch(
	() => app.wishUrl,
	() => {
		wish.url = app.wishUrl;
	}
);
</script>
