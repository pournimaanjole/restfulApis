import express from 'express' 
import dotenv from 'dotenv' 
import mongoose from 'mongoose'
dotenv.config()

const app = express() ;
app.use(express.json());
const PORT = process.env.PORT || 5000

// import booking model
import Booking from './models/booking.js'

// mongodb connection 

const connectToMongoDb = async() =>{
const response = await mongoose.connect(process.env.MONGODB_URI )
if(response){
    console.log("connected to mongodb")
}
}

// post request 

app.post("/api/v1/bookings" , async(req,res)=>{
const {name,mobile,busName,busNumber,from ,to ,date} = req.body

const booking = new Booking({
    name,mobile,busName,busNumber,from,to,date
})
try{
const savebooking = await booking.save()
res.json({
    sucess:true,
    data:savebooking,
    message:"booking is done sucessfully"
})
}
catch(e){
    res.json({
        sucess :false,
        message:e.message
    })
}

})

// get request

app.get("/api/v1/bookings" , async(req,res)=>{
const findbookings = await Booking.find();
res.json({
    sucess:true,
    data:findbookings,
    message:"bookings find sucessfully"
})
})

// put reqest

app.put("/api/v1/bookings/:_id" ,async(req,res)=>{
const {_id} = req.params
const {name,mobile,busName,busNumber,from,to,date} = req.body
await Booking.updateOne({_id:_id} ,{$set:{
name:name,
mobile:mobile,
busName:busName,
busNumber:busName,
from:from,
to:to,
date:date
}})

const  updatebooking = await Booking.find({_id:_id});
res.json({
    sucess:true,
    data:updatebooking,
    message:"booking updated sucessfully"
})

} )

// patch reqest 

app.patch("/api/v1/bookings/:_id" , async(req,res)=>{
const {_id} = req.params
const {name,busName,busNumber,mobile,from,to,date} = req.body
const updateone = await Booking.find({_id:_id});

if(name){
    updateone.name=name
}
if(busName){
    updateone.busName=busName
}
if(busNumber){
    updateone.busNumber= busName
}
if(from){
    updateone.from=from
}
if(to){
    updateone.to= to
}
if(mobile){
    updateone.mobile=mobile
}
const saveupdatebooking = await updateone.save();
res.json({
    sucess:true,
    data:saveupdatebooking,
    message:"update the booking sucesfully"
})
})

// delete reqest 

app.delete("/api/v1/bookings/:_id", async(req,res)=>{
const {_id} = req.params
await Booking.deleteOne({_id:_id})

res.json({
    sucess:true,
    message:"booking deleted sucessfully"
})
})

app.listen(PORT,()=>{
    console.log("server is on ")
    connectToMongoDb();
})