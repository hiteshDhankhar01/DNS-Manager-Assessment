const User = require('../Models/User');


// const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
    });
};

// Register route
// app.post('/register',
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user
        user = new User({
            username,
            email,
            password
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.status(200).json({
            msg:'User registered successfully',
            token: generateToken(user._id),
            user: {
                username: user.username,
                email: user.email
            }

        });
        // res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Login route
// app.post('/login', 
const login = async (req, res) => {
    
    try {
        const { email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        
        res.status(200).json({
            token: generateToken(user._id),
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }

        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};



// Delete user route
// app.delete('/users/:id', auth, async (req, res) => {
const deleteUser = async (req, res) => {
    const result = await User.findOneAndDelete({ _id: req.params.id });

    if (!result) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User Delete Successfully" });
};

module.exports = { register, login, deleteUser }