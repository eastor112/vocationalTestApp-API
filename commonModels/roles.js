const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  rol: {
    type: String,
    required: [true, 'rol is required'],
  },
});

module.exports = mongoose.model('Role', RoleSchema);
