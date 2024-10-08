const bcrypt = require('bcrypt');
const User = require('../Model/User');
const jwt = require('jsonwebtoken');

// Register new user
const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        
        // Validate input
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, password: hashedPassword ,name ,isAdmin: false});

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
}

// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' , success: false});
        }

        // Find user
        const user = await User.findOne({ where: { email } });
        console.log("check user",user);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials', success: false });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials', success: false });
        }

        // Generate token
        const token = jwt.sign({ userId: user.id ,isAdmin:user.isAdmin, name:user.name}, process.env.SecretKey, {
            expiresIn: '1d',
        });

        res.status(200).json({ message: 'Login successful',success:true, data: { token } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' });
    }
}

// Update user password
const updatePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword, name } = req.body;
        
        // Validate input
        if (!email || !oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Email, old password, and new password are required' });
        }

        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Old password is incorrect' });
        }

        // Hash new password and update user
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during password update' });
    }
}

const getCurrentUserInfo=async(req, res)=>{
    try{
        const userId=req.user.userId;
        console.log("User :::",req.body)
        const user= await User.findByPk(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        // return user info excluding password
        const{password,...userInfo}=user.toJSON();
        res.status(200).json({message:"Current user fetched successfully", success:true,data:user});

    }catch(error){
        console.error(error);
        res.status(500).json({message:'Server error during fetching user info'});
    }
}


const getAllUsers= async(req, res)=>{
    try{

        const users= await User.findAll();
        res.status(200).json({message:"All user data fetched successfully", success:true, data:users});

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server error during fectching users"});
    }
}

module.exports = {
    register,
    login,
    updatePassword,
    getCurrentUserInfo,
    getAllUsers,
}
