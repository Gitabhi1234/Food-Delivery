const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const partnerSchema = new mongoose.Schema({
    fullname: {
        firstname: {
          type: String,
          required: true,
          minlength:[3, 'First name must be at least 3 characters long']
        },
        lastname: {
          type: String,
          minlength: [3, 'Last name must be at least 3 characters long'],
        }
      
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        
    },
    password: {
        type: String,
        required: true,
        select: false 
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'banned'],
        default: 'active'
    },
   
    vehicle: {
       color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long']
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate number must be at least 3 characters long'],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
            default: 'motorcycle'
        }
    },
    location: {
        lat:{
            type: Number
        },
        lng:{
            type: Number
        }
    }
})

partnerSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}
partnerSchema.statics.hashPassword = async function (password) {
   return await bcrypt.hash(password, 10);
}
partnerSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const partnerModel = mongoose.model('partner', partnerSchema)
module.exports = partnerModel;