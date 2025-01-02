<template>
	<div v-if="haveDir" class="h-screen flex flex-col text-center">
		<MenuBar class="bg-sky-100 w-fit mx-auto m-4 rounded-lg shadow-2xl" />
		
		<div id="view" class="flex-1 overflow-y-auto">
			<RouterView />
		</div>
	</div>
	<div v-else class="h-screen flex items-center justify-center">
		<div class="flex flex-col p-2 bg-sky-100 shadow-2xl rounded-lg">
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
