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
	const wish = WishesController.addWish(req.body.artist, req.body.track);

	res.json({
		success: true,
		response: wish
	});
});

router.delete('/:id', function(req, res) {
	WishesController.deleteWish(req.params.id);

	res.json({
		success: true
	});
});

router.put('/:id', function(req, res) {
	const wish = WishesController.updateWish(req.params.id, req.body.artist, req.body.track);

	res.json({
		success: true,
		response: wish
	});
});

router.patch('/', function(req, res) {
	WishesController.initWishes();

	res.json({
		success: true
	});
});

module.exports = router;