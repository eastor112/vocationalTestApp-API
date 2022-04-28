const { makePayment, createPayment } = require('./checkout.service');

async function handlerCheckout(req, res) {
  const { paymentMethod, amount } = req.body;
  try {
    const payment = await makePayment({ paymentMethod, amount });
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
