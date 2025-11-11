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

<script setup>
import { ref } from 'vue';

import EditButton from '@/components/buttons/EditButton.vue';
import DeleteButton from '@/components/buttons/DeleteButton.vue';
import DownloadButton from '@/components/buttons/DownloadButton.vue';
import Spinner from '@/components/Spinner.vue';

import useWishes from '@/stores/wishes';

const wishesStore = useWishes();

const { wish } = defineProps(['wish']);

const downloading = ref(false);

function downloadWish() {
	downloading.value = true;

	wishesStore.downloadWish(wish);
}
</script>
