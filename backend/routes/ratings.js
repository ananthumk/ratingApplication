const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const verifyToken = require('../middleware/auth');
const { isNormalUser, isStoreOwner } = require('../middleware/roles');

router.post('/', verifyToken, isNormalUser, ratingController.submitRating);
router.get('/me', verifyToken, isNormalUser, ratingController.getUserRatings);

module.exports = router;