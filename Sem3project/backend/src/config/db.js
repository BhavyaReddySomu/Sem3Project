import mongoose from 'mongoose'
// require('dotenv').config();

const connecttoDB=async()=>{
    try{
        await mongoose.connect(process.env.DBCONNECT);
        console.log('DB is connected');
    }
    catch(error){
        console.log('Error in connecting',error);
    }
}
export default connecttoDB;