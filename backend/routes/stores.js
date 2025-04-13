const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const verifyToken = require('../middleware/auth');
const { isAdmin, isStoreOwner } = require('../middleware/roles');


router.post('/', verifyToken, isAdmin, storeController.createStore);
router.get('/', storeController.getAllStores);
router.get('/:id', verifyToken, storeController.getStoreDetails);
router.get('/owner/my-store', verifyToken, isStoreOwner, storeController.getOwnerStore);

module.exports = router;