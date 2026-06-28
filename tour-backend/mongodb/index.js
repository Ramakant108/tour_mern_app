const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("database connected ", connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log(error);
        setTimeout(()=>{
            connectDb()
        }, 5000)
    }
}

module.exports = connectDb;