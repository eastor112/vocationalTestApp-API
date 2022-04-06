const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['SURVEY', 'VOCATIONAL'],
    default: 'VOCATIONAL',
  },
  state: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

TestSchema.methods.toJSON = function () {
  const testTable = this;
  const { _id, state, __v, ...rest } = testTable.toObject();
  rest.id = _id;
  return rest;
};

module.exports = mongoose.model('Test', TestSchema);
