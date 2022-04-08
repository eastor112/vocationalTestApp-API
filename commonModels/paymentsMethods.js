const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['CREDIT CARD', 'DEBIT CARD', 'PAYPAL'],
    required: true,
  },
});

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);
