import { defineStore } from 'pinia';

export default defineStore('app', {
	state: () => ({
		currentTrack: null,
		isPlaying: false,
		wishUrl: ''
	}),
	actions: {
		goTo(id) {
			scrollTo({
				behavior: 'smooth',
				top: document.getElementById(id).offsetTop - 50
			});
		}
	}
});
