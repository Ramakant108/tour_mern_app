const express = require("express")
const connectDb = require("./mongodb");
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors');
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = 3001;
app.use(cors())
app.use(express.json());
app.use("/tours", require("./routers/tourRouter"));
app.use("/users", require("./routers/userRouter"));
app.use(errorHandler)

app.listen(port, () => {
    console.log(`listen to port ${port}`);
})