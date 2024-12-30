import { disconnectFromDatabase } from '../../../lib/mongoose';
import connectToDatabase from '../../../lib/mongoose';
import Job from '../../../lib/models/Job';

export async function POST(req) {
    try {
      // Parse request body (for Next.js 13+)
      const body = await req.json();
        
      const { id, name, jobTitle, city, fulladdress, workingHours, expireDate, description } = body;
  
      // Validate required fields
      if (!id || !name || !jobTitle || !city || !expireDate || !workingHours || !description || !fulladdress) {
        return new Response(
          JSON.stringify({ message: 'All fields are required' }),
          { status: 400 }
        );
      }
  
      // Additional Validation for `workingHours`
      if (isNaN(workingHours) || workingHours > 15) {
        return new Response(
          JSON.stringify({ message: 'Working hours must be a number between 2 and 15.' }),
          { status: 400 }
        );
      }
  
      // Connect to database
      await connectToDatabase();
    
      const existingPosts = await Job.find({ name: name }).countDocuments();

    // Step 3: If the user has already posted 5 jobs, return an error
    if (existingPosts >= 5) {
      return res.status(400).json({ success: false, message: 'You have already posted 5 jobs' });
      
    }
      // Create and save the job
      const newJob = new Job({
        id,
        name,
        jobTitle,
        city,
        fulladdress,
        workingHours,
        expireDate,
        description,
        createdAt: new Date(),
      });
  
      const savedJob = await newJob.save();
  
      return new Response(
        JSON.stringify({
          message: 'Job posted successfully!',
          jobId: savedJob._id,
        }),
        { status: 201 }
      );
    } catch (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ message: 'Failed to post the job' }),
        { status: 500 }
      );
    } finally {
      await disconnectFromDatabase();
    }
  }
  
