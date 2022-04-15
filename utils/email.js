const sgMail = require('@sendgrid/mail');

const sendMailWithSengrid = async (msg) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  return sgMail.send(msg);
};

module.exports = {
  sendMailWithSengrid,
};
