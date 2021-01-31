const express = require('express');
const router = express.Router();

const YoutubeController = require('../classes').YoutubeController;

const fs =require('fs');

const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const NodeID3 = require('node-id3');

router.get('/', function(req, res) {
	YoutubeController.getResults(req.query.search).then(function(videos) {
		res.json({
			success: true,
			response: videos
		});
	});
});

router.post('/', function(req, res) {
	const filename = req.body.artist.split(' ').join('_') + '_' + req.body.track.split(' ').join('_') + '.mp3';
	const stream = ytdl(req.body.url);

	const proc = new ffmpeg({source:stream})
	proc.setFfmpegPath('D:/Dev/TranceDownloader/ffmpeg/ffmpeg.exe')
	proc.saveToFile(filename);
	proc.on('end', function() {
		NodeID3.write({
			artist: req.body.artist,
			title: req.body.track,
			genre: 'Trance'
		}, filename);

		res.json({
			success: true
		});
	});
});

module.exports = router;