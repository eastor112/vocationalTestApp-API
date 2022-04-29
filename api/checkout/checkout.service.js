const Stripe = require('stripe');

const Checkout = require('./checkout.model');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function createCustomer(user, paymentMethod) {
  try {
    const customer = await stripe.customers.create({
      email: user.email,
      name: `${user.names} ${user.fatherName}`,
      payment_method: paymentMethod.id,
    });

    return customer;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

async function makePayment({ paymentMethod, amount, customer }) {
  const { id } = paymentMethod;

  try {
    const payment = await stripe.paymentIntents.create({
      payment_method: id,
      amount,
      currency: 'usd',
      confirm: true,
      description: 'Vocational Test payment',
      customer: customer.id,
      // receipt_email: customer.email,
    });

    return payment;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

function createPayment(payment) {
  return Checkout.create(payment);
}

module.exports = {
  createCustomer,
  makePayment,
  createPayment,
};
