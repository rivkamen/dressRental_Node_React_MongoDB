const User = require("../models/User");
const Admin = require("../models/Admin");

const bcrypt=require("bcrypt")

const createUser=async(req,res)=>{
    const {name,email,phone} = req.body
    if (!name || !phone) {
        return res.status(400).json({message:'required field is missing'})
        }
       
    const duplicate=await User.findOne({phone:phone}).lean()
    if(duplicate)
       return res.status(409).json({message:"duplicate phone"})
    
    
    // const hashedPwd = await bcrypt.hash(password, 10)
    const userObject= {name,email,phone}
    const user = await User.create(userObject)
    if(user){
      //  return res.status(201).json({success:true,
      //       message:`user ${user.name} created successfuly`,
      //       })
      return res.status(201).json({
        success: true,
        message: `User ${user.name} created successfully`,
        userId: user._id  // Include the userId in the response
    });
    }
    else
        return res.status(400).json({message:"failed"})
      
}

const getUsers=async(req,res)=>{
  const users=await User.find().lean()
  if(!users)
  {
    res.status(500).json({ error: error.message });
  }

  return res.status(200).json(users);

}

const getUserById=async(req,res)=>{
const {_id}=req.params
console.log("hiii");

const user=await User.findById(_id).lean()
console.log(user);

const admin=await Admin.findById({_id:req.user._id})

if(!user)
{
  return  res.status(401).json({message:"not found"})
}
if(user._id==req.user._id || admin){//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  console.log('yes');
  
    return res.json(user)
}
return res.status(405).json({message:"unaouthorisedid"})

}
const getUserByPhone=async(req,res)=>{
  console.log("im here");
  
  const {phone}=req.params
  console.log(phone);
  
   const user=await User.findOne({phone}).lean()

  
  const admin=await Admin.findById({_id:req.user._id})
  
  if(!user)
  {
    return  res.status(401).json({message:"not found"})
  }
  if(user._id==req.user._id || admin){//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    
      return res.json(user)
  }
  return res.status(405).json({message:"unaouthorisedid"})
  
  }
  // const getUserByPhone=async(req,res)=>{
  //   console.log("im here");
    
  //   const {phone}=req.params
  //   console.log(phone);
    
  //   const user=await User.findById(phone).lean()
  //   console.log(user);
    
  //   const admin=await Admin.findById({_id:req.user._id})
    
  //   if(!user)
  //   {
  //     return  res.status(401).json({message:"not found"})
  //   }
  //   if(user._id==req.user._id || admin || true){//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //     console.log('yes');
      
  //       return res.json(user)
  //   }
  //   return res.status(405).json({message:"unaouthorisedid"})
    
  //   }
const updateUser=async(req,res)=>{
  const {_id}=req.params
    const {password,name,email,phone}=req.body
    const user=await User.findById(_id).exec()
const admin=await Admin.findById({_id:req.user._id})
    if(!user){
    return res.status(401).json({message:"not found"})
    }
    console.log(user._id);
console.log(req.user._id);
    if(user._id==req.user._id || admin){
        console.log(user._id);
        if(password){
            user.password=password
        }
        if(name){
            user.name=name;
        }
        if(phone){
          const duplicate=await User.findOne({phone:phone}).lean()
          if(duplicate)
            return res.status(409).json({message:"duplicate phone"})
          user.phone=phone;
        }
        if(email)
        {
            user.email=email;
        }
        
    
        const MyUpdateUser=await user.save()
        return res.status(201).json({success:true,
            message:`user ${user.name}updated successfuly`,
            })
    }

return res.status(405).json({message:"unaouthorised"})

}

const deleteUser=async(req,res)=>{
  const {_id}=req.params
  const user=await User.findById(_id).exec()
  const admin=await Admin.findById({_id:req.user._id})

if(!user){
  return res.status(401).json({message:"not found"})

  }
  if(user._id==req.user._id || admin){
      await user.deleteOne()
      return res.status(201).json({success:true,
          message:`one user deleted successfuly`
          })
      }
  return res.status(405).json({message:"unaouthorised"})
     }


module.exports = {createUser,getUsers,getUserById,updateUser,deleteUser,getUserByPhone}

