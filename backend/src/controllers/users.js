import UserModel from '../models/mongodb/User.js';
import bcrypt from 'bcrypt';

export class usersController{
    static async create(req, res, next){
        try{
            const { username, password } = req.body;
            const passwordHash = await bcrypt.hash(password, 10);
            const user = await UserModel.create({ username, password: passwordHash });

            res.status(201).json(user);
        }catch(err){
            next(err);
        }
    }
    static async read(req, res,next){
        try{
            const users = await UserModel.find({});
            res.status(200).json(users);
        }catch(err){
            next(err);
        }
    }
}