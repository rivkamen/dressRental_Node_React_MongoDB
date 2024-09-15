const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { v4: uuidv4 } = require('uuid');

const dressSchema = new Schema({


  // barcode: {
  //       type: String,
  //       default: uuidv4,
  //       unique: true  
  // },

  renteDates: { 
          type: [Date]
  }         
},
    
{
    timestamps:true
    });
module.exports=dressSchema

