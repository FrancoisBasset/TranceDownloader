<template>
	<div class="bg-zinc-100 w-fit mx-auto m-4 rounded-lg shadow-2xl p-3">
		<label @click="app.goTo('library')" :class="buttonClasses('library')">Bibliothèque</label>
		<label @click="app.goTo('wishes')" :class="buttonClasses('wishes')">À ajouter</label>
		<label @click="app.goTo('youtube')" :class="buttonClasses('youtube')">YouTube</label>
		<label @click="app.goTo('everynoise')" :class="buttonClasses('everynoise')">EveryNoise</label>
	</div>
</template>

<script>
import useApp from '@/stores/app';

export default {
	setup: () => ({
		app: useApp()
	}),
	methods: {
		buttonClasses(mode) {
			const classes = ['cursor-pointer', 'text-lg', 'm-5'];

			if (this.app.mode === mode) {
				classes.push('font-bold');
			}

			return classes;
		}
	}
};
</script>

<style scoped>
img {
	height: 100%;
}
</style>
