import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userSchema.js';


const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new userModel({
            email,
            password: hashedPassword,
            role
        })

        await newUser.save()

        return (
            res.json({
                success: true,
                message: "User created successfully"
            })
        )
    } catch (error) {
        console.log(error)
        return (
            res.json({
                success: false,
                message: "Something went wrong"
            })
        )
    }



}

const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return (
                res.json({
                    success: false,
                    message: "User not found"
                })
            )
        }
            
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        const isRoleMatch = role === user.role;

        if (!isPasswordMatch || !isRoleMatch) {
            return res.json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return (
            res.json({
                success: true,
                message: "Login successful",
                token
            })
        )

    } catch (error) {

    }
}

export { login, register }