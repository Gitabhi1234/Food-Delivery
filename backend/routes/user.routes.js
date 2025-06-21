const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('first name must be at least 3 characters long')
], userController.registeruser);

router.post('/login', userController.loginUser);
router.post('/profile', authMiddleware.authUser, userController.getUserProfile);
router.post('/logout', userController.logoutUser);
router.post('/cart/add', authMiddleware.authUser, userController.addItemToCart);
router.get('/cart', authMiddleware.authUser, userController.fetchCartItems);
router.delete('/cart/:itemId', authMiddleware.authUser, userController.deleteCartItem);
router.post('/orders', authMiddleware.authUser, userController.getUserOrders);    
router.post('/cart/confirm', authMiddleware.authUser, userController.confirmCartAsOrder);

module.exports = router;