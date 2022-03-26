const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  names: String,
  fatherName: String,
  motherName: String,
  username: String,
  password: {
    type: String,
    required: true,
  },
  email: {
    required: true,
    type: String,
  },
  role: {
    type: String,
    default: 'guest',
  },
  profile: String,
  address: {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: {
      lat: String,
      lng: String,
    },
  },
  phone: String,
  website: String,
  company: {
    name: String,
    catchPhrase: String,
    bs: String,
  },
});

module.exports = mongoose.model('User', UserSchema);
