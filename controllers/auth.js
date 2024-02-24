const User = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            let user = await User.findOne({ email, isDeleted: false });
            if (!user) {
                return res.status(400).json({ message: "User not registered with the given email." });
            } else if (user && !user.isActive) {
                return res.status(400).json({ message: "User is inactive. Please contact admin." });
            }
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (!passwordMatch) {
                return res.status(400).json({ message: "Invalid credentials." });
            }

            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || '0cbf49d32c2dc7675e04a6a2b0a1a7173f9c75c87288e47b9768f72446c042b8', { expiresIn: '1h' })

            delete user.password
            return res.status(200).json({ token, user, message: "User authenticated successfully." });

        } catch (error) {
            console.log("Error:authController:login", error)
            return res.status(400).json(error);
        }
    },
    async register(req, res) {
        try {
            const { email, password, name } = req.body;
            let user = await User.findOne({ email, isDeleted: false });
            if (user) {
                return res.status(400).json({ message: "User already registered with the given email." });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            user = new User({ email, password: hashedPassword, name })
            await user.save();

            return res.status(200).json({ message: "User regiestered successfully." });
        } catch (error) {
            console.log("Error:authController:register", error)
            return res.status(400).json(error);
        }
    },
}

module.exports = authController