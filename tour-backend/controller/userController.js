const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")

//@desc register the user
//route post /api/user/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory");
    }

    // Check if the user already exists
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
         res.status(400);
         throw new Error("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
        username,
        email,
        password: hashedPassword, // Store hashed password
    });

    if (user) {
        res.status(201).json({id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

// @desc login the user
// route post /api/user/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.query;

    // Validate input
    if (!email || !password) {
        res.status(400)
        throw new Error("Email and password are required");
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
        res.status(401)
        throw new Error("Invalid email or password");
    }

    // Compare passwords
    const isPasswordValid =await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(401)
        throw new Error("Invalid email or password");
    }

    // Send successful login response
    res.status(200).json({
            id: user.id,
            email: user.email,
            username: user.username,
    });
});


module.exports = {registerUser, loginUser}