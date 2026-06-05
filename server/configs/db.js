import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", ()=>{console.log("DataBase Connected Successfully.")})


    let mongodbURI = process.env.MONGODB_URI;
    const projectNAME = 'resume-builder';

    if(!mongodbURI){
      throw new Error("MONGODB_URI environment variable is not set")
    }

    if(mongodbURI.endsWith('/')){
      mongodbURI = mongodbURI.slice(0 , -1)
    }

    await mongoose.connect(`${mongodbURI}/${projectNAME}`)
  } catch (error) {
    console.error("Error connecting to MongoDB:",error)
  }
}

export default connectDB;