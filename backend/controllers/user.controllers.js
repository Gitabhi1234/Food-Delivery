const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blackListToken.model');


module.exports.registeruser = async function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password } = req.body;
    const isalreadyuser = await userModel.findOne({ email });
    if (isalreadyuser) {
       return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });
    const token = user.generateAuthToken();
    res.status(201).json({ user, token });
};

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
       return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await user.comparePasswords(password);
    if (!isMatch) {
       return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res, next) => {
      const user = req.user; 
    res.status(200).json(user);
};

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.PPPtoken || req.headers.authorization.split(' ')[1];
    await blackListTokenModel.create({ token });
    res.status(200).json({ message: 'Logged out' });
};

module.exports.addItemToCart = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }
        const user = req.user;
        const { item } = req.body;

        const existingItemIndex = user.cartItems.findIndex(
            ci => ci.itemId.toString() === item.itemId
        );
        if (existingItemIndex > -1) {
            user.cartItems[existingItemIndex].quantity += item.quantity || 1;
        } else {
            user.cartItems.push({
                itemId: item.itemId,
                name: item.name,
                price: item.price,
                photo: item.photo,
                quantity: item.quantity || 1
            });
        }
        await user.save();
        return res.status(201).json({
            message: 'Item added to cart successfully.',
            cartItems: user.cartItems
        });
    } catch (error) {
        next(error);
    }
};

module.exports.fetchCartItems = async (req, res, next) => {
  try {
    const user = req.user; 
    res.status(200).json({ cartItems: user.cartItems });
  } catch (error) {
    next(error);
  }
};
module.exports.getUserOrders = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user.orders || user.orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }

        res.status(200).json({ orders: user.orders });
    } catch (error) {
        next(error);
    }
};

module.exports.deleteCartItem = async (req, res, next) => {
  try {
    const user = req.user; 
    const { itemId } = req.params;
    if (!itemId) {
      return res.status(400).json({ message: 'Item ID is required' });
    }
    user.cartItems = user.cartItems.filter(
      item => item.itemId.toString() !== itemId
    );
    await user.save();
    return res.status(200).json({
      message: 'Item removed from cart successfully',
      cartItems: user.cartItems
    });
  } catch (error) {
    next(error);
  }
};
module.exports.confirmCartAsOrder = async (req, res, next) => {
    try {
        const user = req.user;
         const { orderId } = req.body;
        
        if (!user.cartItems || user.cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty. Cannot confirm order.' });
        }
        if (!orderId) {
         return res.status(400).json({ message: 'Order ID is required.' });
       }
        user.orders.push({
            orderId: orderId || new Date().toISOString(),
            items: user.cartItems,
            orderDate: new Date(),
            status: 'Pending'
        });

        user.cartItems = [];

        await user.save();

        res.status(201).json({
            message: 'Order confirmed successfully.',
            orders: user.orders,
        });
    } catch (error) {
        next(error);
    }
};