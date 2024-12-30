import connectToDatabase from '../../../lib/mongoose';
import Role from '../../../lib/models/Role';
import { disconnectFromDatabase } from '../../../lib/mongoose';

export async function POST(req) {
  try {
    const { userId, role } = await req.json();

    if (!userId || !role) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing userId or role in request body' }),
        { status: 400 }
      );
    }

    
    await connectToDatabase();
    const newRole = new Role({ id: userId, role });

    await newRole.save();

    return new Response(
      JSON.stringify({ success: true, message: 'User Created.!' }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating role:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error creating role' }),
      { status: 500 }
    );
  } finally {
    await disconnectFromDatabase(); } }


    

export async function GET(req) {
  const userId = req.nextUrl.searchParams.get('userId'); // Fetch the userId from query params
  console.log("userId inside the api"+userId);
  try {
    await connectToDatabase(); // Connect to the database

    if (userId) {
      // If userId is provided, fetch the role data for that user
      const roleData = await Role.findOne({ id: userId });
      console.log("roleData inside the api"+roleData);
      if (!roleData) {
        return new Response(
          JSON.stringify({ success: false, message: 'User not found or role missing' }),
          { status: 404 }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          role: roleData.role, // Return the role of the specific user
        }),
        { status: 200 }
      );
      
    } else {
      // If no userId is provided, return all role data
      const allRoles = await Role.find(); // Fetch all data from the Role table
      console.log("All role inside the api"+allRoles);
      if (allRoles.length === 0) {
        return new Response(
          JSON.stringify({ success: false, message: 'No roles found in the database' }),
          { status: 404 }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          roles: allRoles, // Return all role data
        }),
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error during role fetching:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Server error while fetching role' }),
      { status: 500 }
    );
  } 
}
