export default class MusicLibrary {
	static genres = null;
	static artists = null;

	static {
		if (MusicLibrary.artists === null && MusicLibrary.genres === null) {
			this.reload();
		}
	}

	static buildGenres(tracks) {
		return tracks.reduce(function(genres, track) {
			if (genres[track.genre] === undefined) {
				genres[track.genre] = [];
			}
	
			if (genres[track.genre][track.artist] === undefined) {
				genres[track.genre][track.artist] = [];
			}
	
			genres[track.genre][track.artist].push(track);
	
			return genres;
		}, []);
	}

	static buildArtists(tracks) {
		return tracks.reduce(function(artists, track) {
			if (artists[track.artist] === undefined) {
				artists[track.artist] = [];
			}
	
			artists[track.artist].push(track);
	
			return artists;
		}, []);
	}

	static reload() {
		fetch('/library.json').then(function(response) {
			response.json().then(function(tracks) {
				MusicLibrary.genres = MusicLibrary.buildGenres(tracks);
				MusicLibrary.artists = MusicLibrary.buildArtists(tracks);
			});
		});
	}
}
