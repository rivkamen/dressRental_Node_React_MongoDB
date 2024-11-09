const Dress = require('../models/Dress');
const DressDesign = require('../models/DressDesign');
const { v4: uuidv4 } = require('uuid');

/************************************************************************************************** */

const createDressDesign = async (req, res) => {
  const { name, description, imageUrl, dressListSizes } = req.body;
console.log("here");

  if (!name || !dressListSizes) {
    console.log("0");

    return res.status(400).json({ message: 'Required field is missing' });
  }
  console.log("1");

  const imageUrll = imageUrl ? req.file.path : null;

  try {
    console.log("2");

    const updatedDressListSizes = dressListSizes.map(sizeEntry => {
      console.log(sizeEntry);
      
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
    // בדיקת שגיאה של ייחודיות על השדה name
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
      return res.status(400).json({ message: "Dress design name must be unique" });
    }

    return res.status(400).json({ message: "Failed to create dress design", error: error.message });
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
    console.log(dress);
    
    if (!dress) {
      console.log("not dress");

      return res.status(404).json({ message: "Dress design not found" });
      
    }

    // אם יש שם חדש לעדכון, נוודא שהשם לא קיים כבר בעיצוב אחר
    if (name && name !== dress.name) {
      console.log("1");

      const existingDress = await DressDesign.findOne({ name }).exec();
      if (existingDress) {
        console.log("3");
        
        return res.status(400).json({ message: "Dress design name must be unique" });
      }
      dress.name = name; // עדכון השם לאחר אימות ייחודיות
    }

    // עדכון שדות אחרים אם נשלחו
    if (description) dress.description = description;
    if (imageUrl) dress.images = imageUrl;

    // עדכון רשימת המידות והשמלות
    if (dressListSizes) {
      console.log("4");

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
    console.log("2");

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
// const addDressToDesign = async (req, res) => {
//   const { _id } = req.params; // Design ID
//   const { size, dress } = req.body; // Dress size and dress details

//   try {
//     const dressDesign = await DressDesign.findById(_id).exec();
//     if (!dressDesign) {
//       return res.status(404).json({ message: "Dress design not found" });
//     }

//     const sizeEntry = dressDesign.dressListSizes.find(entry => entry.size === size);
    
//     if (sizeEntry) {
//       // Add the dress to the list of dresses for this size
//       sizeEntry.dresses.push(dress);
//     } else {
//       // If size doesn't exist, add a new size entry
//       dressDesign.dressListSizes.push({
//         size: size,
//         dresses: [dress],
//       });
//     }

//     await dressDesign.save();
//     return res.status(200).json({
//       success: true,
//       message: `Dress added to ${size} size list in design ${dressDesign.name}`,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: "Failed to add dress to design", error: error.message });
//   }
// };

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


// const deleteDressFromDesign = async (req, res) => {
//   const { _id } = req.params; // Dress Design ID
//   const { size, dressId,barcode } = req.body; // Dress size and dress barcode or ID

//   try {
//     // Find the dress design by ID
//     const dressDesign = await DressDesign.findById(_id).exec();
//     if (!dressDesign) {
//       return res.status(404).json({ message: "Dress design not found" });
//     }

//     // Find the size entry in dressListSizes
//     const sizeEntry = dressDesign.dressListSizes.find(entry => entry.size === size);
//     if (!sizeEntry) {
//       return res.status(404).json({ message: "Size not found in the design" });
//     }

//     // Find the index of the dress to be deleted in the dresses array
//     const dressIndex = sizeEntry.dresses.findIndex(dress => dress._id.toString() === dressId || dress.barcode === barcode);

//     if (dressIndex === -1) {
//       return res.status(404).json({ message: "Dress not found in the selected size" });
//     }

//     // Remove the dress from the dresses array
//     sizeEntry.dresses.splice(dressIndex, 1);

//     // Save the updated dress design
//     await dressDesign.save();

//     return res.status(200).json({
//       success: true,
//       message: `Dress deleted successfully from size ${size} in design ${dressDesign.name}`,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: "Failed to delete the dress", error: error.message });
//   }
// };
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
console.log("hi");
console.log(key, chosenDate,userId);

  try {

    if (!userId) {
      console.log("0");

      return res.status(401).json({ message: "Unauthorized: User ID is required" });
    }
    console.log("1");

    // Find the dress design by ID
    const dressDesign = await DressDesign.findById(_id).exec();
    if (!dressDesign) {
      console.log("2");


      return res.status(404).json({ message: "Dress design not found" });
    }

    // Find the size entry in dressListSizes using the key instead of size
    const sizeEntry = dressDesign.dressListSizes.find(entry => entry.key === key);
    if (!sizeEntry) {
      console.log("3");

      return res.status(404).json({ message: "Key not found in the design" });
    }

    // Convert chosenDate to a Date object
    const chosenDateObj = new Date(chosenDate);
    if (isNaN(chosenDateObj)) {
      console.log("4");

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
console.log("succ");

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

// const returnDress = async (req, res) => {
//   const { _id } = req.params; // Dress Design ID
//   const { size, returnDate } = req.body; // Size and the date to return the dress

//   try {
//     // Find the dress design by ID
//     const dressDesign = await DressDesign.findById(_id).exec();
//     if (!dressDesign) {
//       return res.status(404).json({ message: "Dress design not found" });
//     }

//     // Find the size entry in dressListSizes
//     const sizeEntry = dressDesign.dressListSizes.find(entry => entry.size === size);
//     if (!sizeEntry) {
//       return res.status(404).json({ message: "Size not found in the design" });
//     }

//     // Convert returnDate to a Date object
//     const returnDateObj = new Date(returnDate);
//     if (isNaN(returnDateObj)) {
//       return res.status(400).json({ message: "Invalid date provided" });
//     }

//     // Find the dress that has the return date in renteDates
//     for (let dress of sizeEntry.dresses) {
//       const rentIndex = dress.renteDates.findIndex(date => new Date(date).getTime() === returnDateObj.getTime());

//       if (rentIndex !== -1) {
//         // Remove the rented date from renteDates
//         dress.renteDates.splice(rentIndex, 1);
//         await dressDesign.save();

//         return res.status(200).json({
//           success: true,
//           message: `Dress successfully returned for the date ${returnDate}`,
//         });
//       }
//     }

//     // No dress was rented on the specified date
//     return res.status(404).json({
//       success: false,
//       message: `No rented dresses found for size ${size} on ${returnDate}`,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error returning dress",
//       error: error.message,
//     });
//   }
// };
const returnDress = async (req, res) => {
  const { _id } = req.params; // Dress Design ID
  const { size, returnDate, userId } = req.body; // Add userId to the request body

  try {
    const dressDesign = await DressDesign.findById(_id).exec();
    if (!dressDesign) {
      return res.status(404).json({ message: "Dress design not found" });
    }

    const sizeEntry = dressDesign.dressListSizes.find(entry => entry.size === size);
    if (!sizeEntry) {
      return res.status(404).json({ message: "Size not found in the design" });
    }

    const returnDateObj = new Date(returnDate);
    if (isNaN(returnDateObj)) {
      return res.status(400).json({ message: "Invalid date provided" });
    }

    for (let dress of sizeEntry.dresses) {
      const rentIndex = dress.renteDates.findIndex(
        rent => new Date(rent.date).getTime() === returnDateObj.getTime() && rent.userId.toString() === userId
      );

      if (rentIndex !== -1) {
        dress.renteDates.splice(rentIndex, 1); // Remove the rent entry
        await dressDesign.save();

        return res.status(200).json({
          success: true,
          message: `Dress successfully returned for the date ${returnDate} by user ${userId}`,
        });
      }
    }

    return res.status(404).json({
      success: false,
      message: `No rented dresses found for size ${size} on ${returnDate}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error returning dress",
      error: error.message,
    });
  }
};
// const getAvailableKeysForDate = async (req, res) => {
//   const { _id } = req.params; // Dress Design ID
//   const { chosenDate } = req.body; // Date to check availability

//   try {
//     // Find the dress design by ID
//     const dressDesign = await DressDesign.findById(_id).exec();
//     if (!dressDesign) {
//       return res.status(404).json({ message: "Dress design not found" });
//     }

//     // Convert chosenDate to a Date object
//     const chosenDateObj = new Date(chosenDate);
//     if (isNaN(chosenDateObj)) {
//       return res.status(400).json({ message: "Invalid date provided" });
//     }

//     const availableKeys = [];

//     // Iterate through each size entry in dressListSizes
//     for (const sizeEntry of dressDesign.dressListSizes) {
//       const { key, dresses } = sizeEntry;

//       // If there are only two dresses for this key, we return key -1
//       if (dresses.length === 2) {
//         availableKeys.push(key - 1);
//         continue; // No need to check the availability of dresses for this key
//       }

//       // Check if any dress in this sizeEntry is available on the chosenDate
//       let isAvailable = false;
//       for (const dress of dresses) {
//         let conflictFound = false;

//         for (const rent of dress.renteDates) {
//           const rentDateObj = new Date(rent.date);

//           // Check if there is a conflicting rental date (+/- 7 days)
//           if (Math.abs(chosenDateObj - rentDateObj) <= 7 * 24 * 60 * 60 * 1000) {
//             conflictFound = true;
//             break; // If a conflict is found, we skip this dress
//           }
//         }

//         // If no conflict was found, mark the key as available
//         if (!conflictFound) {
//           isAvailable = true;
//           break; // We found at least one available dress, so we stop checking further dresses
//         }
//       }

//       // If any dress in the current key is available, add the key to the available list
//       if (isAvailable) {
//         availableKeys.push(key);
//       }
//     }

//     // Return the list of available keys
//     return res.status(200).json({
//       success: true,
//       availableKeys,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error retrieving available keys",
//       error: error.message,
//     });
//   }
// };

const getAvailableKeysForDate = async (req, res) => {
  const { _id } = req.params; // Dress Design ID
  const { chosenDate } = req.query; // Desired date for availability check
console.log("hi");
console.log(chosenDate);
console.log(_id);



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

module.exports = {createDressDesign,getDressesDesign,getDressDesignById,updateDressDesign,deleteDressDesign,deleteDressFromDesign,addDressToDesign,takeDress,returnDress,getAvailableKeysForDate}