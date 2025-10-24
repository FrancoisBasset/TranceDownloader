<template>
	<Modal>
		<input type="text" v-model="track.artist" />
		<input type="text" v-model="track.title" />
		<GenreSelect @change="track.genre = $event.target.value" :value="track.genre" />
		<button @click="save" class="mx-auto">Enregistrer</button>
	</Modal>
</template>

<script setup>
import Modal from '@/components/Modal.vue';
import GenreSelect from '@/components/GenreSelect.vue';

const { track } = defineProps(['track']);
const emit = defineEmits(['onClose']);

function save() {
	fetch(import.meta.env.VITE_API + '/library', {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			url: track.url,
			artist: track.artist,
			title: track.title,
			genre: track.genre
		})
	}).then(() => {
		emit('onClose');
	});
}
</script>
