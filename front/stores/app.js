import { defineStore } from 'pinia';

export default defineStore('app', {
	state: () => ({
		currentTrack: null,
		isPlaying: false,
		wishUrl: '',
		mode: 'library'
	}),
	actions: {
		goTo(mode) {
			this.mode = mode;

			document.getElementById('view').scrollTo({
				behavior: 'smooth',
				top: document.getElementById(mode).offsetTop - 100
			});
		}
	}
});
