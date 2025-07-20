<template>
	<tr>
		<td>{{ wish.artist }}</td>
		<td>{{ wish.title }}</td>
		<td>{{ wish.genre }}</td>
		<td>{{ wish.url }}</td>

		<td class="flex space-x-1">
			<EditButton @click="$emit('onEdit', wish)" />
			<DeleteButton @click="wishesStore.deleteWish(wish)" />
			<DownloadButton v-if="!downloading" @click="downloadWish" />
			<Spinner v-else />
		</td>
	</tr>
</template>

<script>
import EditButton from '@/components/buttons/EditButton.vue';
import DeleteButton from '@/components/buttons/DeleteButton.vue';
import DownloadButton from '@/components/buttons/DownloadButton.vue';
import Spinner from '@/components/Spinner.vue';
import useApp from '@/stores/app';
import useWishes from '@/stores/wishes';

export default {
	components: { EditButton, DeleteButton, DownloadButton, Spinner },
	expose: ['downloadWish'],
	props: ['wish'],
	data: () => ({
		downloading: false
	}),
	setup: () => ({
		app: useApp(),
		wishesStore: useWishes()
	}),
	methods: {
		downloadWish() {
			this.downloading = true;

			this.wishesStore.downloadWish(this.wish);
		}
	}
};
</script>
