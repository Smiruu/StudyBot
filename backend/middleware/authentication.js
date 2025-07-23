import jwt from 'jsonwebtoken';
import {User} from '../apps/users/models/userModel.js';

export const authenticateUser = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Unauthorized access. No token provided." });
        }

        // 2. Extract the token (remove "Bearer ")
        const token = authHeader.split(' ')[1]; 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Unauthorized access. Invalid token." });
    }
 }