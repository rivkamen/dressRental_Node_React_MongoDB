const Dress = require('../models/Dress');
const DressDesign = require('../models/DressDesign');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');

const getRentalHistory  = async (req, res) => {
    try {
      const dresses = await DressDesign.find().populate({
        path: 'dressListSizes.dresses.renteDates.userId', // מבצע populate על ה-userId בתאריכים
        select: 'name phone' // בוחר להחזיר את שם המשתמש והטלפון
      }).lean();
  
      if (!dresses || dresses.length === 0) {
        return res.status(404).json({ message: "No dresses found" });
      }
  
      let rentalData = [];
  
      for (let dress of dresses) {
        for (let size of dress.dressListSizes) {
          for (let dressItem of size.dresses) {
            if (dressItem.renteDates && dressItem.renteDates.length > 0) {
              for (let rent of dressItem.renteDates) {
                if (rent.userId) {
                  rentalData.push({
                    id: dress._id,
                    userId: rent.userId._id,
                    userName: rent.userId.name,
                    userPhone: rent.userId.phone,
                    dressName: dress.name,
                    dressId: dressItem._id,
                    dressSize: size.key,
                    rentalDate: rent.date,
                    status: rent.status,
                    isCurrent: !rent.isReturned // true אם ההשכרה נוכחית
                  });
                } else {
                  console.log("User not found for userId:", rent.userId); // לוג אם לא נמצא userId
                }
              }
            }
          }
        }
      }
  
      if (rentalData.length === 0) {
        return res.status(404).json({ message: "No rental dates found" });
      }
  
      return res.status(200).json(rentalData);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  module.exports = {getRentalHistory}
  