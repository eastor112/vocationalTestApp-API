const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
  name: String,
  description: String,
  field: {
    description: String,
    list: Array,
    references: Array,
  },
  skills: {
    description: String,
    list: Array,
    references: Array,
  },
  photo: String,

});

module.exports = mongoose.model('Career', CareerSchema);
