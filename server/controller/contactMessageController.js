const ContactMessage = require('../models/ContactMessage');
const createContactMessage = async (req, res) => {
  const {name,email,message}=req.body
  if(!name || !email|| !message){
    return res.status(400).json({message:'required field is missing'})

  }
  const contactMessage = await ContactMessage.create({name,email,message})
  if(contactMessage){
    return res.status(201).json({success:true,
         message:`contactMessage ${message} created successfuly`,
         })
 }
 else
     return res.status(400).json({message:"failed"})
   
  
};
const getContactMessages=async(req,res)=>{
  const contactMessage=await ContactMessage.find().lean()
  if(!contactMessage)
  {
    res.status(400).json({message:"didn't found"});
  }

  return res.status(200).json(contactMessage);

}

const getContactMessageById=async(req,res)=>{
  const {_id}=req.params
  const contactMessage=await ContactMessage.findById(_id).lean()
  
  if(!contactMessage)
  {
    return  res.status(400).json({message:"not found"})
  }
  return res.json(contactMessage)
  }

const updateContactMessage=async(req,res)=>{
  const {_id}=req.params
    const {name,email,message}=req.body
    const contactMessage=await ContactMessage.findById(_id).exec()
    if(!contactMessage){
    return res.status(401).json({message:"not found"})
    }

        if(name){
          contactMessage.name=name
        }
        if(email){
          contactMessage.email=email
        }
        if(message){
          contactMessage.message=message
        }
          
    
        const MyUpdateBookedDate=await contactMessage.save()
        return res.status(201).json({success:true,
            message:`contactMessage ${message} updated successfuly`,
            })
 

}

const deleteContactMessage=async(req,res)=>{
  const {_id}=req.params
  const contactMessage=await ContactMessage.findById(_id).exec()

if(!contactMessage){
  return res.status(401).json({message:"not found"})

  }
      await contactMessage.deleteOne()
      return res.status(201).json({success:true,
          message:`one contactMessage deleted successfuly`
          })
     
     }
// // יצירת הודעת יצירת קשר חדשה
// const createContactMessage = async (req, res) => {
//   try {
//     const newContactMessage = new ContactMessage(req.body);
//     await newContactMessage.save();
//     res.status(201).json(newContactMessage);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // קבלת כל הודעות יצירת קשר
// const getContactMessages = async (req, res) => {
//   try {
//     const message = await ContactMessage.find();
//     res.status(200).json(message);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // קבלת הודעת יצירת קשר לפי ID
// const getContactMessageById = async (req, res) => {
//   try {
//     const message = await ContactMessage.findById(req.params.id);
//     if (!message) return res.status(404).json({ error: 'Message not found' });
//     res.status(200).json(message);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // עדכון הודעת יצירת קשר
// const updateContactMessage = async (req, res) => {
//   try {
//     const updatedMessage = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedMessage) return res.status(404).json({ error: 'Message not found' });
//     res.status(200).json(updatedMessage);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // מחיקת הודעת יצירת קשר
// const deleteContactMessage = async (req, res) => {
//   try {
//     const deletedMessage = await ContactMessage.findByIdAndDelete(req.params.id);
//     if (!deletedMessage) return res.status(404).json({ error: 'Message not found' });
//     res.status(200).json({ message: 'Message deleted' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

module.exports = {createContactMessage,getContactMessages,getContactMessageById,updateContactMessage,deleteContactMessage}
