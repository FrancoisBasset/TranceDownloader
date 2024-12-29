<template>
	<div>
		<button @click="app.goTo('library')">Bibliothèque</button>
		<button @click="app.goTo('wishes')">À ajouter</button>
		<button @click="app.goTo('youtube')">YouTube</button>
		<button>EveryNoise</button>
	</div>
</template>

<script>
import useApp from '@/stores/app';

export default {
	data: () => ({
		app: useApp()
	})
};
</script>

<style scoped>
img {
	height: 100%;
}
</style>
