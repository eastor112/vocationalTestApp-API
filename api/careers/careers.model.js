const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
  names: String,
  description: String,
  field: {
    description: String,
    list: Array,
    references: String,
  },
  skills: {
    description: String,
    list: Array,
    references: Array,
  },

});

module.exports = mongoose.model('Career', CareerSchema);
