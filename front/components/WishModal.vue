<template>
	<Modal>
		<input type="text" v-model="wish.artist" />
		<input type="text" v-model="wish.title" />
		<GenreSelect @change="wish.genre = $event.target.value" :value="wish.genre" />
		<input type="text" v-model="wish.url" />

		<button @click="saveWish">Enregistrer</button>
	</Modal>
</template>

<script>
import Modal from '@/components/Modal.vue';
import GenreSelect from '@/components/GenreSelect.vue';
import useWishes from '@/stores/wishes';

export default {
	components: { Modal, GenreSelect },
	props: ['wish'],
	setup: () => ({
		wishesStore: useWishes()
	}),
	methods: {
		saveWish() {
			this.wishesStore.saveWish(this.wish).then(() => {
				this.$emit('onClose');
			});
		}
	}
};
</script>
