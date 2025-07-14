<template>
	<tr :class="trClasses">
		<td v-if="!editMode">{{ wish.artist }}</td>
		<td v-else><input type="text" v-model="wish.artist" class="mb-4" /></td>

		<td v-if="!editMode">{{ wish.title }}</td>
		<td v-else><input type="text" v-model="wish.title" class="mb-4" /></td>

		<td v-if="!editMode">{{ wish.genre }}</td>
		<td v-else><GenreSelect @change="wish.genre = $event.target.value" :value="wish.genre" class="my-4" /></td>

		<td v-if="!editMode">{{ wish.url }}</td>
		<td v-else><input type="text" v-model="wish.url" class="mb-4" /></td>

		<td class="flex space-x-1">
			<EditButton v-if="!editMode" @click="editMode = true" />
			<SaveButton v-if="editMode" @click="saveWish" />
			<DeleteButton @click="wishesStore.deleteWish(wish)" />
			<DownloadButton v-if="!downloading" @click="downloadWish" />
			<Spinner v-else />
		</td>
	</tr>
</template>

<script>
import GenreSelect from '@/components/GenreSelect.vue';
import EditButton from '@/components/EditButton.vue';
import SaveButton from '@/components/SaveButton.vue';
import DeleteButton from '@/components/DeleteButton.vue';
import DownloadButton from '@/components/DownloadButton.vue';
import Spinner from '@/components/Spinner.vue';
import useApp from '@/stores/app';
import useWishes from '@/stores/wishes';

export default {
	components: { GenreSelect, EditButton, SaveButton, DeleteButton, DownloadButton, Spinner },
	expose: ['downloadWish'],
	props: ['wish'],
	data: () => ({
		editMode: false,
		downloading: false
	}),
	setup: () => ({
		app: useApp(),
		wishesStore: useWishes()
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
			this.wishesStore.saveWish(this.wish).then(() => {
				this.editMode = false;
			});
		},
		downloadWish() {
			this.downloading = true;

			this.wishesStore.downloadWish(this.wish);
		}
	}
};
</script>
