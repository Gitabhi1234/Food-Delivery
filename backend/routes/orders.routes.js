const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const orderController = require('../controllers/order.controller');

router.get('/', authMiddleware.authPartner, orderController.getPartnerOrders);
router.get('/:orderId', authMiddleware.authPartner, orderController.getOrderById);
router.put('/:orderId', authMiddleware.authPartner, orderController.updateOrderStatus);

module.exports = router;