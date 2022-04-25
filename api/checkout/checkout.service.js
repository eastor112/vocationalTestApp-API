const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function makePayment({ paymentMethod, amount }) {
  const { id } = paymentMethod;

  try {
    const payment = stripe.paymentIntents.create({
      payment_method: id,
      amount,
      currency: 'usd',
      confirm: true,
      description: 'Vocational Test payment',
    });

    return payment;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

module.exports = {
  makePayment,
};
