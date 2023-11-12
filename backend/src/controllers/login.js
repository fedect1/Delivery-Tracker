import UserModel from '../models/mongodb/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class loginController{
    static async login(req, res, next){
        try{
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email });
            const passwordMatch = user===null ? false : await bcrypt.compare(password, user.password);
            if(!(user && passwordMatch)){
                return res.status(401).json({ message: "Invalid credentials" });
            }
            const userForToken = {
                username: user.username,
                id: user._id
            };

            const token = jwt.sign(userForToken, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 * 7 });

            res.status(200).json({ token, username: user.username });
        } catch(error){
            next(error);
        }
    }
}
            