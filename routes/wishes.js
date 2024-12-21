const express = require('express');
const router = express.Router();

const Wishes = require('../classes').Wishes;

router.get('/', (_, res) => {
	const wishes = Wishes.getWishes();

	res.json({
		success: true,
		response: wishes
	});
});

router.post('/', (req, res) => {
	const wish = Wishes.addWish(req.body.artist, req.body.track);

	res.json({
		success: true,
		response: wish
	});
});

router.delete('/:id', (req, res) => {
	Wishes.deleteWish(req.params.id);

	res.json({
		success: true
	});
});

router.put('/:id', (req, res) => {
	const wish = Wishes.updateWish(req.params.id, req.body.artist, req.body.track);

	res.json({
		success: true,
		response: wish
	});
});

router.patch('/', (_, res) => {
	Wishes.initWishes();

	res.json({
		success: true
	});
});

module.exports = router;
