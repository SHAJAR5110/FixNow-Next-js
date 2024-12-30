import { disconnectFromDatabase } from '../../../lib/mongoose';
import connectToDatabase from '../../../lib/mongoose';
import Job from '../../../lib/models/Job';


export async function GET(req) {
    try {
      await connectToDatabase();
      console.log("Database connected.");
  
      const jobs = await Job.find();
      console.log("Jobs fetched:", jobs);
  
      if (!jobs || jobs.length === 0) {
        return Response.json({ message: 'No job postings found.' }, { status: 404 });
      }
  
      return Response.json({ jobs }, { status: 200 });
    } catch (error) {
      console.log('Error in API:', error.message);
      return Response.json(
        { message: 'Server error while fetching job postings.' },
        { status: 500 }
      );
    }
  }
  