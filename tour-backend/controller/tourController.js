const asyncHandler = require("express-async-handler")
const Tour = require("../models/tourModel")

//@desc get all hotels
//route get /
//@access public
const getHotels = asyncHandler(async (req, res) => {
    const tour = await Tour.find({Uid:req.params.id});
    console.log(req.params.id)
    console.log(tour)
    res.status(200).json(tour)
})


//@desc get hotel
//route get /id
//@access public
const getHotel = asyncHandler(async (req, res) => {
    const tour = await Tour.find({title:req.params.title,Uid:req.params.id});
    if(!tour){
        res.status(404);
        throw new Error("tour not found");
    }
   console.log(tour)
    res.status(200).json(tour);
})

const getupdateHotel = asyncHandler(async (req, res) => {
    const tour = await Tour.find({_id:req.params.tid,Uid:req.params.uid});
    if(!tour){
        res.status(404);
        throw new Error("tour not found");
    }
   
    res.status(200).json(tour);
})

//@desc create hotel
//route post /
//@access public
const createHotel = asyncHandler ( async (req, res) => {
    console.log("Received POST request with data: ", req.body);
    const { title, description, pick_up, meeting_point, drop_off, duration ,duration_unit,Uid} = req.body;
    // Validate input fields
    if (!title || !description || !pick_up || !meeting_point || !drop_off || !duration||!Uid) {
        res.status(400);
        throw new Error("fields are mandatory.");
    }

    // Create and save the contact
    try {
        const tour = await Tour.create({
            Uid,
            title,
            description,
            pick_up,
            meeting_point,
            drop_off,
            duration,
            duration_unit
        });
        res.status(201).json({
            success:true,
            message:"Tour created successfully",
            data:tour,
        });
    } catch (error) {
        console.error("Error creating tour: ", error);
        res.status(500); // Internal Server Error
        throw new Error("Failed to create tour");
    }
})


//@desc update hotel
//route put /id
//@access public
const updateHotel = asyncHandler(async (req, res) => {
    const tour = await Tour.findById(req.params.id);
    if(!tour){
        res.status(404);
        throw new Error("tour not found");
    }
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTour);

})


//@desc delete hotel
//route put /id
//@access public
const deleteHotel = asyncHandler(async (req, res) => {
    const tour = await Tour.findById(req.params.id);
    if(!tour){
        res.status(404);
        throw new Error("tour not found");
    }

    await Tour.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true, message: "Tour deleted", data: tour });

})


module.exports = { getHotels, getHotel, createHotel, updateHotel, deleteHotel ,getupdateHotel}
