const Dress = require('../models/Dress');
const DressDesign = require('../models/DressDesign');
// const createDress=async(req,res)=>{
//     const {_id,size} = req.body
//   if (!_id || !size) {
//       return res.status(400).json({message:'required field is missing'})
//       }
//       const dress=await Dress.findById(_id).exec()
//       if(!dress){
//       return res.status(401).json({message:"not found"})
//       }

//           console.log("log");
          
//           const index = dress.dressListSizes.findIndex(item => item.key === key);

//           // const searchKey=dress.dressListSize.find(d=>d.key===key)
//           const arr=[...dress.dressListSize.key.dresses,{renteDates:[]}]
//           dress.dressListSizes[index].dresses=arr
//           // let ind=arr.length-1;
//           // survey.questions=arr            
      
//           const MyUpdateDress=await dress.save()
//           return res.status(201).json({success:true,
//               message:`dress ${dress.name} updated successfuly`,
//               })
      
// }

// const createDress = async (req, res) => {
//   const { _id, key } = req.body;

//   if (!_id || !key) {
//     return res.status(400).json({ message: 'Required field is missing1' });
//   }

//   try {
//     const dress = await DressDesign.findById(_id).exec();
//     if (!dress) {
//       return res.status(404).json({ message: 'Dress design not found' });
//     }

//     const index = dress.dressListSizes.findIndex(item => item.key === key);
//     if (index === -1) {
//       return res.status(404).json({ message: 'Dress size key not found' });
//     }

//     // Add new dress to dresses array within the found size group
//     dress.dressListSizes[index].dresses.push({ renteDates: [] });

//     const updatedDress = await dress.save();

//     return res.status(201).json({
//       success: true,
//       message: `Dress updated successfully`,
//       data: updatedDress
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
const createDress = async (req, res) => {
  console.log("hiii132");

  const { name, description, dressListSizes } = req.body;
  console.log("Received data:", name, description, dressListSizes);

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




/*const Survey=require('../models/Survey')
const addQuestion=async(req,res)=>{
    const{_id,body,answers}=req.body
    // console.log(body);
    // console.log(_id);

    if(!body){
        console.log('not body');

        return res.status(409).json({message:"require"})
    }
    const survey=await Survey.findById(_id).exec()
    if(!survey)
    {
        console.log('not survey');

        return res.status(400).json({message:"Survey not foundd"})    }

    const arr=[...survey.questions,{body:body,answers:answers}]
    let ind=arr.length-1;
    survey.questions=arr
    // if(answers)
    // {
    //     if(survey.questions[ind].body===body)
    //     {
    //         answers.forEach(a => {addAnswer(_id,survey.questions[ind]._id,a)
    //         });
    //     }
    // }
    console.log("survey#################################&&&&&&&&&&&&&&&&&&");
        console.log(survey.questions);
    const updatesurvey= await survey.save()
    return res.status(200).json({success:true,
        message:`question successfuly`,
    data:survey})
}

const updateQuestion=async(req,res)=>{
    const{_id,questionId,body}=req.body
    if(!body){
        return res.status(409).json({message:"require"})
    }
    const survey=await Survey.findById(_id).exec()
    if(!survey)
    {        
        console.log('1111111111111111111111111111111111111');
        return res.status(400).json({message:"Survey not found"})
    }
    const question=survey.questions.find(q=>q._id==questionId)
    if(!question)
    {
        console.log('2222222222222222222222222222222222222');

        return res.status(400).json({message:"Question not found"})
    }
        question.body=body
    const updatesurvey= await survey.save()
    return res.status(200).json({success:true,
        message:`Question updated successfuly`
        })
}
const deleteQuestion=async(req,res)=>{
    const{_id,questionId}=req.body
    const survey=await Survey.findById(_id).exec()
    
    if(!survey){
        return res.status(400).json({message:"Survey not found"})
    }
    const question=survey.questions.find(q=>q._id==questionId)
    if(!question)
    {
        return res.status(400).json({message:"Question not found"})
    }
    survey.questions.splice(survey.questions.indexOf(question),1)
    const updatesurvey= await survey.save()   
    return res.status(200).json({success:true,
            message:`Question deleted successfuly`
            })
    

}
const chooseSeg=async(req,res)=>{
    const{_id,questionId,kind,choose,note}=req.body
    const survey=await Survey.findById(_id).exec()
    if(!survey){
        return res.status(400).json({message:"Survey not found"})
    }
    const question=survey.questions.find(q=>q._id==questionId)
    if(!question)
    {
        return res.status(400).json({message:"Survey not found"})
    }
if(kind)
{

    const kindArr=["תרשים מקלות מורכב","תרשים עוגה","גרף","היסטוגרמה"]
    const k=kindArr.find(s=>s==kind)
    if(!k)
    {
        return res.status(401).json({message:"kind are not valid"})
    }
    
    question.segmentation.kind=kind
}
if(choose)
    {
    
        const chooseArr=["גיל","מגדר","מגזר"]
        const c=chooseArr.find(s=>s==choose)
        if(!c)
        {
            return res.status(401).json({message:"choose are not valid"})
        }
        
        question.segmentation.choose=choose
    }
if(note)
    question.segmentation.note=note
const updatesurvey= await survey.save()   
return res.status(201).json({success:true,
            message:`Question updated successfuly`
            })
}



module.exports={addQuestion,updateQuestion,deleteQuestion,chooseSeg} */