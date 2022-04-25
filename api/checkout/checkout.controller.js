const { makePayment } = require('./checkout.service');

async function handlerCheckout(req, res) {
  const { paymentMethod, amount } = req.body;
  try {
    const payment = await makePayment({ paymentMethod, amount });
    res.json(payment);
  } catch (error) {
    res.status(500).json(error);
  }
}
module.exports = {
  handlerCheckout,
};
