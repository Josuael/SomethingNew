import { User } from "../models/user.model.js";

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Validate required fields

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        // Create a new user

        const user = await User.create({ 
            username, 
            email: email.toLowerCase(), 
            password,
            loggedIn: false
        });
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        

        // Find the user by email
        // const user = await User.findOne({ email: email.toLowerCase() });
        // if (!user) {
        //     return res.status(400).json({ message: "Invalid email or password" });
        // }

        // // Check if the password is correct
        // const isMatch = await user.comparePassword(password);
        // if (!isMatch) {
        //     return res.status(400).json({ message: "Invalid email or password" });
        // }

        const user = await User.findOne({ email: email.toLowerCase() });
        console.log("User found:", user);

        const isMatch = await user.comparePassword(password);
        console.log("Password match:", isMatch);

        // Update the user's logged-in status
        user.loggedIn = true;
        await user.save();

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ 
            email: email.toLowerCase() });
        if(!user) return res.status(404).json({
            message: "User not found"
        });

        res.status(200).json({
            message: "Logout successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    }
    catch (error) {
        res.status(500).json({
            message: "internal server error", error
        });
    }
}

export {
    createUser,
    loginUser,
    logoutUser
};