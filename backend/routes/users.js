const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/auth');
const { isAdmin } = require('../middleware/roles');


router.get('/', verifyToken, isAdmin, userController.getAllUsers);
router.get('/stats', verifyToken, isAdmin, userController.getSystemStats);
router.put('/me/password', verifyToken, userController.updatePassword);
router.get('/:id', verifyToken, isAdmin, userController.getUserDetails);

module.exports = router;