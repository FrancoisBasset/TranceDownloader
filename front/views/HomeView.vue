<template>
	<div class="mb-28 flex flex-col gap-24">
		<LibraryView id="library" class="w-10/12 mx-auto mt-[40px]" />
		<WishesView id="wishes" class="w-10/12 mx-auto mt-[40px]" />
		<YouTubeView id="youtube" class="w-10/12 mx-auto mt-[40px]" />

		<MusicPlayer />
	</div>
</template>

<script setup>
import LibraryView from '@/views/LibraryView.vue';
import WishesView from '@/views/WishesView.vue';
import YouTubeView from '@/views/YouTubeView.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';
</script>
