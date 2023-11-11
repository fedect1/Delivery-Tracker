import UserModel from '../models/mongodb/User.js';
import bcrypt from 'bcrypt';

export class loginController{
    static async login(req, res, next){
        try{
            const { username, password } = req.body;
            const user = await UserModel.findOne({ username });
            const passwordMatch = user===null ? false : await bcrypt.compare(password, user.password);
            if(!passwordMatch){
                return res.status(401).json({ message: "Invalid credentials" });
            }
            res.status(200).json({ message: "Login successful" });
        } catch(error){
            next(error);
        }
    }
}
            