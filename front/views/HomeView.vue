<template>
	<div>
		<LibraryView id="library" class="w-10/12 mx-auto" />
		<br />
		<WishesView id="wishes" class="w-10/12 mx-auto" />
		<br />
		<br />
		<br />
		<br />
		<br />

		<MusicPlayer />
	</div>
</template>

<script setup>
import LibraryView from '@/views/LibraryView.vue';
import WishesView from '@/views/WishesView.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';
</script>
