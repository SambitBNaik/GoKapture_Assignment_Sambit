const User= require('../Model/user');

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        await User.create({ email, password });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // compare password
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        return res.status(200).json({ message: "Login Successful" });
    } catch (error) {
        res.status(500).json({ message: "Unable to login! Try again" });
    }
}

module.exports = {
    register,
    login
}
