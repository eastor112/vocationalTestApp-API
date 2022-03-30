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
    default: 'STUDENT',
    enum: ['ADMIN', 'INSTITUTION', 'STUDENT'],
    required: true,
  },
  profile: String,
  address: {
    country: String,
    city: String,
    geo: {
      lat: String,
      lng: String,
    },
  },
  phone: String,
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'University',
  },
});

module.exports = mongoose.model('User', UserSchema);
