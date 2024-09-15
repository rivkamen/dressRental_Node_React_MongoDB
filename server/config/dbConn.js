// const mongoose=require("mongoose")

// const connectDB=async()=>{
//     try{
//         await mongoose.connect(process.env.DATABASE_URI)
//     }
//     catch(err){
//         console.error("error connecting to DB \n" + err)
//     }

// }

// module.exports=connectDB

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true, // This ensures indexes are built automatically
    });
    console.log('🔌🔌🔌Connected to the database successfully🔌🔌🔌');
  } catch (err) {
    console.error('Error connecting to the DB\n' + err);
  }
};

module.exports = connectDB;
