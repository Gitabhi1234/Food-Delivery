const partnerModel = require('../models/partner.model');

module.exports.createPartner = async ({ firstname, lastname, email, password, hotelname }) => {
    if (!firstname || !email || !password || !hotelname ) {
        throw new Error('All fields are required');
    }
    const partner = await partnerModel.create({
        fullname: {
            firstname,
            lastname,
        },
        hotelname,
        email,
        password,
       
    });
    return partner;
};