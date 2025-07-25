import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie =
    (user, res) => {
        const token = jwt.sign(
            { id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '7d',
            })

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: 'strict', // Helps prevent CSRF attacks
                maxAge: 7 *  24 * 60 * 60 * 1000,
            });
        return token;
    }