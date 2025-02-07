import mongoose from 'mongoose';

const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    return; 
  }
  const mongoUri = process.env.MONGO_URI;
  
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectToDatabase;
