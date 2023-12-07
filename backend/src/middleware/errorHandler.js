export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    console.error(err.type)

    if (err.type === 'UnauthorizedUpdate') {
        return res.status(401).json({ message: err.message });
    }

    if (err.type === 'ZodError') {
        return res.status(400).json({ message: err.message, errors: err.errors });
    }

    if (err.type === 'DuplicateError') {
        const field = err.message.includes('username') ? 'username' : 'email';
        const message = `User with this ${field} already exists`;
        return res.status(409).json({ message });
    }

    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ message: 'Mongoose validation failed', errors: err.errors });
    }

    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).json({ message: 'Invalid id' });
    }
    
    if (err.name === 'MongoError') {
        return res.status(400).json({ message: 'Mongo error', details: err.message });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
    }

    if (err.statusCode === 403) {
        return res.status(403).json({ message: err.message });
    }


    return res.status(500).json({ message: 'Internal Server Error' });
};