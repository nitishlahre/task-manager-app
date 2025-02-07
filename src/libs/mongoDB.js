import mongoose from 'mongoose';

const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    return; 
  }
  const mongoUri = process.env.MONGO_URI;
  console.log(mongoUri);
  
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('db cntd');
  
};

export default connectToDatabase;
