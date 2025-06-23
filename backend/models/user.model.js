const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
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
    socketId: { type: String },
    cartItems: [
        {
            itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            photo: { type: String },
            quantity: { type: Number, default: 1 },
        },
    ],
    orders: [
        {
           orderId: { type: String, required: true },       
            items: [
                {
                    itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
                    name: { type: String, required: true },
                    price: { type: Number, required: true },
                    photo: { type: String },
                    quantity: { type: Number, default: 1 },
                },
            ],
            orderDate: { type: Date, default: Date.now },
            status: {
                type: String,
                enum: ['Pending', 'Accepted', 'Rejected'],
                default: 'Pending',
            },
        },
    ],
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};

userSchema.methods.comparePasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;