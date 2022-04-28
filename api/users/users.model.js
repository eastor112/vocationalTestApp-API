const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  names: {
    type: String,
    default: '',
  },
  fatherName: {
    type: String,
    default: '',
  },
  motherName: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  role: {
    type: String,
    default: 'STUDENT',
    enum: ['ADMIN', 'INSTITUTION', 'STUDENT'],
  },
  profile: {
    type: String,
    default: '',
  },
  history: [mongoose.Schema.Types.ObjectId],
  premium: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'INACTIVE',
  },
  address: {
    country: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    geo: {
      lat: {
        type: String,
        default: '',
      },
      lng: {
        type: String,
        default: '',
      },
    },
  },
  phone: {
    type: String,
    default: '',
  },
  cardNumber: {

  },
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'University',
  },
  state: {
    type: Boolean,
    default: false,
  },
  google: {
    type: Boolean,
    default: false,
  },
  passResetToken: {
    type: String,
    default: null,
  },
  passResetExpires: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
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

UserSchema.pre('findOneAndUpdate', async function (next) {
  if (this.getUpdate()) {
    const user = this;
    const modifiedPassword = user.getUpdate().password;
    if (modifiedPassword) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(modifiedPassword, salt);

        user.getUpdate().password = hash;
        return next();
      } catch (error) {
        return next(error);
      }
    }
  }
  return next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  try {
    return await bcrypt.compareSync(candidatePassword, user.password);
  } catch (error) {
    return error;
  }
};

UserSchema.methods.toJSON = function () {
  const user = this;
  /* eslint-disable */
  const { password, _id, __v, state, ...rest } = user.toObject();
  rest.uid = _id;
  /* eslint-enable */

  return rest;
};

UserSchema.virtual('public').get(function () {
  const user = this;
  const {
    _id, names, fatherName, motherName, username, role, email, university,
  } = user;

  return {
    uid: _id,
    names,
    fatherName,
    motherName,
    username,
    role,
    email,
    university,
  };
});

module.exports = mongoose.model('User', UserSchema);
