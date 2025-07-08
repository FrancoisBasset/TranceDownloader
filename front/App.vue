<template>
	<div v-if="haveDir && haveJson" class="h-screen flex flex-col text-center">
		<MenuBar class="bg-zinc-100 w-fit mx-auto m-4 rounded-lg shadow-2xl" />

		<div id="view" class="flex-1 overflow-y-auto">
			<RouterView />
		</div>
	</div>
	<div v-else class="h-screen flex items-center justify-center">
		<div v-if="!loadingText && haveDir === false" class="flex flex-col p-2 bg-zinc-100 shadow-2xl rounded-lg">
			<text>Le dossier Musique n'est pas renseigné.</text>
			<input type="text" v-model="dir" />
			<div class="text-center">
				<button @click="sendDir" class="green-button mx-auto">Envoyer</button>
			</div>
		</div>
		<div v-else-if="haveJson === false" class="flex flex-col p-2 bg-zinc-100 shadow-2xl rounded-lg">
			<Spinner class="mx-auto text-center" />
			{{ loadingText }}
		</div>
	</div>
</template>

<script setup>
import MenuBar from '@/components/MenuBar.vue';
import Spinner from '@/components/Spinner.vue';
</script>

<script>
export default {
	data: () => ({
		haveDir: null,
		haveJson: null,
		dir: '',
		loadingText: null
	}),
	async created() {
		this.haveDir = await fetch(import.meta.env.VITE_API + '/dir').then(res => res.status !== 404);
		this.haveJson = await fetch('/library.json')
			.then(r => r.text())
			.then(text => {
				return !text.includes('<html');
			});

		if (this.haveDir && !this.haveJson) {
			this.sendDir();
		}
	},
	methods: {
		sendDir() {
			if (this.dir.endsWith('/')) {
				this.dir = this.dir.slice(0, -1);
			}

			fetch(import.meta.env.VITE_API + '/dir', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					dir: this.dir
				})
			}).then(() => {
				const socket = new WebSocket(import.meta.env.VITE_WS);

				socket.onmessage = msg => {
					this.loadingText = msg.data;
				};

				socket.onclose = () => {
					this.haveDir = true;
					this.haveJson = true;
				};
			});
		}
	}
};
</script>
