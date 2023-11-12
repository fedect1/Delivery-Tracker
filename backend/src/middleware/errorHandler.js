export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.type === 'ZodError') {
        return res.status(400).json({ message: 'Validation failed', errors: err.errors });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
};