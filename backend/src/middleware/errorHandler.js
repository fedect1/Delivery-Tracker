export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.type === 'ZodError') {
        return res.status(400).json({ message: 'Validation failed', errors: err.errors });
    }

    if (err.code === 11000) {
        return res.status(409).json({ message: 'Duplicate key error', details: err.message });
    }

    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ message: 'Mongoose validation failed', errors: err.errors });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
};