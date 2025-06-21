const Order = require('../models/order.model');
const partnerModel = require('../models/partner.model');

module.exports.getPartnerOrders = async (req, res, next) => {
  try {
    const partnerId = req.partner._id; // Ensure `req.partner` is populated by middleware
    const partner = await partnerModel.findById(partnerId);

    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    const orders = partner.orders ; 
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error in getPartnerOrders:", error);
    next(error);
  }
};

module.exports.getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
};

module.exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ order: updatedOrder });
  } catch (error) {
    next(error);
  }
};