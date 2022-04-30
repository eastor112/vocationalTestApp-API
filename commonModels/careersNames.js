const mongoose = require('mongoose');

const careerNameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

careerNameSchema.methods.toJSON = function () {
  const career = this;
  const { _id, __v, ...rest } = career.toObject();
  rest.id = _id;

  return rest;
};

module.exports = mongoose.model('careerName', careerNameSchema);
