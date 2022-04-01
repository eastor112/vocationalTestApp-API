/* eslint-disable camelcase */
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleVerify(token = '') {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { email, family_name, given_name, picture } = ticket.getPayload();

  return {
    email,
    names: given_name,
    fatherName: family_name.split(' ')[0],
    motherName: family_name.split(' ')[1],
    profile: picture,
  };
}

module.exports = googleVerify;
