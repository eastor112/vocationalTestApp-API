const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

UserSchema.pre('save', async function (next) {
  const user = this;
  try {
    if (!user.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  try {
    return await bcrypt.compareSync(candidatePassword, user.password);
  } catch (error) {
    return error;
  }
};

module.exports = mongoose.model('User', UserSchema);
