const { makePayment, createPayment, createCustomer } = require('./checkout.service');
const { updateUser } = require('../users/users.service');

async function handlerCheckout(req, res) {
  const { paymentMethod, amount } = req.body;
  try {
    const customer = await createCustomer(req.user, paymentMethod);
    const userToUpdate = {
      payment: {
        customerId: customer.id,
        cards: [paymentMethod.card],

      },
    };
    await updateUser(req.user._id, userToUpdate);
    const payment = await makePayment({ paymentMethod, amount, customer });
    const registeredPayment = {
      refId: payment.id,
      description: payment.description,
      value: payment.amount,
      currency: payment.currency,
      userId: req.user._id,
    };

    await createPayment(registeredPayment);

    res.json(payment);
  } catch (error) {
    res.status(500).json(error.message);
  }
}
module.exports = {
  handlerCheckout,
};
