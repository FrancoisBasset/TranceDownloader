<template>
	<tr :class="trClasses">
		<td v-if="!editMode">{{ wish.artist }}</td>
		<td v-else><input type="text" v-model="wish.artist" class="input-field mb-4" /></td>

		<td v-if="!editMode">{{ wish.title }}</td>
		<td v-else><input type="text" v-model="wish.title" class="input-field mb-4" /></td>

		<td v-if="!editMode">{{ wish.genre }}</td>
		<td v-else><GenreSelect @change="wish.genre = $event.target.value" :value="wish.genre" class="my-4" /></td>

		<td v-if="!editMode">{{ wish.url }}</td>
		<td v-else><input type="text" v-model="wish.url" class="input-field mb-4" /></td>

		<td class="flex space-x-1">
			<EditButton v-if="!editMode" @click="editMode = true" />
			<SaveButton v-if="editMode" @click="saveWish" />
			<DeleteButton @click="deleteWish" />
			<DownloadButton v-if="!downloading" @click="downloadWish" />
			<Spinner v-else />
		</td>
	</tr>
</template>

<script setup>
import GenreSelect from '@/components/GenreSelect.vue';
import EditButton from '@/components/EditButton.vue';
import SaveButton from '@/components/SaveButton.vue';
import DeleteButton from '@/components/DeleteButton.vue';
import DownloadButton from '@/components/DownloadButton.vue';
import Spinner from '@/components/Spinner.vue';
</script>

<script>
import useApp from '@/stores/app';

export default {
	expose: ['downloadWish'],
	props: ['wish'],
	data: () => ({
		app: useApp(),
		editMode: false,
		downloading: false
	}),
	computed: {
		trClasses() {
			if (this.editMode) {
				return ['rounded-lg', 'shadow-lg', 'shadow-orange-500'];
			}

			return ['hover:bg-orange-100'];
		}
	},
	methods: {
		saveWish() {
			fetch(import.meta.env.VITE_API + '/wishes/' + this.wish.id, {
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					artist: this.wish.artist,
					title: this.wish.title,
					genre: this.wish.genre,
					url: this.wish.url
				})
			}).then(() => {
				this.editMode = false;
				this.$emit('wishUpdated');
			});
		},
		downloadWish() {
			this.downloading = true;

			fetch(import.meta.env.VITE_API + '/youtube', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: this.wish.id,
					url: this.wish.url,
					artist: this.wish.artist,
					title: this.wish.title,
					genre: this.wish.genre
				})
			}).then(() => {
				this.$emit('wishDownloaded');
			});
		},
		deleteWish() {
			fetch(import.meta.env.VITE_API + '/wishes/' + this.wish.id, {
				method: 'DELETE'
			}).then(() => {
				this.$emit('wishDeleted');
			});
		}
	}
};
</script>
