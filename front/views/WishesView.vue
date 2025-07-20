<template>
	<BlockView>
		<WishForm class="p-6" />

		<button v-if="wishesStore.wishes.length > 0" @click="wishesStore.downloadAll" class="!w-auto green-button">Télécharger tout ({{ wishesStore.wishes.length }})</button>

		<WishesList v-if="wishesStore.wishes.length > 0" :wishes="wishesStore.wishes" @onEdit="wish => editingWish = wish" />

		<WishModal v-if="editingWish" :key="editingWish" :wish="editingWish" @onClose="editingWish = null" />
	</BlockView>
</template>

<script>
import BlockView from '@/components/BlockView.vue';
import WishForm from '@/components/WishForm.vue';
import WishesList from '@/components/WishesList.vue';
import WishModal from '@/components/WishModal.vue';
import useWishes from '@/stores/wishes';

export default {
	components: { BlockView, WishForm, WishesList, WishModal },
	data: () => ({
		editingWish: null
	}),
	setup: () => ({
		wishesStore: useWishes()
	}),
	created() {
		this.wishesStore.setWishes();
	},
};
</script>
