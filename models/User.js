const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  phone: String,
  address: String,
  isAdmin: Boolean,
  branch: String,
  geo_location:{
      lat: String,
      lng: String
  },
  card_info: {
        cardFName: String,
        cardLName: String,
        number: String,
        securityNumber: String,
        expDateM: String,
        expDateY: String
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;