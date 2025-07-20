<template>
	<div>
		<table class="mx-auto text-start m-8 border-separate border-spacing-x-10">
			<tr class="cursor-pointer">
				<th @click="sort('artist')" class="text-start" :class="{ 'text-teal-400': order === 'artist' }">Artiste</th>
				<th @click="sort('title')" class="text-start" :class="{ 'text-teal-400': order === 'title' }">Titre</th>
				<th @click="sort('genre')" class="text-start" :class="{ 'text-teal-400': order === 'genre' }">Genre</th>
				<th class="text-start">Lien</th>
			</tr>
			<WishRow v-for="wish of wishes" :key="wish" :wish="wish" @onEdit="$emit('onEdit', wish)" />
		</table>
	</div>
</template>

<script>
import WishRow from '@/components/WishRow.vue';
import useWishes from '@/stores/wishes';

export default {
	components: { WishRow },
	emits: ['onEdit'],
	props: ['wishes'],
	data: () => ({
		order: null
	}),
	setup: () => ({
		wishesStore: useWishes()
	}),
	methods: {
		sort(order) {
			this.order = order;
			this.wishesStore.sort(order);
		}
	}
};
</script>
