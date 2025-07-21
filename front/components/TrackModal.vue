<template>
	<Modal>
		<input type="text" v-model="track.artist" />
		<input type="text" v-model="track.title" />
		<GenreSelect @change="track.genre = $event.target.value" :value="track.genre" />
		<button @click="save" class="mx-auto">Enregistrer</button>
	</Modal>
</template>

<script>
import Modal from '@/components/Modal.vue';
import GenreSelect from '@/components/GenreSelect.vue';

export default {
	components: { Modal, GenreSelect },
	props: ['track'],
	methods: {
		save() {
			fetch(import.meta.env.VITE_API + '/library', {
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					url: this.track.url,
					artist: this.track.artist,
					title: this.track.title,
					genre: this.track.genre
				})
			}).then(() => {
				this.$emit('onClose');
			});
		}
	}
};
</script>
