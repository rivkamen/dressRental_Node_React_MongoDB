const BookedDate = require('../models/BookedDate');
const Dress=require("../models/Dress")
const {rentedDress}=require("./dressController")
const {unRentedDress}=require("./dressController")

// יצירת תאריך השכרה חדש
const createBookedDate = async (req, res) => {
  const {dress,date,user}=req.body
  if(!dress || !date|| !user){
    return res.status(400).json({message:'required field is missing'})

  }
  const dres=await Dress.findById({_id:dress});
  if(!dres){
    return res.status(400).json({message:"dress is not found"})
  }
  if(dres.quantity-dres.rented<=0){
    return res.status(400).json({message:"out of stock"})
  }
  const rented=await rentedDress(dres._id);
  if(!rented){
    return res.status(400).json({message:"unsuccess"})
  }
  const bookedDate = await BookedDate.create({dress,date,user})
  if(bookedDate){
    return res.status(201).json({success:true,
         message:`bookedDate ${dress} in ${date} for ${user} created successfuly`,
         })
 }
 else{
    const unRented=await unRentedDress(dres._id);
    if(unRented){
     return res.status(400).json({message:"failed"})}
    }
    return res.status(400).json({message:"rented is not good"})
   
  
};
const getBookedDates=async(req,res)=>{
  const bookedDate=await BookedDate.find().lean()
  if(!bookedDate)
  {
    res.status(500).json({ error: error.message });
  }

  return res.status(200).json(bookedDate);

}

const getBookedDateById=async(req,res)=>{
  const {_id}=req.params
  const bookedDate=await BookedDate.findById(_id).lean()
  
  if(!bookedDate)
  {
    return  res.status(401).json({message:"not found"})
  }
  return res.json(bookedDate)
  }

const updateBookedDate=async(req,res)=>{
  const {_id}=req.params
    const {dress,date,user}=req.body
    const bookedDate=await BookedDate.findById(_id).exec()
    if(!bookedDate){
    return res.status(401).json({message:"not found"})
    }

        if(dress){
          bookedDate.dress=dress
        }
        if(user){
          bookedDate.user=user
        }
        if(date){
          bookedDate.date=date
        }
          
    
        const MyUpdateBookedDate=await bookedDate.save()
        return res.status(201).json({success:true,
            message:`bookedDate ${dress} in ${date} for ${user} updated successfuly`,
            })
 

}

const deleteBookedDate=async(req,res)=>{
  const {_id}=req.params
  const bookedDate=await BookedDate.findById(_id).exec()
  console.log(bookedDate);
  if(bookedDate){
  const dres=await Dress.findById({_id:bookedDate.dress._id});
  if(!dres || !bookedDate){
    return res.status(400).json({message:"not found"})
  }
  const unRented=await unRentedDress(dres._id);
  if(!unRented){
   return res.status(400).json({message:"failed"})}
  
    

      await bookedDate.deleteOne()
      return res.status(201).json({success:true,
          message:`one bookedDate deleted successfuly`
          })}
          return res.status(400).json({message:"not found"})

     
}

// // קבלת כל תאריכי ההשכרות
// const getBookedDates = async (req, res) => {
//   try {
//     const dates = await BookedDate.find().populate('dress').populate('user');
//     res.status(200).json(dates);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // קבלת תאריך השכרה לפי ID
// const getBookedDateById = async (req, res) => {
//   try {
//     const date = await BookedDate.findById(req.params.id).populate('dress').populate('user');
//     if (!date) return res.status(404).json({ error: 'Booked date not found' });
//     res.status(200).json(date);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // עדכון תאריך השכרה
// const updateBookedDate = async (req, res) => {
//   try {
//     const updatedDate = await BookedDate.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedDate) return res.status(404).json({ error: 'Booked date not found' });
//     res.status(200).json(updatedDate);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // מחיקת תאריך השכרה
// const deleteBookedDate = async (req, res) => {
//   try {
//     const deletedDate = await BookedDate.findByIdAndDelete(req.params.id);
//     if (!deletedDate) return res.status(404).json({ error: 'Booked date not found' });
//     res.status(200).json({ message: 'Booked date deleted' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

module.exports = {createBookedDate,getBookedDates,getBookedDateById,updateBookedDate,deleteBookedDate}