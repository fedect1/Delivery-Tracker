import UserModel from '../models/mongodb/User.js';
import bcrypt from 'bcrypt';

export class usersController{
    static async create(req, res){
        try{
            const { username, password } = req.body;
            const passwordHash = await bcrypt.hash(password, 10);
            const user = await UserModel.create({ username, password: passwordHash });

            res.status(201).json(user);
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }
}