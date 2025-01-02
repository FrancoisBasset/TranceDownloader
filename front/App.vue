<template>
	<div v-if="haveDir" class="text-center">
		<MenuBar class="fixed bg-white w-full" />
		<RouterView class="pt-[50px]" />
	</div>
	<div v-else class="h-screen flex items-center justify-center">
		<div class="flex flex-col p-2 bg-blue-100 shadow-2xl rounded-lg">
			<text >Le dossier Musique n'est pas renseigné.</text>
			<input type="text" v-model="dir" />
			<button @click="sendDir" class="mx-auto bg-green-100 w-fit px-2">Envoyer</button>
		</div>
	</div>
</template>

<script setup>
import MenuBar from '@/components/MenuBar.vue';
</script>

<script>
export default {
	data: () => ({
		haveDir: false,
		dir: ''
	}),
	created() {
		fetch(import.meta.env.VITE_API + '/dir').then(res => {
			this.haveDir = res.status !== 404;
		});
	},
	methods: {
		sendDir() {
			fetch(import.meta.env.VITE_API + '/dir', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					dir: this.dir
				})
			});
		}
	}
};
</script>
