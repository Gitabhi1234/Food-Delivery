const mongoose = require('mongoose');

const blackListTokenSchema = new mongoose.Schema({
  token: { type: String, required: true }
});

module.exports = mongoose.models.blackListToken || mongoose.model('blackListToken', blackListTokenSchema);