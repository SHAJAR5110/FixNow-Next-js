import { disconnectFromDatabase } from '../../../lib/mongoose';
import connectToDatabase from '../../../lib/mongoose';
import ReportClient from '../../../lib/models/ReportClient';
import ReportServiceProvider from '../../../lib/models/ReportServicesProvider';

export async function POST(req) {
  try {
    const { role, ID, ReportID, complaint } = await req.json(); // Use await req.json() to parse JSON body

    // Step 1: Connect to the database
    await connectToDatabase();

    if (role === 'client') {
      // Step 2: Create a new report document for clients
      const newReport = new ReportClient({
        ID,
        ReportID,
        complaint,
        reportedAt: new Date(),
      });

      await newReport.save();
    } else if (role === 'serviceprovider') {
      // Step 3: Create a new report document for service providers
      const newReport = new ReportServiceProvider({
        ID,
        ReportID,
        complaint,
        reportedAt: new Date(),
      });

      await newReport.save();
    }

    // Return a success response
    return new Response(
      JSON.stringify({ message: 'Report submitted successfully!' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting report:', error);

    // Return an error response
    return new Response(
      JSON.stringify({ message: 'Failed to submit the report.' }),
      { status: 500 }
    );
  } finally {
    // Step 4: Disconnect from the database
    await disconnectFromDatabase();
  }
}


