<template>
	<div>
		<LibraryView id="library" class="w-10/12 mx-auto" />
		<br />
		<WishesView id="wishes" class="w-10/12 mx-auto" />
		<br />
		<YouTubeView id="youtube" class="w-10/12 mx-auto" />
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
import YouTubeView from '@/views/YouTubeView.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';
</script>
