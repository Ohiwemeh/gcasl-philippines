const mongoose = require('mongoose');

const withdrawalCodeSchema = new mongoose.Schema({
  code: { type: String, required: true },
  used: { type: Boolean, default: false }, // ← THIS IS REQUIRED
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WithdrawalCode', withdrawalCodeSchema);
