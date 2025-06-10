const partnerModel = require('../models/partner.model');


module.exports.createPartner = async ({
    firstname, lastname, email, password, color, plate,vehicleType
}) => {
    if (!firstname || !email || !password || !color || !plate || !vehicleType) {
        throw new Error('All fields are required');
    }
    const partner = partnerModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            vehicleType
        }
    })

    return partner;
}