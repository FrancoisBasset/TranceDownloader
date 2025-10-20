const express = require('express');
const router = express.Router();

const wishesService = require('@/classes/wishes');

router.get('/', (_, res) => {
	const wishes = wishesService.getWishes();

	res.json(wishes);
});

router.post('/', (req, res) => {
	const wish = wishesService.addWish(req.body.artist, req.body.title, req.body.genre, req.body.url);

	res.json(wish);
});

router.delete('/:id', (req, res) => {
	wishesService.deleteWish(req.params.id);

	res.json();
});

router.put('/:id', (req, res) => {
	const wish = wishesService.updateWish(req.params.id, req.body.artist, req.body.title, req.body.genre, req.body.url);

	res.json(wish);
});

router.patch('/', (_, res) => {
	wishesService.initWishes();

	res.json();
});

module.exports = router;
