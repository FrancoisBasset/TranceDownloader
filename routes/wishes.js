const express = require('express');
const router = express.Router();

const WishesController = require('../classes').WishesController;

router.get('/', function(req, res) {
	const wishes = WishesController.getWishes();

	res.json({
		success: true,
		response: wishes
	});
});

router.post('/', function(req, res) {
	WishesController.addWish(req.body.artist, req.body.track);

	res.json({
		success: true
	});
});

router.put('/done/:id', function(req, res) {
	const wish = WishesController.doneWish(req.params.id);

	res.json({
		success: true,
		response: wish
	});
});

router.put('/back/:id', function(req, res) {
	const wish = WishesController.backWish(req.params.id);

	res.json({
		success: true,
		wish: wish
	});
});

router.put('/:id', function(req, res) {
	const wish = WishesController.updateWish(req.params.id, req.body.artist, req.body.track);

	res.json({
		success: true,
		wish: wish
	});
});

module.exports = router;