const Dress = require('../models/Dress');
const DressDesign = require('../models/DressDesign');

const createDress = async (req, res) => {

  const { name, description, dressListSizes } = req.body;

  if (!name || !dressListSizes) {
    return res.status(400).json({ message: 'Required field is missing' });
  }

  const imageUrll = req.file ? req.file.path : null;

  try {
    const updatedDressListSizes = dressListSizes.map(sizeEntry => {
      return {
        key: sizeEntry.key,
        size: sizeEntry.size,
        dresses: sizeEntry.dresses.map(dress => ({
          ...dress,
          barcode: dress.barcode || uuidv4(), // Add barcode if missing
          renteDates: dress.renteDates || []  // Ensure `renteDates` is not empty
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
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
      return res.status(400).json({ message: "Dress design name must be unique" });
    }

    return res.status(400).json({ message: "Failed to create dress design", error: error.message });
  }
};


const getDresses=async(req,res)=>{
  const dresses=await DressDesign.find().lean()
  if(!dresses)
  {
    res.status(500).json({ error: error.message });
  }

  return res.status(200).json(dresses);

}

const getDressById=async(req,res)=>{
  const {_id,_idDress,key}=req.params
  const dress=await DressDesign.findById(_idDress).lean()
  
  if(!dress)
  {
    return  res.status(401).json({message:"not found"})
  }
  const dressListSize = dress.dressListSizes.find(item => item.key === key);
  const d=dressListSize.dresses.find(i=>i._id==_id)
  return res.json(d)
  }

const updateDress=async(req,res)=>{
  const {_id,_idDress}=req.params
    const {size,price}=req.body
    const dress=await DressDesign.findById(_id).exec()
    if(!dress){
    return res.status(401).json({message:"not found"})
    }

        if(size){
            dress.size=size
        }
        if(price){
            dress.price=price;
        }
       
          
    
        const MyUpdateDress=await dress.save()
        return res.status(201).json({success:true,
            message:`dress ${dress.name} updated successfuly`,
            })
 

}

const deleteDress=async(req,res)=>{
  const {_id}=req.params
  const dress=await DressDesign.findById(_id).exec()

if(!dress){
  return res.status(401).json({message:"not found"})

  }
      await dress.deleteOne()
      return res.status(201).json({success:true,
          message:`one dress deleted successfuly`
          })
     
     }

const rentedDress=async(_id)=>{
  const dress=await DressDesign.findById(_id).exec()
  if(!dress){
    return false
      }
     
      dress.rented=dress.rented+1;
     
      const MyUpdateDress=await dress.save()
      return true;

}
const unRentedDress=async(_id)=>{
  const dress=await DressDesign.findById(_id).exec()
  if(!dress){
    return false
      }
     
      dress.rented=dress.rented-1;
     
      const MyUpdateDress=await dress.save()
      return true

}
module.exports = {createDress,getDresses,getDressById,updateDress,deleteDress,rentedDress,unRentedDress}




