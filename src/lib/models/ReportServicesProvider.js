import mongoose from 'mongoose';

// Define the schema for the Report model
const reportSchema = new mongoose.Schema(
  {
    ID:{
        type: String,
        required: true,
    },
    ReportID: {
      type: String,
      required: true,
    },
    complaint: {
      type: String,
      required: true,
      minlength: 10, 
    },
    reportedAt: {
      type: Date,
      default: Date.now, 
    },
  },
  {
    timestamps: true, 
  }
);


const ReportService = mongoose.models.ReportService || mongoose.model('ReportService', reportSchema);

export default ReportService;
