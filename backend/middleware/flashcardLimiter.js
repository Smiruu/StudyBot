import rateLimit from 'express-rate-limit';

const flashcardLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 1, // Limit each IP to 1 request per windowMs
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false,
    skipFailedRequests: false, // Count failed requests too
    skipSuccessfulRequests: false, // Count successful requests
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: {
                message: 'Too many flashcard generation requests',
                details: 'Please wait 1 minute before trying again',
                retryAfter: 60,
                timestamp: new Date().toISOString()
            }
        });
    }
});

export default flashcardLimiter;