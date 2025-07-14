<template>
	<BlockView>
		<WishForm class="p-6" />

		<button v-if="wishesStore.wishes.length > 0" @click="wishesStore.downloadAll" class="!w-auto green-button">Télécharger tout ({{ wishesStore.wishes.length }})</button>

		<WishesList />
	</BlockView>
</template>

<script>
import BlockView from '@/components/BlockView.vue';
import WishForm from '@/components/WishForm.vue';
import WishesList from '@/components/WishesList.vue';
import useWishes from '@/stores/wishes';

export default {
	components: { BlockView, WishForm, WishesList },
	setup: () => ({
		wishesStore: useWishes()
	})
};
</script>
