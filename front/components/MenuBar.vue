<template>
	<div>
		<button @click="app.goTo('library')" :class="buttonClasses('library')">Bibliothèque</button>
		<button @click="app.goTo('wishes')" :class="buttonClasses('wishes')">À ajouter</button>
		<button @click="app.goTo('youtube')" :class="buttonClasses('youtube')">YouTube</button>
		<button>EveryNoise</button>
	</div>
</template>

<script>
import useApp from '@/stores/app';

export default {
	data: () => ({
		app: useApp()
	}),
	methods: {
		buttonClasses(mode) {
			if (this.app.mode === mode) {
				return ['font-bold'];
			}

			return [];
		}
	}
};
</script>

<style scoped>
img {
	height: 100%;
}
</style>
