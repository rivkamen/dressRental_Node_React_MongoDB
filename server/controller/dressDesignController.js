const Dress = require('../models/Dress');
const DressDesign = require('../models/DressDesign');
const { v4: uuidv4 } = require('uuid');

/************************************************************************************************** */
// const createDressDesign = async (req, res) => {
//   console.log("1");
//   console.log("Data received:", req.body); // הוסף את השורה הזו לראות מה מועבר לשרת

//   const { name, description, imageUrl, dressListSizes } = req.body;

//   if (!name || !dressListSizes) {
//     return res.status(400).json({ message: 'Required field is missing' });
//   }
//   console.log("2");

//   const imageUrll = imageUrl ? req.file.path : null;

//   console.log("3");

//   try {
//     // עוברים על רשימת המידות ומוודאים שניתן להוסיף כמה שמלות עבור כל מידה
//     console.log("4");

//     const updatedDressListSizes = dressListSizes.map(sizeEntry => {
//       return {
//         key: sizeEntry.key,
//         size: sizeEntry.size,
//         dresses: sizeEntry.dresses // מצפים לקבל מערך של שמלות תחת כל מידה
//       };

//     });
//     // const updatedDressListSizes = dressListSizes.map(sizeEntry => {
//     //   return {
//     //     key: sizeEntry.key,
//     //     size: sizeEntry.size,
//     //     dresses: sizeEntry.dresses.map(dress => ({
//     //       ...dress,
//     //       barcode: dress.barcode || uuidv4(), // יצירת ברקוד אם חסר
//     //     }))
//     //   };
//     // });
    
//     console.log("5");

//     const dress = await DressDesign.create({
//       name,
//       description,
//       images: imageUrll,
//       dressListSizes: updatedDressListSizes,
//     });
//     console.log("6");

//     return res.status(201).json({
//       success: true,
//       message: `Dress design ${dress.name} created successfully`,
//     });
//   } catch (error) {
//     console.log("7");

//     return res.status(400).json({ message: "Failed to create dress design", error: error.message });
//   }
// };
// const createDressDesign = async (req, res) => {
//   console.log("Data received:", req.body); // הוסף את השורה הזו לראות מה מועבר לשרת
//   const { name, description, imageUrl, dressListSizes } = req.body;

//   if (!name || !dressListSizes) {
//     return res.status(400).json({ message: 'Required field is missing' });
//   }

//   const imageUrll = imageUrl ? req.file.path : null;

//   try {
//     const updatedDressListSizes = dressListSizes.map(sizeEntry => {
//       return {
//         key: sizeEntry.key,
//         size: sizeEntry.size,
//         dresses: sizeEntry.dresses.map(dress => ({
//           ...dress,
//           barcode: dress.barcode || uuidv4(), // הוספת ברקוד אם אין
//           renteDates: dress.renteDates || []  // ודא ש-`renteDates` לא ריק
//         }))
//       };
//     });

//     const dress = await DressDesign.create({
//       name,
//       description,
//       images: imageUrll,
//       dressListSizes: updatedDressListSizes,
//     });

//     return res.status(201).json({
//       success: true,
//       message: `Dress design ${dress.name} created successfully`,
//     });
//   } catch (error) {
//     console.log("Error details:", error); // הוסף את השורה הזו לראות יותר פרטים על השגיאה
//     return res.status(400).json({ message: "Failed to create dress design", error: error.message });
//   }
// };
const createDressDesign = async (req, res) => {
  const { name, description, imageUrl, dressListSizes } = req.body;

  if (!name || !dressListSizes) {
    return res.status(400).json({ message: 'Required field is missing' });
  }

  const imageUrll = imageUrl ? req.file.path : null;

  try {
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
    const dress = await DressDesign.findById(_id).exec();
    if (!dress) {
      return res.status(404).json({ message: "Dress design not found" });
    }

    if (name) dress.name = name;
    if (description) dress.description = description;
    if (imageUrl) dress.images = imageUrl;
    if (dressListSizes) dress.dressListSizes = dressListSizes;

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
  const { size, dress } = req.body; // Dress size and dress details

  try {
    const dressDesign = await DressDesign.findById(_id).exec();
    if (!dressDesign) {
      return res.status(404).json({ message: "Dress design not found" });
    }

    const sizeEntry = dressDesign.dressListSizes.find(entry => entry.size === size);
    
    if (sizeEntry) {
      // Add the dress to the list of dresses for this size
      sizeEntry.dresses.push(dress);
    } else {
      // If size doesn't exist, add a new size entry
      dressDesign.dressListSizes.push({
        size: size,
        dresses: [dress],
      });
    }

    await dressDesign.save();
    return res.status(200).json({
      success: true,
      message: `Dress added to ${size} size list in design ${dressDesign.name}`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add dress to design", error: error.message });
  }
};



const deleteDressFromDesign = async (req, res) => {
  const { _id } = req.params; // Dress Design ID
  const { size, dressId,barcode } = req.body; // Dress size and dress barcode or ID

  try {
    // Find the dress design by ID
    const dressDesign = await DressDesign.findById(_id).exec();
    if (!dressDesign) {
      return res.status(404).json({ message: "Dress design not found" });
    }

    // Find the size entry in dressListSizes
    const sizeEntry = dressDesign.dressListSizes.find(entry => entry.size === size);
    if (!sizeEntry) {
      return res.status(404).json({ message: "Size not found in the design" });
    }

    // Find the index of the dress to be deleted in the dresses array
    const dressIndex = sizeEntry.dresses.findIndex(dress => dress._id.toString() === dressId || dress.barcode === barcode);

    if (dressIndex === -1) {
      return res.status(404).json({ message: "Dress not found in the selected size" });
    }

    // Remove the dress from the dresses array
    sizeEntry.dresses.splice(dressIndex, 1);

    // Save the updated dress design
    await dressDesign.save();

    return res.status(200).json({
      success: true,
      message: `Dress deleted successfully from size ${size} in design ${dressDesign.name}`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete the dress", error: error.message });
  }
};
const takeDress = async (req, res) => {
  const { _id } = req.params; // Dress Design ID
  const { size, chosenDate } = req.body; // Size and the desired date for rent (chosenDate)

  try {
    // Find the dress design by ID
    const dressDesign = await DressDesign.findById(_id).exec();
    if (!dressDesign) {
      return res.status(404).json({ message: "Dress design not found" });
    }

    // Find the size entry in dressListSizes
    const sizeEntry = dressDesign.dressListSizes.find(entry => entry.size === size);
    if (!sizeEntry) {
      return res.status(404).json({ message: "Size not found in the design" });
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
        const rentDateObj = new Date(rentDate);

        // Check if the chosen date conflicts with an already rented date (+/- 7 days)
        if (Math.abs(chosenDateObj - rentDateObj) <= 7 * 24 * 60 * 60 * 1000) {
          isAvailable = false;
          break;
        }
      }

      // If the dress is available for the chosen date
      if (isAvailable) {
        // Add the chosenDate to the dress's renteDates
        dress.renteDates.push(chosenDateObj);
        await dressDesign.save();

        return res.status(200).json({
          success: true,
          message: `Dress successfully rented for the date ${chosenDate}`,
        });
      }
    }

    // No dress available for the chosen date
    return res.status(404).json({
      success: false,
      message: `No available dresses for size ${size} on ${chosenDate}`,
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
  const { _id } = req.params; // Dress Design ID
  const { size, returnDate } = req.body; // Size and the date to return the dress

  try {
    // Find the dress design by ID
    const dressDesign = await DressDesign.findById(_id).exec();
    if (!dressDesign) {
      return res.status(404).json({ message: "Dress design not found" });
    }

    // Find the size entry in dressListSizes
    const sizeEntry = dressDesign.dressListSizes.find(entry => entry.size === size);
    if (!sizeEntry) {
      return res.status(404).json({ message: "Size not found in the design" });
    }

    // Convert returnDate to a Date object
    const returnDateObj = new Date(returnDate);
    if (isNaN(returnDateObj)) {
      return res.status(400).json({ message: "Invalid date provided" });
    }

    // Find the dress that has the return date in renteDates
    for (let dress of sizeEntry.dresses) {
      const rentIndex = dress.renteDates.findIndex(date => new Date(date).getTime() === returnDateObj.getTime());

      if (rentIndex !== -1) {
        // Remove the rented date from renteDates
        dress.renteDates.splice(rentIndex, 1);
        await dressDesign.save();

        return res.status(200).json({
          success: true,
          message: `Dress successfully returned for the date ${returnDate}`,
        });
      }
    }

    // No dress was rented on the specified date
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


module.exports = {createDressDesign,getDressesDesign,getDressDesignById,updateDressDesign,deleteDressDesign,deleteDressFromDesign,addDressToDesign,takeDress,returnDress}