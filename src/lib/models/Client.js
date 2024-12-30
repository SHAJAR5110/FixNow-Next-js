const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  cnic: { type: String, required: true },
  dob: { type: Date, required: true },
  address1: { type: String, required: true },
  address2: { type: String, required: true },
  city: { type: String, required: true },
  experience: { type: String, required: true },
  certifications: { type: Number, required: true },
  frontCnicImage: { type: String },
  backCnicImage: { type: String },
  status: { type: Boolean, default: false },
});

// Correct the model registration logic
const Client = mongoose.models.Client || mongoose.model('Client', clientSchema);

module.exports = Client;
