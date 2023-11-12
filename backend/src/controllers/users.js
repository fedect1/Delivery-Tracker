import UserModel from '../models/mongodb/User.js';
import bcrypt from 'bcrypt';
import { validateUser } from '../validation-schemas/userSchema.js';

export class usersController{
    static async create(req, res, next){
        try{
            const validatedUser = validateUser(req.body);
            const { username, password } = validatedUser;
            const passwordHash = await bcrypt.hash(password, 10);
            const user = await UserModel.create({ username, password: passwordHash });

            res.status(201).json(user);
        }catch(err){
            next(err);
        }
    }
    static async read(req, res,next){
        try{
            const users = await UserModel.findAll();
            res.status(200).json(users);
        }catch(err){
            next(err);
        }
    }
}