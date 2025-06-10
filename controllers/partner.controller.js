const partnerModel = require('../models/partner.model');
const partnerService = require('../services/partner.service');
const blackListTokenModel = require('../models/blackListToken.model');
const { validationResult } = require('express-validator');


module.exports.registerPartner = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isPartnerAlreadyExist = await partnerModel.findOne({ email });

    if (isPartnerAlreadyExist) {
        return res.status(400).json({ message: 'Partner already exist' });
    }


    const hashedPassword = await partnerModel.hashPassword(password);

    const partner = await partnerService.createPartner({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = partner.generateAuthToken();

    res.status(201).json({ token, partner });

}

module.exports.loginPartner = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const partner = await partnerModel.findOne({ email }).select('+password');

    if (!partner) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await partner.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = partner.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, partner });
}

module.exports.getPartnerProfile = async (req, res, next) => {
    res.status(200).json({ partner: req.partner });
}

module.exports.logoutPartner = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

    await blackListTokenModel.create({ token });

    res.clearCookie('token');

    res.status(200).json({ message: 'Logout successfully' });
}