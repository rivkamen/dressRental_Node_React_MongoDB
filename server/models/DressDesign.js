//  const mongoose = require('mongoose');
// const dressSchema = require('./Dress');
// const Schema = mongoose.Schema;

// const dressDesignSchema = new Schema({
// name:{type:String, required:true},
// description:{type:String},
// images: { 
//     type: [String]
// }, 
// dressListSizes: [{
//     key: {type:String},
//     dresses: [dressSchema],
//     size:{type:String,
//         enum:["women", "girls"],
//         required:true

//     },
// }]})
// module.exports = mongoose.model('Dress', dressDesignSchema);

const mongoose = require('mongoose');
const dressSchema = require('./Dress');
const Schema = mongoose.Schema;

const dressDesignSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
      },
        description: { type: String },
  images: { type: [String] }, 
  dressListSizes: [{
    key: { type: String },
    size: { type: String, enum: ["women", "girls"], required: true },
    dresses: [dressSchema] // משתמשים ב-schema של השמלה
  }]
}, {
  timestamps: true
});
// const DressDesign = mongoose.model('Dress', dressDesignSchema);
// DressDesign.createIndexes(); // יצירת אינדקסים

 module.exports = mongoose.model('Dress', dressDesignSchema);
