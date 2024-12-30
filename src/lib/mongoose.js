const mongoose = require('mongoose');


export default async function connectToDatabase() {
  const uri = process.env.MONGO_URL;
  try {
    await mongoose.connect(uri).then((result)=>{
      
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error; 
  }
}


export const disconnectFromDatabase = async () => {
  try {
    await mongoose.disconnect();
    
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error.message);
    throw error;
  }
};