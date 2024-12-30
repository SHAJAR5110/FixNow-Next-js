import mongoose from 'mongoose';

// Define the schema
const roleSchema = new mongoose.Schema({
  id: { type: String, required: true },
  role: { type: String, required: true },
});

// Prevent model overwriting
const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);

export default Role;
