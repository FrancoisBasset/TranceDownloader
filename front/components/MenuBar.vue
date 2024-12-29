<template>
	<div>
		<button @click="goTo('library')">Bibliothèque</button>
		<button @click="goTo('wishes')">À ajouter</button>
		<button>YouTube</button>
		<button>EveryNoise</button>
	</div>
</template>

<script>
export default {
	methods: {
		goTo(id) {
			scrollTo({
				behavior: 'smooth',
				top: document.getElementById(id).offsetTop - 50
			});
		}
	}
};
</script>

<style scoped>
img {
	height: 100%;
}
</style>
