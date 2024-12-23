const express = require('express');
const router = express.Router();

const wishesService = require('@/classes/wishes');

router.get('/', (_, res) => {
	const wishes = wishesService.getWishes();

	res.json({
		success: true,
		response: wishes
	});
});

router.post('/', (req, res) => {
	const wish = wishesService.addWish(req.body.artist, req.body.track);

	res.json({
		success: true,
		response: wish
	});
});

router.delete('/:id', (req, res) => {
	wishesService.deleteWish(req.params.id);

	res.json({
		success: true
	});
});

router.put('/:id', (req, res) => {
	const wish = wishesService.updateWish(req.params.id, req.body.artist, req.body.track);

	res.json({
		success: true,
		response: wish
	});
});

router.patch('/', (_, res) => {
	wishesService.initWishes();

	res.json({
		success: true
	});
});

module.exports = router;
