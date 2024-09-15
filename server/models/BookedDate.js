const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookedDateSchema = new Schema({
  dress: { 
          type: Schema.Types.ObjectId, 
          ref: 'Dress', 
          required: true },
  date: { 
          type: Date,
          required: true },
  user: { 
          type: Schema.Types.ObjectId, 
          ref: 'User', 
          required: true 
        }
},
    
{
    timestamps:true
    });

module.exports = mongoose.model('BookedDate', bookedDateSchema);
