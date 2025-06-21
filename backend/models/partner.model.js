const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  photo: String,
  available: { type: Boolean, default: true }
});


const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  cartItems: { type: Array, required: true },
  totalPrice: { type: Number, required: true },
  selectedLocation: { type: String, required: true },
 
  status: { 
    type: String, 
    enum: ['Pending', 'Accepted', 'Rejected'], 
    default: 'Pending' 
  },
  createdAt: { type: Date, default: Date.now },
});

const partnerSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, 'firstname must be at least 3 characters'],
    },
    lastname: {
      type: String,
      required: false,
      minlength: [3, 'lastname must be at least 3 characters'],
    },
  
  },
    hotelname: {
      type: String,
      required: false,
      minlength: [3, 'hotelname must be at least 3 characters'],
    },
    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [6, 'password must be at least 6 characters'],
  },

  socketId: String,
  items: [itemSchema], 
  orders: [orderSchema], 
});

partnerSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

partnerSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

partnerSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const partnerModel = mongoose.model('partner', partnerSchema);
module.exports = partnerModel;