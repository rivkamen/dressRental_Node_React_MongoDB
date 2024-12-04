require("dotenv").config()
const express=require("express")
const cors=require("cors")
const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/dbConn")
const { default: mongoose } = require("mongoose")
const path = require('path')

const PORT=process.env.PORT || 1258
const app=express()
connectDB()

app.use(cors(corsOptions))
app.use(express.json())

app.use('/upload', express.static(__dirname + '/public/upload'));
app.get('/upload/:fileName', (req, res) => {
    
    const {fileName}=req.params
    const imagePath = path.join(__dirname, '/public/upload/',fileName);
    res.sendFile(imagePath);
});

app.use("/api/user",require("./routes/UsersRoutes"))
app.use("/api/auth",require("./routes/AuthRoutes"))
app.use("/api/dress",require("./routes/DressDesignRoutes"))

app.use("/api/message",require("./routes/ContactMessageRoutes"))
app.use("/api/booked",require("./routes/BookedDateRoutes"))
app.use("/api/functionToken/:token",require("./middleware/functionToken"))
app.use('/api/rental-history', require('./routes/RentalHistoryRoutes'));

app.get('/',(req,res)=>{
    res.send("This is the Home Page")
})
app.post('*',(req,res)=>{
    res.status(404).send("not defind")
})

mongoose.connection.once('open',()=>{
    console.log("connected to DB")
    app.listen(PORT,()=>
    console.log(`server running on port ${PORT}`))
})





mongoose.connection.on('error',err=>{
    console.log(err)
})


