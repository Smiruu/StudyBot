import * as userService from "./services.js";


export const refresh = async (req, res) => {
    try {
        const token = req.cookies.refresh_token
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        console.log("Hit")
        const response = await userService.refresh(token)

        res.cookie('refresh_token',
            response.session.refresh_token,
            {
                httpOnly: true,
                secure: process.env.DEV_ENV === 'production',
                sameSite: process.env.DEV_ENV === 'production' ? 'none' : 'lax',
                maxAge: 60 * 60 * 24 * 7
            }
        )

        res.status(200).json({
            message: 'Refresh successful',
            email: response.user.email,
            user_id: response.user.id,
            username: response.user.user_metadata.username,
            access_token: response.session.access_token,
        })
    } catch (error) {
        console.error("Controller Error:", error)
        res.status(500).json({ error: error.message })
    }
}
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields required" })
        }

        const response = await userService.register(username, email, password)

        res.status(200).json({
            message: 'User registered successfully, Check your email to verify.',
            email: response.user.email
        })
    } catch (error) {
        console.error("Controller error:", error)

    }
}
export const verifyRegister = async (req, res) => {
    try {
        const { email, token } = req.body;
        if (!email || !token) {
            return res.status(400).json({ error: "All fields required" })
        }
        const response = await userService.verifyRegister(email, token);

        res.cookie('refresh_token',
            response.session.refresh_token,
            {
                httpOnly: true,
                secure: process.env.DEV_ENV === 'production',
                sameSite: process.env.DEV_ENV === 'production' ? 'none' : 'lax',
                maxAge: 60 * 60 * 24 * 7
            }
        )

        res.status(200).json({
            message: 'Account verified successfully',
            user:
            {
                email: response.user.email,
                user_id: response.user.id,
                username: response.user.user_metadata.username,

            },
            access_token: response.session.access_token,
        })
    } catch (error) {
        console.error("Controller Error:", error)
        res.status(500).json({ error: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: "All fields required" })
        }

        const response = await userService.login(email, password);

        res.cookie('refresh_token',
            response.session.refresh_token,
            {
                httpOnly: true,
                secure: process.env.DEV_ENV === 'production',
                sameSite: process.env.DEV_ENV === 'production' ? 'none' : 'lax',
                maxAge: 60 * 60 * 24 * 7
            }
        )

        res.status(200).json({
            message: 'Login successful',
            user: {
                email: response.user.email,
                user_id: response.user.id,
                username: response.user.user_metadata.username
            },
            access_token: response.session.access_token,
        })
    } catch (error) {
        console.error("Controller Error:", error)
        res.status(500).json({ error: error.message })
    }
}

export const logout = async (req, res) => {
    res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: process.env.DEV_ENV === 'production',
        sameSite: process.env.DEV_ENV === 'production' ? 'none' : 'lax',
        maxAge: 60 * 60 * 24 * 7
    })
    res.status(200).json({
        message: 'Logout successful'
    })
}
