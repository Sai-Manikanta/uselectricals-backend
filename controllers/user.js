const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const User = require('../models/user');

const createTeamMember = async (req, res) => {

    const { name, mobileNumber, password } = req.body;

    if (isNaN(mobileNumber)) {
        return res.status(400).json({ message: 'Mobile number should be number' });
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
        return res.status(400).json({ message: 'Mobile number should be exactly 10 digits' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ mobileNumber });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            mobileNumber,
            // password: hashedPassword,
            password,
            role: 'teamMember' // Assuming you want the default role to be 'teamMember'
        });

        // Save user to the database
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during signup:', error);

        if (error.code === 11000) {
            return res.status(400).json({ message: 'Mobile number is already registered' });
        }

        // For other errors, provide a generic error message
        res.status(500).json({ message: 'Internal server error' });
    }
}

const adminLoginController = async (req, res) => {
    const { mobileNumber, password } = req.body;

    try {
        // Find the user by mobileNumber
        const user = await User.findOne({ mobileNumber });

        // If user not found, return error
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (user.role != "admin") {
            return res.status(401).json({ message: 'Not an admin' });
        }

        // Compare hashed password with provided password
        // const passwordMatch = await bcrypt.compare(password, user.password);

        // if (!passwordMatch) {
        //     return res.status(401).json({ message: 'Invalid credentials' });
        // }

        if (password != user.password) {
            console.log(password, user.password);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create JWT token with user mobileNumber and role
        const token = jwt.sign({ mobileNumber: user.mobileNumber, role: user.role }, 'shashgy2g12517v', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteTeamMember = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const editTeamMember = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, mobileNumber, password } = req.body;

        // Validate input data
        if (!name || !mobileNumber) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        // console.log("password:", password);

        // Hash password
        //  const hashedPassword = await bcrypt.hash(password, 10);

        //  console.log("Hashed Password", hashedPassword)

        const updatedUser = await User.findByIdAndUpdate(id, { name, mobileNumber, password }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getTeamList = async (req, res) => {
    try {
        const users = await User.find({ role: 'teamMember' }, 'name mobileNumber').populate({
            path: 'assignedToProjects',
            select: '-_id name mobileNumber'
        });

        res.json({
            message: 'Team list fetched successfully',
            data: users
        }); // Return users as JSON response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTeamMember = async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.params.id);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If user found, return the user object
        res.json({
            message: 'Team memeber fetched successfully',
            data: user
        });
    } catch (err) {
        // If an error occurs, return an error response
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createTeamMember,
    adminLoginController,
    deleteTeamMember,
    editTeamMember,
    getTeamList,
    getTeamMember
}