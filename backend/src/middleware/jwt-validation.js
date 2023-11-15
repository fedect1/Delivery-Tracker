import jwt from 'jsonwebtoken';

export const jwtValidation = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader && authHeader.toLowerCase().startsWith('bearer ')){
        const token = authHeader.substring(7);
        try{
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            if (!decodedToken || !decodedToken.id) {
                return res.status(401).json({ message: "Missing or invalid token" });
            }
            req.username = decodedToken.username;
            req.userId = decodedToken.id;
            next();
        }catch(err){
            next(err);
        }
    }else{
        res.status(401).json({ message: 'Missing or invalid token' });
    }
}
