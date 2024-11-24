const mongoose = require("mongoose");

const tourSchema = mongoose.Schema({
    Uid:{
       type:String,
       required:true
    },
    title:{
        type: String,
        required: [true, "please add the title"],
    },
    description:{
        type: String,
        required: [true, "please add the description"],
    },
    pick_up:{
        type: String,
        required: [true, "please add the "],
    },
    meeting_point:{
        type: String,
        required: [true, "please add the contact phone"],
    },
    drop_off:{
        type: String,
        required: [true, "please add the contact phone"],
    },
    duration:{
        type: Number,
        required: [true, "please add the contact phone"],
    },
    
},{
    timestamps: true,
})

module.exports = mongoose.model("Tours", tourSchema);