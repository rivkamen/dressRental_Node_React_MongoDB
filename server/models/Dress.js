const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const dressSchema = new mongoose.Schema({
  barcode: {
    type: String,
    default: () => uuidv4(),
    unique: true
  },
  renteDates: {
    type: [{
      date: { type: Date, required: true },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      status: { type: String, enum: ["rent","active","returned"],default:"rent"} // שדה חדש לאיתור האם ההזמנה הוחזרה
    }],
    default: [] // ערך ברירת מחדל: מערך ריק
  }
}, {
  timestamps: true
});

module.exports = dressSchema;
