<template>
	<div>
		<AddWishForm class="p-6" @wishAdded="setWishes" />

		<button @click="downloadAll" class="!w-auto green-button">Télécharger tout ({{ wishes.length }})</button>

		<table class="mx-auto text-start m-8 border-separate border-spacing-x-10">
			<tr class="cursor-pointer">
				<th @click="sortBy('artist')" class="text-start" :class="{ 'text-green-500': sortMode === 'artist' }">Artiste</th>
				<th @click="sortBy('title')" class="text-start" :class="{ 'text-green-500': sortMode === 'title' }">Titre</th>
				<th @click="sortBy('genre')" class="text-start" :class="{ 'text-green-500': sortMode === 'genre' }">Genre</th>
				<th class="text-start">Lien</th>
			</tr>
			<WishRow ref="wishRows" v-for="wish of wishes" :key="wish" :wish="wish" @wishUpdated="setWishes" @wishDeleted="setWishes" @wishDownloaded="removeWish(wish)" />
		</table>
	</div>
</template>

<script setup>
import WishRow from '@/components/WishRow.vue';
import AddWishForm from '@/components/AddWishForm.vue';
</script>

<script>
export default {
	data: () => ({
		wishes: [],
		sortMode: 'artist'
	}),
	created() {
		this.setWishes();
	},
	methods: {
		async setWishes() {
			this.wishes = await fetch(import.meta.env.VITE_API + '/wishes')
				.then(res => res.json())
				.then(json => json.response);

			this.wishes = this.wishes.sort((wish1, wish2) => {
				return wish1.artist.localeCompare(wish2.artist) || wish1.title.localeCompare(wish2.title);
			});
		},
		sortBy(type) {
			this.sortMode = type;

			this.wishes = this.wishes.sort((t1, t2) => {
				return t1[type].localeCompare(t2[type]);
			});
		},
		downloadAll() {
			this.$refs.wishRows.forEach(wishRow => {
				wishRow.downloadWish();
			});
		},
		removeWish(wish) {
			this.wishes = this.wishes.filter(w => w.id != wish.id);
		}
	}
};
</script>
