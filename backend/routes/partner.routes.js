const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const partnerController = require('../controllers/partner.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
  body('email').isEmail().withMessage('invalid email'),
  body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long'),
  body('fullname.firstname').isLength({ min: 3 }).withMessage('first name must be at least 3 characters long'),
  body('hotelname').isLength({ min: 3 }).withMessage('Hotel name must be at least 3 characters long')
], partnerController.registerPartner);

router.post('/login', partnerController.loginPartner);
router.get('/profile', authMiddleware.authPartner, partnerController.getPartnerProfile);
router.post('/logout', partnerController.logoutPartner);
router.post('/add-item', authMiddleware.authPartner, partnerController.addItem);
router.get('/items', authMiddleware.authPartner, partnerController.getItems);
router.post('/toggle-item/:itemId', authMiddleware.authPartner, partnerController.toggleAvailability);

router.post('/send-order', partnerController.sendOrder);
router.get('/order-status/:orderId', partnerController.orderStatus);
router.post('/getpartner', partnerController.getPartner);
router.get('/all', partnerController.getAllPartners);
router.post('/update-order-status', partnerController.updateOrderStatus);

module.exports = router;