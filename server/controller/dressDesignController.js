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
// const getRentedDates = async (req, res) => {

//   try {
//     const dresses = await DressDesign.find().populate({
//       path: 'dressListSizes.dresses.renteDates.userId', // מבצע populate על ה-userId בתאריכים
//       select: 'name phone' // בוחר להחזיר את שם המשתמש והטלפון
//     }).lean();

//     if (!dresses || dresses.length === 0) {
//       return res.status(404).json({ message: "No dresses found" });
//     }
    

//     // ניצור מערך של תאריכים מושכרים
//     let rentedDates = [];

//     // עבור כל שמלה, נשלוף את התאריכים והמשתמשים
//     for (let dress of dresses) {
  
      
      
//       // עבור כל שמלה, נבדוק אם יש תאריכים מושכרים
//       for (let size of dress.dressListSizes) {
//         for (let dressItem of size.dresses) {
//           if (dressItem.renteDates && dressItem.renteDates.length > 0) {

//             for (let rent of dressItem.renteDates) {

//               // בדיקה אם פרטי המשתמש קיימים
//               if (rent.userId) {

//                 rentedDates.push({
//                   id:dress._id,
//                   userId:rent.userId,
//                   date: rent.date,
//                   userName: rent.userId.name, // שם המשתמש
//                   userPhone: rent.userId.phone, // טלפון המשתמש
//                   dressName: dress.name, // שם השמלה
//                   dressId:dressItem._id,
//                   dressSize:size.key,
//                   rentalDate: rent.date, // תאריך השכרה
//                   isRented: rent.isReturned,// השמלה נחשבת למושכרת אם יש תאריך השכרה,

//                 });
//               } else {
//                 console.log("User not found for userId:", rent.userId); // לוג אם לא נמצא userId
//               }
//             }
//           } else {
//             // console.log("No rental dates for dress barcode:", dressItem.barcode); // לוג אם אין תאריכים
//             // rentedDates.push({
//             //   dressName: dress.name, // שם השמלה
//             //   isRented: false // השמלה לא מושכרת
//             // });
//           }
//         }
//       }
//     }

//     // אם לא נמצאו תאריכים מושכרים
//     if (rentedDates.length === 0) {
//       return res.status(404).json({ message: "No rental dates found" });
//     }

//     // מחזירים את כל התאריכים המושכרים
//     return res.status(200).json(rentedDates);

//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

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
      // עבור כל גודל שמלה
      for (let size of dress.dressListSizes) {
        for (let dressItem of size.dresses) {
          if (dressItem.renteDates && dressItem.renteDates.length > 0) {
            // סינון ההשכרות שבהן isRented אינו false
            const filteredRenteDates = dressItem.renteDates.filter(rent => rent.status !== 'returned');
 
            for (let rent of filteredRenteDates) {
              // בדיקה אם פרטי המשתמש קיימים
              if (rent.userId) {
                rentedDates.push({
                  id: dress._id,
                  userId: rent.userId,
                  date: rent.date,
                  userName: rent.userId.name, // שם המשתמש
                  userPhone: rent.userId.phone, // טלפון המשתמש
                  dressName: dress.name, // שם השמלה
                  dressId: dressItem._id,
                  dressSize: size.key,
                  rentalDate: rent.date, // תאריך השכרה
                  status:rent.status,
                  isRented: rent.isReturned, // השמלה נחשבת למושכרת אם יש תאריך השכרה
                });
              } else {
                console.log("User not found for userId:", rent.userId); // לוג אם לא נמצא userId
              }
            }
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




// const updateDressDesign = async (req, res) => {
//   const { _id } = req.params;
//   const { name, description, imageUrl, dressListSizes } = req.body;

//   try {

//     // חיפוש העיצוב לפי ה-ID
//     const dress = await DressDesign.findById(_id).exec();

//     if (!dress) {
//       return res.status(404).json({ message: "Dress design not found" });
//     }

//     // אם יש שם חדש לעדכון, נוודא שהשם לא קיים כבר בעיצוב אחר
//     if (name && name !== dress.name) {

//       const existingDress = await DressDesign.findOne({ name }).exec();
//       if (existingDress) {
        
//         return res.status(400).json({ message: "Dress design name must be unique" });
//       }
//       dress.name = name; // עדכון השם לאחר אימות ייחודיות
//     }

//     // עדכון שדות אחרים אם נשלחו
//     if (description) dress.description = description;
//     if (imageUrl) dress.images = imageUrl;

//     // עדכון רשימת המידות והשמלות
//     if (dressListSizes) {

//       const updatedDressListSizes = dressListSizes.map(sizeEntry => {
//         return {
//           key: sizeEntry.key,
//           size: sizeEntry.size,
//           dresses: sizeEntry.dresses.map(dress => ({
//             ...dress,
//             barcode: dress.barcode || uuidv4(), // הוספת ברקוד אם אין
//             renteDates: dress.renteDates || []  // ודא ש-`renteDates` לא ריק
//           }))
//         };
//       });
//       dress.dressListSizes = updatedDressListSizes;
//     }


//     // שמירת העדכון במסד הנתונים
//     const updatedDress = await dress.save();


//     return res.status(200).json({
//       success: true,
//       message: `Dress ${dress.name} updated successfully`,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: "Failed to update dress design", error: error.message });
//   }
// };
const updateDressDesign = async (req, res) => {
  console.log("Updating dress design...");

  // הדפסת נתונים נכנסים
  console.log("Request Params (req.params):", req.params);
  console.log("Request Body (req.body):", req.body);
  console.log("Request Files (req.files):", req.files);

  const { _id } = req.params;
  const { name, description, existImages, dressListSizes } = req.body;
  const files = req.files;

  try {
    // בדיקת תקינות ה-ID
    if (!_id) {
      console.error("Error: Missing ID in request");
      return res.status(400).json({ message: "Missing dress ID" });
    }

    const dress = await DressDesign.findById(_id).exec();
    if (!dress) {
      console.error(`Error: Dress design with ID ${_id} not found`);
      return res.status(404).json({ message: "Dress design not found" });
    }

    // עדכון שם
    if (name) {
      console.log("Name provided:", name);
      if (name !== dress.name) {
        console.log("Checking for duplicate name...");
        const existingDress = await DressDesign.findOne({ name }).exec();
        if (existingDress) {
          console.error("Error: Duplicate dress name detected");
          return res.status(400).json({ message: "Dress design name must be unique" });
        }
        dress.name = name;
      }
    }

    // עדכון תיאור
    if (description) {
      console.log("Updating description...");
      dress.description = description;
    }

    // עדכון תמונות קיימות
    // if (existImages) {
    //   console.log("Existing images provided:", existImages);
    //   if (!Array.isArray(existImages)) {
    //     console.error("Error: existImages is not an array");
    //     return res.status(400).json({ message: "Invalid existImages format" });
    //   }
    //   console.log("Filtering existing images...");
    //   console.log("Current dress images:", dress.images);
    //   dress.images = dress.images.filter((imagePath) =>
    //     existImages.includes(imagePath)
    //   );
    //   console.log("Updated existing images:", dress.images);
    // }

    // // טיפול בתמונות חדשות
    // if (files && files.length > 0) {
    //   console.log("Processing new images...");
    //   const newImagePaths = files.map((file) => file.path);
    //   console.log("New images paths:", newImagePaths);
    //   dress.images = [...dress.images, ...newImagePaths];
    // }
// Update existing images (if provided)
// if (existImages) {
//   console.log("Existing images provided:", existImages);

  // Convert to array if it's a single string
//   const existImagesArray = Array.isArray(existImages)
//     ? existImages
//     : [existImages]; // אם זה מחרוזת יחידה, הפוך למערך

//   console.log("Converted existImages to array:", existImagesArray);

//   console.log("Filtering existing images...");
//   console.log("Current dress images:", dress.images);

//   dress.images = dress.images.filter((imagePath) =>
//     existImagesArray.includes(imagePath)
//   );
//    if (files && files.length > 0) {
//       console.log("Processing new images...");
//       const newImagePaths = files.map((file) => file.path);
//       console.log("New images paths:", newImagePaths);
//       dress.images = [...dress.images, ...newImagePaths];
//     }

//   console.log("Updated existing images:", dress.images);
// }
if (existImages) {
  console.log("Filtering existing images...");
  const existImagesArray = Array.isArray(existImages) ? existImages : [existImages];
  
  // סינון התמונות הקיימות
  dress.images = dress.images.filter((imagePath) => 
    existImagesArray.includes(imagePath)
  );
  
  console.log("Filtered existing images:", dress.images);

  // רק לאחר מכן להוסיף את התמונות החדשות
  if (files && files.length > 0) {
    console.log("Processing new images...");
    const newImagePaths = files.map((file) => file.path);
    console.log("New images paths:", newImagePaths);

    dress.images = [...dress.images, ...newImagePaths];
    console.log("Updated images with new files:", dress.images);
  }
}
else{
  if (files && files.length > 0) {
    console.log("Processing new images...");
    const newImagePaths = files.map((file) => file.path);
    console.log("New images paths:", newImagePaths);

    dress.images = newImagePaths;
    console.log("Updated images with new files:", dress.images);
  }
}

    // עדכון גדלים
    // if (dressListSizes) {
    //   console.log("Updating dress list sizes...");
    //   try {
    //     const sizes = JSON.parse(dressListSizes);
    //     console.log("Parsed sizes:", sizes);
    //     dress.dressListSizes = sizes.map((sizeEntry) => ({
    //       key: sizeEntry.key,
    //       size: sizeEntry.size,
    //       dresses: sizeEntry.dresses.map((dress) => ({
    //         ...dress,
    //         barcode: dress.barcode || uuidv4(),
    //         renteDates: dress.renteDates || [],
    //       })),
    //     }));
    //   } catch (error) {
    //     console.error("Error parsing dressListSizes:", error.message);
    //     return res.status(400).json({ message: "Invalid dressListSizes format" });
    //   }
    // }
    if (dressListSizes) {
      console.log("Updating dress list sizes...");
      try {
        const parsedSizes = dressListSizes.map((size) =>
          typeof size === "string" ? JSON.parse(size) : size
        );
        console.log("Parsed dressListSizes:", parsedSizes);
    
        dress.dressListSizes = parsedSizes.map((sizeEntry) => ({
          key: sizeEntry.key,
          size: sizeEntry.size,
          dresses: sizeEntry.dresses.map((dress) => ({
            ...dress,
            barcode: dress.barcode || uuidv4(),
            renteDates: dress.renteDates || [],
          })),
        }));
      } catch (error) {
        console.error("Error parsing dressListSizes:", error.message);
        return res.status(400).json({ message: "Invalid dressListSizes format" });
      }
    }
    
    // שמירת עדכונים
    console.log("Saving updated dress design...");
    const updatedDress = await dress.save();
    console.log("Dress updated successfully:", updatedDress);

    return res.status(200).json({
      success: true,
      message: `Dress ${dress.name} updated successfully`,
      data: updatedDress,
    });
  } catch (error) {
    console.error("Error updating dress design:", error);
    return res
      .status(500)
      .json({ message: "Failed to update dress design", error: error.message });
  }
};

// const updateDressDesign = async (req, res) => {
//   console.log("Updating dress design...");
//   const { _id } = req.params;
//   const { name, description, existImages, dressListSizes } = req.body;
//   const files = req.files;
// console.log("files");
// console.log(files);
// console.log("existImages");
// console.log(existImages);
// console.log("name");
// console.log(name);


//   try {
//     const dress = await DressDesign.findById(_id).exec();
//     if (!dress) {
//       return res.status(404).json({ message: "Dress design not found" });
//     }

//     // Update the name (if provided) and ensure uniqueness
//     if (name && name !== dress.name) {
//       const existingDress = await DressDesign.findOne({ name }).exec();
//       if (existingDress) {
//         return res.status(400).json({ message: "Dress design name must be unique" });
//       }
//       dress.name = name;
//     }

//     // Update description (if provided)
//     if (description) {
//       dress.description = description;
//     }

//     // Update existing images (if provided)
//     if (existImages && existImages.length > 0) {
//       console.log("Existing images before update:", dress.images);
//       dress.images = dress.images.filter((imagePath) =>
//         existImages.includes(imagePath)
//       );
//       console.log("Updated existing images:", dress.images);
//     }

//     // Handle new images from `req.files`
//     if (files && files.length > 0) {
//       console.log("0");

//       const newImagePaths = files.map((file) => file.path); // Extract file paths
//       console.log("New images:", newImagePaths);
//       dress.images = [...dress.images, ...newImagePaths]; // Merge new images
//     }

//     // Update dress list sizes
//     if (dressListSizes) {
//       console.log("1");
//       console.log("dressListSizes");
//       console.log(dressListSizes);
      
//       dress.dressListSizes = dressListSizes.map((sizeEntry) => ({
//         key: sizeEntry.key,
//         size: sizeEntry.size,
//         dresses: sizeEntry.dresses.map((dress) => ({
//           ...dress,
//           barcode: dress.barcode || uuidv4(), // Add barcode if missing
//           renteDates: dress.renteDates || [], // Ensure `renteDates` is initialized
//         })),
//       }));
//     }
//     console.log("2");

//     // Save updates to the database
//     const updatedDress = await dress.save();
//     console.log("Dress updated successfully:", updatedDress);

//     return res.status(200).json({
//       success: true,
//       message: `Dress ${dress.name} updated successfully`,
//       data: updatedDress,
//     });
//   } catch (error) {
//     console.error("Error updating dress design:", error.message);
//     return res
//       .status(500)
//       .json({ message: "Failed to update dress design", error: error.message });
//   }
// };

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


// const returnDress = async (req, res) => {
//   const { _id } = req.params; // Dress Design ID
//   const { userId, date, dressId } = req.body; // User ID, date, and dress ID to identify the rental record
//   try {
//     // Find the dress design by ID
//     const dressDesign = await DressDesign.findById(_id).exec();
//     if (!dressDesign) {
//       return res.status(404).json({ message: "Dress design not found" });
//     }

//     // Convert the provided date to a Date object
//     const targetDate = new Date(date);
//     if (isNaN(targetDate)) {
//       return res.status(400).json({ message: "Invalid date format" });
//     }

//     let rentalFound = false;

//     // Iterate through the size entries in dressListSizes
//     for (const sizeEntry of dressDesign.dressListSizes) {
//       console.log(sizeEntry.dresses);
      
//       // Find the dress by dressId in the current size
//       console.log(dressId);
      
//       const dress = sizeEntry.dresses.find(dress => dress._id.toString() === dressId);
//       if (dress) {
//         console.log("dress");
//         console.log(dress);

        
//         // Filter out the specific rental record from the renteDates array
//         const initialLength = dress.renteDates.length;
//         dress.renteDates = dress.renteDates.filter(
//           rent => (rent.userId.toString() === userId && new Date(rent.date).toISOString() === targetDate.toISOString())
//         );

//         // Check if a record was removed
//         if (dress.renteDates.length < initialLength) {
//           rentalFound = true;
//           break;
//         }
//       }
//     }

//     if (!rentalFound) {
//       return res.status(404).json({
//         success: false,
//         message: `No rental record found for dressId: ${dressId}, userId: ${userId}, and date: ${date}`,
//       });
//     }

//     // Save the updated DressDesign
//     await dressDesign.save();

//     return res.status(200).json({
//       success: true,
//       message: `Rental record successfully canceled for dressId: ${dressId}, userId: ${userId}, and date: ${date}`,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error canceling rental",
//       error: error.message,
//     });
//   }
// };
const returnDress = async (req, res) => {
  
  const { _id } = req.params; // Dress Design ID
  const { userId, date, dressId } = req.body; // User ID, date, and dress ID to identify the rental record
  try {
  console.log('1');

    // Find the dress design by ID
    const dressDesign = await DressDesign.findById(_id).exec();
    if (!dressDesign) {
  console.log('2');

      console.log(_id);
      
      return res.status(404).json({ message: "Dress design not found" });
    }
    console.log('3');

    // Convert the provided date to a Date object
    const targetDate = new Date(date);
  console.log('4');

    if (isNaN(targetDate)) {
  console.log('5');

      return res.status(400).json({ message: "Invalid date format" });
    }

    let rentalFound = false;
    console.log('6');

    // Iterate through the size entries in dressListSizes
    for (const sizeEntry of dressDesign.dressListSizes) {
  console.log('7');

      // Find the dress by dressId in the current size
      const dress = sizeEntry.dresses.find(dress => dress._id.toString() === dressId);
      if (dress) {
        console.log(dress.renteDates);
        console.log(userId, targetDate);
  console.log('8');
        
        // Find the specific rental record in the renteDates array
        const rentalRecord = dress.renteDates.find(
          rent =>
            rent.userId.toString() === userId &&
            new Date(rent.date).toISOString() === targetDate.toISOString()
        );
        console.log('9');

        if (rentalRecord) {
  console.log('10');

          // Update the isReturned field to true
          rentalRecord.status = "returned";
          rentalFound = true;
          break;
        }
      }
    }

    if (!rentalFound) {
  console.log('11');
   
      return res.status(404).json({
        success: false,
        message: `No rental record found for dressId: ${dressId}, userId: ${userId}, and date: ${date}`,
      });
    }

    // Save the updated DressDesign
    await dressDesign.save();

    return res.status(200).json({
      success: true,
      message: `Rental record successfully updated for dressId: ${dressId}, userId: ${userId}, and date: ${date}`,
    });
  } catch (error) {
  console.log('12');
  console.log(error);


    return res.status(500).json({
      success: false,
      message: "Error updating rental record",
      error: error.message,
    });
  }
};


const rentingDress = async (req, res) => {
  
  const { _id } = req.params; // Dress Design ID
  const { userId, date, dressId } = req.body; // User ID, date, and dress ID to identify the rental record
  try {


    // Find the dress design by ID
    const dressDesign = await DressDesign.findById(_id).exec();
    if (!dressDesign) {


      console.log(_id);
      
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


      // Find the dress by dressId in the current size
      const dress = sizeEntry.dresses.find(dress => dress._id.toString() === dressId);
      if (dress) {
        console.log(dress.renteDates);
        console.log(userId, targetDate);

        
        // Find the specific rental record in the renteDates array
        const rentalRecord = dress.renteDates.find(
          rent =>
            rent.userId.toString() === userId &&
            new Date(rent.date).toISOString() === targetDate.toISOString()
        );
  

        if (rentalRecord) {
 

          // Update the isReturned field to true
          rentalRecord.status = "active";
          rentalFound = true;
          break;
        }
      }
    }

    if (!rentalFound) {
  console.log('11');
   
      return res.status(404).json({
        success: false,
        message: `No rental record found for dressId: ${dressId}, userId: ${userId}, and date: ${date}`,
      });
    }

    // Save the updated DressDesign
    await dressDesign.save();

    return res.status(200).json({
      success: true,
      message: `Rental record successfully updated for dressId: ${dressId}, userId: ${userId}, and date: ${date}`,
    });
  } catch (error) {
  console.log('12');
  console.log(error);


    return res.status(500).json({
      success: false,
      message: "Error updating rental record",
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
          size:sizeEntry.size
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
  const { _id } = req.params; // Dress Design ID
  console.log(_id);
  
  const { userId, date, dressId } = req.body; // User ID, date, and dress ID to identify the rental record
  console.log(userId, date, dressId);
  
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



module.exports = {getRentedDates,createDressDesign,getDressesDesign,getDressDesignById,updateDressDesign,deleteDressDesign,deleteDressFromDesign,addDressToDesign,takeDress,returnDress,getAvailableKeysForDate, cancelRent,rentingDress}