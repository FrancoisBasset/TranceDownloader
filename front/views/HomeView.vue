<template>
	<div>
		<LibraryView class="w-10/12 mx-auto" />
		<br />
		<WishesView class="w-10/12 mx-auto" />

		<MusicPlayer />
	</div>
</template>

<script setup>
import LibraryView from '@/views/LibraryView.vue';
import WishesView from '@/views/WishesView.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';
</script>
