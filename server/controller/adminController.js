const User = require("../models/User");
const bcrypt=require("bcrypt")

const createUser=async(req,res)=>{
    const {password,username,email} = req.body
    if (!username || !password) {
        return res.status(400).json({message:'required field is missing'})
        }
       
    const duplicate=await User.findOne({username:username}).lean()
    if(duplicate)
       return res.status(409).json({message:"duplicate phone"})
    
    if(password==process.env.ADMIN)
    {    
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject= {password:hashedPwd,username,email}
    const user = await User.create(userObject)
    if(user){
       return res.status(201).json({success:true,
            message:`user ${user.name} created successfuly`,
            })
    }
    else
        return res.status(400).json({message:"failed"})
    } 
    return res.status(401).json({message:"unauthorized"})
      
}

const getadmin=async(req,res)=>{
  const admin=await Admin.find({},{password:0,username:0}).lean()
  if(!users)
  {
    res.status(500).json({ error: error.message });
  }

  return res.status(200).json(users);

}

const getAdminById=async(req,res)=>{
const {id}=req.params
const user=await Admin.findById({_id:id},{password:0}).lean()
if(!user)
{
  return  res.status(401).json({message:"not found"})
}
if(user._id==req.user._id){
    return res.json(user)
}
return res.status(405).json({message:"unaouthorisedid"})

}
const updateAdmin=async(req,res)=>{
    const {_id,password,username,email}=req.body
    const admin=await Admin.findById(_id).exec()

    if(!admin){
    return res.status(401).json({message:"not found"})
    }
    if(admin._id==req.user._id){
        
        if(password){
            admin.password=password
        }
        if(username){
            admin.username=username;
        }
        
        if(email)
        {
            admin.email=email;
        }
        
    
        const MyUpdateUser=await admin.save()
        return res.status(201).json({success:true,
            message:`admin ${admin.email} updated successfuly`,
            })
    }

return res.status(401).json({message:"unaouthorised"})

}
const deleteUser=async(req,res)=>{
  const {_id}=req.params
  const user=await User.findById(_id).exec()
if(!user){
  return res.status(401).json({message:"not found"})

  }
  if(user._id==req.user._id){
      await user.deleteOne()
      return res.status(201).json({success:true,
          message:`one user deleted successfuly`
          })
      }
  return res.status(405).json({message:"unaouthorised"})
     }


module.exports = {createUser,getUsers,getUserById,updateUser,deleteUser}

