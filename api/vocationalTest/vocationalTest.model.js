const mongoose = require('mongoose');

const TestsTableSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: String,
  state: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

TestsTableSchema.methods.toJSON = function () {
  const testTable = this;
  const { _id, state, ...rest } = testTable.toObject();
  rest.id = _id;
  return rest;
};

module.exports = mongoose.model('TestsTable', TestsTableSchema);
