const mongoose = require('mongoose');

const RequestEMSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  category: {
    type: String,
    required: true
  },
  summary: String,
  date_created: {
    type: Date,
    default: Date.now
  },  
  geo_location:{
      lat: String,
      lng: String
  }
});

const User = mongoose.model('RequestEM', RequestEMSchema);
module.exports = User;

