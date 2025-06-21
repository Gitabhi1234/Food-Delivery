const partnerModel = require('../models/partner.model');
const { validationResult } = require('express-validator');
const partnerService = require('../services/partner.service');
const blackListTokenModel = require('../models/blackListToken.model');
const Order = require('../models/order.model');
const userModel = require('../models/user.model'); // Add this at the top if not present

module.exports.registerPartner = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password ,hotelname} = req.body;
  try {
    const isAlreadyPartner = await partnerModel.findOne({ email });
    if (isAlreadyPartner) {
      return res.status(400).json({ message: 'Partner already exists' });
    }
    const hashedPassword = await partnerModel.hashPassword(password);
    const partner = await partnerService.createPartner({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      hotelname,
      password: hashedPassword
    });
    const token = partner.generateAuthToken();
    res.status(201).json({ partner, token });
  } catch (error) {
    next(error);
  }
};

module.exports.loginPartner = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const partner = await partnerModel.findOne({ email }).select("+password");
    if (!partner) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await partner.comparePasswords(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = partner.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ partner, token });
  } catch (error) {
    next(error);
  }
};

module.exports.getPartnerProfile = async (req, res, next) => {
  try {
    res.status(200).json(req.partner);
  } catch (error) {
    next(error);
  }
};

module.exports.logoutPartner = async (req, res, next) => {
  try {
    res.clearCookie("token");
    const token =
      req.cookies.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (token) {
      await blackListTokenModel.create({ token });
    }
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports.addItem = async (req, res, next) => {
  try {
    const { name, price, photo, description, available = true } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required.' });
    }
    const partner = req.partner;
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found.' });
    }
    partner.items.push({ name, price, description, photo, available });
    await partner.save();
    return res.status(201).json({
      message: 'Food item added successfully.',
      item: partner.items[partner.items.length - 1]
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getItems = async (req, res, next) => {
  try {
    const partner = req.partner;
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found.' });
    }
    return res.status(200).json({ items: partner.items });
  } catch (error) {
    next(error);
  }
};

module.exports.toggleAvailability = async (req, res, next) => {
  try {
    const partner = req.partner;
    const { itemId } = req.params;
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found.' });
    }
    const item = partner.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found.' });
    }
    item.available = !item.available;
    await partner.save();
    return res.status(200).json({ message: 'Availability toggled', available: item.available });
  } catch (error) {
    next(error);
  }
};

module.exports.getOrders = async (req, res, next) => {
  try {
    const partner = req.partner;
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found.' });
    }
    return res.status(200).json({ items: partner.orders });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllPartners = async (req, res, next) => {
  try {
    const partners = await require('../models/partner.model')
      .find({})
      .select('-password -socketId');
    return res.status(200).json({ partners });
  } catch (error) {
    next(error);
  }
};

module.exports.sendOrder = async (req, res, next) => {
  try {
    const { cartItems, totalPrice, selectedLocation, partnerId } = req.body;

    if (!cartItems || !totalPrice || !selectedLocation || !partnerId) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const partner = await partnerModel.findById(partnerId);
    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    const orderId = Date.now().toString();

    const newOrder = new Order({
      orderId,
      cartItems,
      totalPrice,
      selectedLocation,
      partnerId,
      status: 'Pending',
    });

    await newOrder.save();

    partner.orders.push({
      orderId: newOrder.orderId,
      cartItems: newOrder.cartItems,
      totalPrice: newOrder.totalPrice,
      selectedLocation: newOrder.selectedLocation,
      status: "Pending",
      createdAt: newOrder.createdAt,
    });

    await partner.save();

    res.status(200).json({ orderId: newOrder.orderId });
  } catch (error) {
    console.error("Error in sendOrder:", error);
    next(error);
  }
};

module.exports.orderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
  
    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });

    }
    res.status(200).json({ status: order.status });
  } catch (error) {
    next(error);
  }
};

module.exports.getPartner = async (req, res, next) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart items are required to find a partner." });
    }

    const partner = await partnerModel.findOne({
      'items._id': { $all: cartItems.map(item => item.itemId) }
    });

    if (!partner) {
      return res.status(404).json({ message: "No partner found for the selected items." });
    }

    res.status(200).json({ partnerId: partner._id });
  } catch (error) {
    console.error("Error in getPartner:", error);
    next(error);
  }
};

module.exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
      return res.status(400).json({ message: "orderId and status are required." });
    }

    // Update status in Order collection
    const order = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update status in partner's embedded orders array
    await partnerModel.updateOne(
      { "orders.orderId": orderId },
      { $set: { "orders.$.status": status } }
    );
    await userModel.updateOne(
      { "orders.items": order.cartItems },
      { $set: { "orders.$.status": status } }
    );
   

    res.status(200).json({ message: "Order status updated.", order });
  } catch (error) {
    next(error);
  }
};

