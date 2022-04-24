const { toLocalTime } = require('./dates');

const reportEmailTemplate = (userEmail, testResult) => ({
  from: 'no reply <emerar.mct@gmail.com>',
  to: userEmail,
  subject: 'Vocational test report',
  template_id: process.env.EMAIL_TEMPLATE_ID_RESULTS,
  dynamic_template_data: {
    title: `${testResult.test.title}`,
    date: `${toLocalTime(testResult.createdAt)}`,
    a: `${testResult.answers.A}`,
    b: `${testResult.answers.B}`,
    c: `${testResult.answers.C}`,
    d: `${testResult.answers.D}`,
    principal_careers: `${testResult.test.results[testResult.firstOption].join(', ')}`,
    secondary_careers: `${testResult.test.results[testResult.secondOption].join(', ')}`,
  },
});

const activateEmailTemplate = (userEmail, passResetToken) => ({
  from: 'no reply <emerar.mct@gmail.com>',
  to: userEmail,
  subject: 'Activate your account',
  template_id: process.env.EMAIL_TEMPLATE_ID_ACTIVATE,
  dynamic_template_data: {
    url: `${process.env.NODE_ENV === 'develop'
      ? process.env.BASE_URL_DEV
      : process.env.BASE_URL_PROD}/activate/${passResetToken}`,
  },
});

module.exports = {
  reportEmailTemplate,
  activateEmailTemplate,
};
