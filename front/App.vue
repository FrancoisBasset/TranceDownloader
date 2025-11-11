<template>
	<div v-if="haveDir && haveJson" class="h-screen flex flex-col text-center">
		<MenuBar />

		<div id="view" class="flex-1 overflow-y-auto" style="scrollbar-width: none">
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
import { onMounted, ref } from 'vue';
import MenuBar from '@/components/MenuBar.vue';
import Spinner from '@/components/Spinner.vue';

const haveDir = ref(null);
const haveJson = ref(null);
const dir = ref('');
const loadingText = ref(null);

onMounted(async () => {
	haveDir.value = await fetch(import.meta.env.VITE_API + '/dir').then(res => res.status !== 404);
	haveJson.value = await fetch('/library.json')
		.then(r => r.text())
		.then(text => !text.includes('<html'));

	if (haveDir.value && !haveJson.value) {
		sendDir();
	}
});

function sendDir() {
	if (dir.value.endsWith('/')) {
		dir.value = dir.value.slice(0, -1);
	}

	fetch(import.meta.env.VITE_API + '/dir', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			dir: dir.value
		})
	}).then(() => {
		const socket = new WebSocket(import.meta.env.VITE_WS);

		socket.onmessage = msg => {
			loadingText.value = msg.data;
		};

		socket.onclose = () => {
			haveDir.value = true;
			haveJson.value = true;
		};
	});
}
</script>
