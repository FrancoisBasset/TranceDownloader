<template>
	<div class="grid grid-cols-3">
		<YouTubeResult class="w-8/12 m-8" v-for="result in results" :key="result" :result="result" />
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
