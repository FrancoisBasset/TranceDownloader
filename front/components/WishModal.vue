<template>
	<Modal>
		<input type="text" v-model="wish.artist" />
		<input type="text" v-model="wish.title" />
		<GenreSelect @change="wish.genre = $event.target.value" :value="wish.genre" />
		<input type="text" v-model="wish.url" />

		<button @click="saveWish">Enregistrer</button>
	</Modal>
</template>

<script setup>
import Modal from '@/components/Modal.vue';
import GenreSelect from '@/components/GenreSelect.vue';
import useWishes from '@/stores/wishes';

const emit = defineEmits(['onClose']);

const wishesStore = useWishes();

const { wish } = defineProps(['wish']);

function saveWish() {
	wishesStore.saveWish(wish).then(() => {
		emit('onClose');
	});
}
</script>
