import { defineStore } from 'pinia';

export default defineStore('app', {
	state: () => ({
		currentTrack: null,
		isPlaying: false
	})
});
