<template>
	<div>
		<table class="mx-auto text-start m-8 border-separate border-spacing-x-10">
			<tr class="cursor-pointer">
				<th @click="sort('artist')" class="text-start" :class="{ 'text-green-500': order === 'artist' }">Artiste</th>
				<th @click="sort('title')" class="text-start" :class="{ 'text-green-500': order === 'title' }">Titre</th>
				<th @click="sort('genre')" class="text-start" :class="{ 'text-green-500': order === 'genre' }">Genre</th>
				<th class="text-start">Lien</th>
			</tr>
			<WishRow ref="wishRows" v-for="wish of wishesStore.wishes" :key="wish" :wish="wish" />
		</table>
	</div>
</template>

<script>
import WishRow from '@/components/WishRow.vue';
import useWishes from '@/stores/wishes';

export default {
	components: { WishRow },
	data: () => ({
		order: null
	}),
	setup: () => ({
		wishesStore: useWishes()
	}),
	created() {
		this.wishesStore.setWishes();
	},
	methods: {
		sort(order) {
			this.order = order;
			this.wishesStore.sort(order);
		}
	}
};
</script>
