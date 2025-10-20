import { defineStore } from 'pinia';

export default defineStore('wishes', {
	state: () => ({
		wishes: []
	}),
	actions: {
		async setWishes() {
			this.wishes = await fetch(import.meta.env.VITE_API + '/wishes').then(res => res.json());

			this.wishes = this.wishes.sort((wish1, wish2) => {
				return wish1.artist.localeCompare(wish2.artist) || wish1.title.localeCompare(wish2.title);
			});
		},
		sort(order) {
			this.wishes = this.wishes.sort((t1, t2) => {
				return t1[order].localeCompare(t2[order]);
			});
		},
		addWish(wish) {
			return fetch(import.meta.env.VITE_API + '/wishes', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(wish)
			}).then(() => {
				this.setWishes();
			});
		},
		saveWish(wish) {
			return fetch(import.meta.env.VITE_API + '/wishes/' + wish.id, {
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					artist: wish.artist,
					title: wish.title,
					genre: wish.genre,
					url: wish.url
				})
			}).then(() => {
				this.setWishes();
			});
		},
		downloadWish(wish) {
			return fetch(import.meta.env.VITE_API + '/youtube', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: wish.id,
					url: wish.url,
					artist: wish.artist,
					title: wish.title,
					genre: wish.genre
				})
			}).then(() => {
				this.hideWish(wish);
			});
		},
		downloadAll() {
			this.wishes.forEach(wish => {
				this.downloadWish(wish);
			});
		},
		deleteWish(wish) {
			return fetch(import.meta.env.VITE_API + '/wishes/' + wish.id, { method: 'DELETE' }).then(() => {
				this.hideWish(wish);
			});
		},
		hideWish(wish) {
			this.wishes = this.wishes.filter(w => w.id != wish.id);
		}
	}
});
