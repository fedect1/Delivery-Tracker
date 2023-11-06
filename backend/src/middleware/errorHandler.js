export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err instanceof mongoose.Error.ValidationError) {
      
        return res.status(400).json({ message: 'Validation failed', errors: err.errors });
    }


    if (err.someSpecificErrorCondition) {
        return res.status(someErrorCode).json({ message: err.someSpecificMessage });
    }


    return res.status(500).json({ message: 'Internal Server Error' });
};