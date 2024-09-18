//  const mongoose = require('mongoose');
//  const Schema = mongoose.Schema;

// // const { v4: uuidv4 } = require('uuid');

// // const dressSchema = new Schema({


// //   barcode: {
// //         type: String,
// //         default: uuidv4,
// //         unique: true  
// //   },

// //   renteDates: { 
// //           type: [Date]
// //   }         
// // },
    
// // {
// //     timestamps:true
// //     });
// // module.exports=dressSchema

// const { v4: uuidv4 } = require('uuid');

// const dressSchema = new mongoose.Schema({
//   barcode: {
//     type: String,
//     default: () => uuidv4(), // וודא שה-uuid נוצר בצורה תקינה באמצעות פונקציה
//     unique: true
//   },
//   renteDates: { 
//     type: [Date],
//     default: [] // ברירת מחדל לרשימת תאריכים ריקה
//   }
// }, {
//   timestamps: true
// });

// module.exports = dressSchema;
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Schema = mongoose.Schema;

const dressSchema = new mongoose.Schema({
  barcode: {
    type: String,
    default: () => uuidv4(),
    unique: true
  },
  // renteDates: [{
  //   date: { type: Date, required: true },
  //   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Added userId field to associate the rent with a user
  // }]
  renteDates: { 
    type: [{
      date: { type: Date, required: true },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    }],
    default: [] // Set the default value to an empty array
  }
}, {
  timestamps: true
});

module.exports = dressSchema;
