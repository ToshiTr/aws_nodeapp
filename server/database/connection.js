const mongoose = require('mongoose');

const connectDB = async() => {
   try{
    //mongodb connection string
    const connection = await mongoose.connect(process.env.MONGO_URI,{
      
    })

    console.log(`MONGODB connected ${connection.connection.host}`);

   }catch(err){
      console.log(err);
      process.exit(1);
   }
}

module.exports = connectDB