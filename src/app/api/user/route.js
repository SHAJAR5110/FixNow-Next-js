import { IncomingForm } from 'formidable';
import fs from 'fs/promises';
import path from 'path';
import connectToDatabase from '../../../lib/mongoose';
import { disconnectFromDatabase } from '../../../lib/mongoose';
import Client from '../../../lib/models/Client';
import ServiceProvider from '../../../lib/models/ServiceProvider';
import Role from '@/lib/models/Role';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public/uploads');
(async () => {
  try {
    await fs.access(uploadDir);
  } catch (error) {
    await fs.mkdir(uploadDir, { recursive: true });
  }
})();

const parseForm = (req) => {
  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 20 * 1024 * 1024, // 20 MB limit
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};


export  async function POST(req, res) {
  
  try {
    const { fields, files } = await parseForm(req);
  
    console.log('Fields:', fields);
    console.log('Files:', files);
  
    const {
      username,
      email,
      phone,
      cnic,
      dob,
      address1,
      address2,
      city,
      experience,
      services,
      Role,
      status,
    } = fields;
  
    const frontCnicImage = files.frontCnicImage ? `/uploads/${path.basename(files.frontCnicImage.filepath)}` : null;
    const backCnicImage = files.backCnicImage ? `/uploads/${path.basename(files.backCnicImage.filepath)}` : null;
  
    if (
      !username ||
      !email ||
      !phone ||
      !cnic ||
      !dob ||
      !address1 ||
      !address2 ||
      !city ||
      !Role
    ) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
  
    await connectToDatabase();
  
    if (Role === 'client') {
      const newClient = new Client({
        username,
        email,
        phone,
        cnic,
        dob,
        address1,
        address2,
        city,
        experience,
        services,
        frontCnicImage,
        backCnicImage,
        status: status || false,
      });
      await newClient.save();
    } else if (Role === 'serviceprovider') {
      const newServiceProvider = new ServiceProvider({
        username,
        email,
        phone,
        cnic,
        dob,
        address1,
        address2,
        city,
        experience,
        frontCnicImage,
        backCnicImage,
        status: status || false,
      });
      await newServiceProvider.save();
    } else {
      return res.status(400).json({ success: false, message: 'Invalid role type' });
    }
  
    await disconnectFromDatabase();
  
    return res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    console.error('Error processing request:', error);
  
    // Handle file size error
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ success: false, message: 'File size exceeds the limit of 5 MB' });
    }
  
    return res.status(500).json({ success: false, message: 'Error processing request' });
  }
 
}


export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch data from the database
    const clients = await Client.find();
    console.log("Client Data..!", clients);

    const serviceProviders = await ServiceProvider.find();
    console.log("Service Provider Data..!", serviceProviders);

    // Return the data in the correct format
    return new Response(
      JSON.stringify({ success: true, serviceProviders, clients }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching data:", error);

    // Return an error response
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } 
}



