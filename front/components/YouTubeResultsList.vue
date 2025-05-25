<template>
	<div class="grid grid-cols-4">
		<YouTubeResult class="w-10/12 m-2" v-for="result in results" :key="result" :result="result" />
	</div>
</template>

<script setup>
import YouTubeResult from '@/components/YouTubeResult.vue';
</script>

<script>
export default {
	props: ['results']
};
</script>
