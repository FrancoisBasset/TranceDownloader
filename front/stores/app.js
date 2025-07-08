import { defineStore } from 'pinia';

export default defineStore('app', {
	state: () => ({
		currentTrack: null,
		isPlaying: false,
		wishUrl: '',
		youtubeSearch: '',
		mode: 'library',
		direct: false
	}),
	actions: {
		async goTo(mode) {
			this.direct = true;
			this.mode = mode;

			document.getElementById('view').scrollTo({
				behavior: 'smooth',
				top: document.getElementById(mode).offsetTop - 100
			});
			await new Promise(r => setTimeout(r, 1000));
			this.direct = false;
		}
	}
});
