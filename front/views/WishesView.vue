<template>
	<BlockView>
		<WishForm class="p-6" />

		<button v-if="wishesStore.wishes.length > 0" @click="wishesStore.downloadAll" class="!w-auto green-button">Télécharger tout ({{ wishesStore.wishes.length }})</button>

		<WishesList v-if="wishesStore.wishes.length > 0" :wishes="wishesStore.wishes" @onEdit="wish => (editingWish = wish)" />

		<WishModal v-if="editingWish" :key="editingWish" :wish="editingWish" @onClose="editingWish = null" />
	</BlockView>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import BlockView from '@/components/BlockView.vue';
import WishForm from '@/components/WishForm.vue';
import WishesList from '@/components/WishesList.vue';
import WishModal from '@/components/WishModal.vue';
import useWishes from '@/stores/wishes';

const wishesStore = useWishes();

const editingWish = ref(null);

onMounted(() => {
	wishesStore.setWishes();
});
</script>
