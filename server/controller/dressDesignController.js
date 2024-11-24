const Dress = require('../models/Dress');
const DressDesign = require('../models/DressDesign');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
/************************************************************************************************** */
const createDressDesign = async (req, res) => {
  const { name, description, path, dressListSizes } = req.body;
  const files = req.files;

  let parsedDressListSizes;
  try {
    parsedDressListSizes = typeof dressListSizes === "string" ? JSON.parse(dressListSizes) : dressListSizes;
  } catch (error) {
    return res.status(400).json({ message: 'Invalid JSON format in dressListSizes' });
  }

  if (!Array.isArray(parsedDressListSizes)) {
    return res.status(400).json({ message: 'dressListSizes must be an array' });
  }

  if (!name || !parsedDressListSizes) {
    return res.status(400).json({ message: 'Required field is missing' });
  }
  const checkName = await DressDesign.findOne({name:name}).lean();
if(checkName)
{
  
  return res.status(409).json({ message: 'duplicate name' });

}

  const imageUrll  = files.map(file => file.path);

  
  try {
    const updatedDressListSizes = parsedDressListSizes.map(sizeEntry => {
      return {
        key: sizeEntry.key,
        size: sizeEntry.size,
        dresses: sizeEntry.dresses.map(dress => ({
          ...dress,
          // barcode: dress.barcode || uuidv4(),  
          barcode:uuidv4(),  

          renteDates: dress.renteDates || []
        }))
      };
    });

    const dress = await DressDesign.create({
      name,
      description,
      images: imageUrll,
      dressListSizes: updatedDressListSizes,
    });

    return res.status(201).json({
      success: true,
      message: `Dress design ${dress.name} created successfully`,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.barcode) {
      return res.status(400).json({ message: "Barcode must be unique for each dress" });
    }
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
      return res.status(400).json({ message: "Dress design name must be unique" });
    }

    return res.status(400).json({ message: "Failed to create dress design", error: error.message });
  }
};
const getRentedDates = async (req, res) => {

  
  try {
    const dresses = await DressDesign.find().populate({
      path: 'dressListSizes.dresses.renteDates.userId', // מבצע populate על ה-userId בתאריכים
      select: 'name phone' // בוחר להחזיר את שם המשתמש והטלפון
    }).lean();

    if (!dresses || dresses.length === 0) {
      return res.status(404).json({ message: "No dresses found" });
    }
    

    // ניצור מערך של תאריכים מושכרים
    let rentedDates = [];

    // עבור כל שמלה, נשלוף את התאריכים והמשתמשים
    for (let dress of dresses) {
  
      
      
      // עבור כל שמלה, נבדוק אם יש תאריכים מושכרים
      for (let size of dress.dressListSizes) {
        for (let dressItem of size.dresses) {
          if (dressItem.renteDates && dressItem.renteDates.length > 0) {

            for (let rent of dressItem.renteDates) {

              // בדיקה אם פרטי המשתמש קיימים
              if (rent.userId) {

                rentedDates.push({
                  id:dress._id,
                  userId:rent.userId,
                  date: rent.date,
                  userName: rent.userId.name, // שם המשתמש
                  userPhone: rent.userId.phone, // טלפון המשתמש
                  dressName: dress.name, // שם השמלה
                  dressId:dressItem._id,
                  dressSize:size.key,
                  rentalDate: rent.date, // תאריך השכרה
                  isRented: rent.isReturned,// השמלה נחשבת למושכרת אם יש תאריך השכרה,

                });
              } else {
                console.log("User not found for userId:", rent.userId); // לוג אם לא נמצא userId
              }
            }
          } else {
            console.log("No rental dates for dress barcode:", dressItem.barcode); // לוג אם אין תאריכים
            // rentedDates.push({
            //   dressName: dress.name, // שם השמלה
            //   isRented: false // השמלה לא מושכרת
            // });
          }
        }
      }
    }

    // אם לא נמצאו תאריכים מושכרים
    if (rentedDates.length === 0) {
      return res.status(404).json({ message: "No rental dates found" });
    }

    // מחזירים את כל התאריכים המושכרים
    return res.status(200).json(rentedDates);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const getDressesDesign = async (req, res) => {
  try {
    const dresses = await DressDesign.find().lean();
    if (!dresses) {
      return res.status(404).json({ message: "No dresses found" });
    }
    return res.status(200).json(dresses);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



const getDressDesignById = async (req, res) => {
  const { _id } = req.params;

  try {
    const dress = await DressDesign.findById(_id).lean();
    if (!dress) {
      return res.status(404).json({ message: "Dress design not found" });
    }
    return res.status(200).json(dress);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};




const updateDressDesign = async (req, res) => {
  const { _id } = req.params;
  const { name, description, imageUrl, dressListSizes } = req.body;

  try {

    // חיפוש העיצוב לפי ה-ID
    const dress = await DressDesign.findById(_id).exec();

    if (!dress) {
      return res.status(404).json({ message: "Dress design not found" });
    }

    // אם יש שם חדש לעדכון, נוודא שהשם לא קיים כבר בעיצוב אחר
    if (name && name !== dress.name) {

      const existingDress = await DressDesign.findOne({ name }).exec();
      if (existingDress) {
        
        return res.status(400).json({ message: "Dress design name must be unique" });
      }
      dress.name = name; // עדכון השם לאחר אימות ייחודיות
    }

    // עדכון שדות אחרים אם נשלחו
    if (description) dress.description = description;
    if (imageUrl) dress.images = imageUrl;

    // עדכון רשימת המידות והשמלות
    if (dressListSizes) {

      const updatedDressListSizes = dressListSizes.map(sizeEntry => {
        return {
          key: sizeEntry.key,
          size: sizeEntry.size,
          dresses: sizeEntry.dresses.map(dress => ({
            ...dress,
            barcode: dress.barcode || uuidv4(), // הוספת ברקוד אם אין
            renteDates: dress.renteDates || []  // ודא ש-`renteDates` לא ריק
          }))
        };
      });
      dress.dressListSizes = updatedDressListSizes;
    }


    // שמירת העדכון במסד הנתונים
    const updatedDress = await dress.save();


    return res.status(200).json({
      success: true,
      message: `Dress ${dress.name} updated successfully`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update dress design", error: error.message });
  }
};

const deleteDressDesign = async (req, res) => {
  const { _id } = req.params;

  try {
    const dress = await DressDesign.findById(_id).exec();
    if (!dress) {
      return res.status(404).json({ message: "Dress design not found" });
    }

    await dress.deleteOne();
    return res.status(200).json({ message: "Dress design deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete dress design", error: error.message });
  }
};

const addDressToDesign = async (req, res) => {
  const { _id } = req.params; // Design ID
  const { key, dress } = req.body; // Key and dress details

  try {
    const dressDesign = await DressDesign.findById(_id).exec();
    if (!dressDesign) {
      return res.status(404).json({ message: "Dress design not found" });
    }

    // Find the size entry by key
    const sizeEntry = dressDesign.dressListSizes.find(entry => entry.key === key);
    
    if (sizeEntry) {
      // Add the dress to the list of dresses for this key
      sizeEntry.dresses.push(dress);
    } else {
      // If key doesn't exist, add a new entry
      dressDesign.dressListSizes.push({
        key: key,
        size: dress.size, // Assuming the dress contains size info based on your schema
        dresses: [dress],
      });
    }

    await dressDesign.save();
    return res.status(200).json({
      success: true,
      message: `Dress added to key ${key} in design ${dressDesign.name}`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add dress to design", error: error.message });
  }
};

const deleteDressFromDesign = async (req, res) => {
  const { _id } = req.params; // Dress Design ID
  const { key, dressId, barcode } = req.body; // Search by key and dress barcode or ID

  try {
    // Find the dress design by ID
    const dressDesign = await DressDesign.findById(_id).exec();
    if (!dressDesign) {
      return res.status(404).json({ message: "Dress design not found" });
    }

    // Find the size entry in dressListSizes by key
    const sizeEntry = dressDesign.dressListSizes.find(entry => entry.key === key);
    if (!sizeEntry) {
      return res.status(404).json({ message: "Key not found in the design" });
    }

    // Find the index of the dress to be deleted in the dresses array
    const dressIndex = sizeEntry.dresses.findIndex(dress => dress._id.toString() === dressId || dress.barcode === barcode);

    if (dressIndex === -1) {
      return res.status(404).json({ message: "Dress not found in the selected key" });
    }

    // Remove the dress from the dresses array
    sizeEntry.dresses.splice(dressIndex, 1);

    // Save the updated dress design
    await dressDesign.save();

    return res.status(200).json({
      success: true,
      message: `Dress deleted successfully from key ${key} in design ${dressDesign.name}`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete the dress", error: error.message });
  }
};


const takeDress = async (req, res) => {
  const { _id } = req.params; // Dress Design ID
  const { key, chosenDate,userId } = req.body; // Key and the desired date for rent (chosenDate)


  try {

    if (!userId) {

      return res.status(401).json({ message: "Unauthorized: User ID is required" });
    }

    // Find the dress design by ID
    const dressDesign = await DressDesign.findById(_id).exec();
    if (!dressDesign) {


      return res.status(404).json({ message: "Dress design not found" });
    }

    // Find the size entry in dressListSizes using the key instead of size
    const sizeEntry = dressDesign.dressListSizes.find(entry => entry.key === key);
    if (!sizeEntry) {

      return res.status(404).json({ message: "Key not found in the design" });
    }

    // Convert chosenDate to a Date object
    const chosenDateObj = new Date(chosenDate);
    if (isNaN(chosenDateObj)) {

      return res.status(400).json({ message: "Invalid date provided" });
    }

    // Iterate through dresses to find an available one
    for (let dress of sizeEntry.dresses) {
      let isAvailable = true;

      for (let rentDate of dress.renteDates) {
        const rentDateObj = new Date(rentDate.date);

        // Check if the chosen date conflicts with an already rented date (+/- 7 days)
        if (Math.abs(chosenDateObj - rentDateObj) <= 7 * 24 * 60 * 60 * 1000) {
          isAvailable = false;
          break;
        }
      }

      // If the dress is available for the chosen date
      if (isAvailable) {
        // Add the chosenDate and userId to the dress's renteDates
        dress.renteDates.push({ date: chosenDateObj, userId });
        await dressDesign.save();

        return res.status(200).json({
          success: true,
          message: `Dress successfully rented for the date ${chosenDate}`,
          userId,
        });
      }
    }

    // No dress available for the chosen date
    return res.status(404).json({
      success: false,
      message: `No available dresses for key ${key} on ${chosenDate}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error renting dress",
      error: error.message,
    });
  }
};


const returnDress = async (req, res) => {
  const { dressId, returnDate, userPhone } = req.body;
console.log("hi im here");

  try {
    // חיפוש המשתמש לפי מספר טלפון
    const user = await User.findOne({ phone: userPhone }).exec();

    if (!user) { 
      return res.status(404).json({ message: "User with this phone number not found" });
    }

    const userId = user._id;

    // חיפוש מודל השמלות
    const dressDesign = await DressDesign.findOne({}).exec();
    console.log(dressDesign);
    
    if (!dressDesign) {
      console.log("0");
      
      return res.status(404).json({ message: "Dress design not found" });
    }

    let foundDress = null;
    let foundRentDate = null;

    // עובר על כל המידות ומחפש את השמלה לפי ה-ID
    for (let sizeEntry of dressDesign.dressListSizes) {
      foundDress = sizeEntry.dresses.find(dress => dress._id.toString() === dressId.toString());
      if (foundDress) {
        foundRentDate = foundDress.renteDates.find(rent => rent.date.toISOString() === new Date(returnDate).toISOString() && rent.userId.toString() === userId.toString());
        break;
      }
    }

    if (!foundDress) {
      return res.status(404).json({
        success: false,
        message: `Dress with ID ${dressId} not found in the design`,
      });
    }

    if (!foundRentDate) {
      return res.status(404).json({
        success: false,
        message: `No rented dress found with ID ${dressId} for user ${userId} on ${returnDate}`,
      });
    }

    // אם ההחזרה כבר התבצעה, נחזיר הודעת שגיאה
    if (foundRentDate.isReturned) {
      return res.status(400).json({
        success: false,
        message: `The dress has already been returned for the date ${returnDate}`,
      });
    }

    // עדכון סטטוס ההחזרה
    foundRentDate.isReturned = true;
    await dressDesign.save();

    return res.status(200).json({
      success: true,
      message: `Dress successfully returned for the date ${returnDate} by user ${userId}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error returning dress",
      error: error.message,
    });
  }
};


const getAvailableKeysForDate = async (req, res) => {
  const { _id } = req.params; // Dress Design ID
  const { chosenDate } = req.query; // Desired date for availability check




  try {
    // Find the dress design by ID
    const dressDesign = await DressDesign.findById(_id).exec();
    if (!dressDesign) {
      return res.status(404).json({ message: "Dress design not found" });
    }

    // Convert chosenDate to a Date object
    const chosenDateObj = new Date(chosenDate);
    if (isNaN(chosenDateObj)) {
      return res.status(400).json({ message: "Invalid date provided" });
    }

    const availableKeys = [];

    // Iterate through all size entries (keys) in dressListSizes
    for (let sizeEntry of dressDesign.dressListSizes) {
      let availableDressesCount = 0;

      // Iterate through dresses in the current key
      for (let dress of sizeEntry.dresses) {
        let isAvailable = true;

        // Check for date conflicts in renteDates
        for (let rentDate of dress.renteDates) {
          const rentDateObj = new Date(rentDate.date);

          // If there's a conflict within the +/- 7 days window
          if (Math.abs(chosenDateObj - rentDateObj) <= 7 * 24 * 60 * 60 * 1000) {
            isAvailable = false;
            break;
          }
        }

        // If the dress is available for the chosen date
        if (isAvailable) {
          availableDressesCount++;
        }
      }

      // If there's at least one dress available, add the key and count to the result
      if (availableDressesCount > 0) {
        availableKeys.push({
          key: sizeEntry.key,
          availableDresses: availableDressesCount,
        });
      }
    }

    // Return the list of available keys with their available dress count
    return res.status(200).json(availableKeys);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching available keys",
      error: error.message,
    });
  }
};
const cancelRent = async (req, res) => {
  console.log("yeyey");
  
  const { _id } = req.params; // Dress Design ID
  const { userId, date, dressId } = req.body; // User ID, date, and dress ID to identify the rental record
console.log(userId);
console.log(date);
console.log(dressId);
console.log(_id);

  try {
    // Find the dress design by ID
    const dressDesign = await DressDesign.findById(_id).exec();
    if (!dressDesign) {
      return res.status(404).json({ message: "Dress design not found" });
    }

    // Convert the provided date to a Date object
    const targetDate = new Date(date);
    if (isNaN(targetDate)) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    let rentalFound = false;

    // Iterate through the size entries in dressListSizes
    for (const sizeEntry of dressDesign.dressListSizes) {
      console.log(sizeEntry.dresses);
      
      // Find the dress by dressId in the current size
      console.log(dressId);
      
      const dress = sizeEntry.dresses.find(dress => dress._id.toString() === dressId);
      if (dress) {
        console.log("dress");
        console.log(dress);

        
        // Filter out the specific rental record from the renteDates array
        const initialLength = dress.renteDates.length;
        dress.renteDates = dress.renteDates.filter(
          rent => !(rent.userId.toString() === userId && new Date(rent.date).toISOString() === targetDate.toISOString())
        );

        // Check if a record was removed
        if (dress.renteDates.length < initialLength) {
          rentalFound = true;
          break;
        }
      }
    }

    if (!rentalFound) {
      return res.status(404).json({
        success: false,
        message: `No rental record found for dressId: ${dressId}, userId: ${userId}, and date: ${date}`,
      });
    }

    // Save the updated DressDesign
    await dressDesign.save();

    return res.status(200).json({
      success: true,
      message: `Rental record successfully canceled for dressId: ${dressId}, userId: ${userId}, and date: ${date}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error canceling rental",
      error: error.message,
    });
  }
};



module.exports = {getRentedDates,createDressDesign,getDressesDesign,getDressDesignById,updateDressDesign,deleteDressDesign,deleteDressFromDesign,addDressToDesign,takeDress,returnDress,getAvailableKeysForDate, cancelRent}