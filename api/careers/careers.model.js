const mongoose = require('mongoose');

const CareersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  field: {
    description: {
      type: String,
    },
    list: [String],
    references: [String],
  },
  skills: {
    description: {
      type: String,
    },
    list: [String],
    references: [String],
  },
  photo: {
    type: String,
    default: '',
  },
  state: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

CareersSchema.methods.toJSON = function () {
  const career = this;
  const { _id, __v, state, ...rest } = career.toObject();
  rest.id = _id;

  return rest;
};

module.exports = mongoose.model('Career', CareersSchema);
