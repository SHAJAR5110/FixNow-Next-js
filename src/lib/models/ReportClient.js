import mongoose from 'mongoose';

// Define the schema for the Report model
const reportSchema = new mongoose.Schema(
  {
    ID:{
        type: String,
        required: true,
    },
    ReportID: {
      type: String, // assuming userId is a string (it could also be ObjectId if linked to a User model)
      required: true,
    },
    complaint: {
      type: String,
      required: true,
      minlength: 10, // Optional: Minimum length for the complaint
    },
    reportedAt: {
      type: Date,
      default: Date.now, // Automatically sets the report date to the current time
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create the Report model based on the schema
const ReportClient = mongoose.models.ReportClient || mongoose.model('ReportClient', reportSchema);

export default ReportClient;
