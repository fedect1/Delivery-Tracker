import UserModel from '../models/mongodb/User.js';
import bcrypt from 'bcrypt';
import { validateUser } from '../validation-schemas/userSchema.js';

export class usersController{
    static async create(req, res, next){
        try{
            const validatedUser = validateUser(req.body);
            if (!validatedUser.success) {
                const ZodError = new Error('Validation failed');
                ZodError.type = 'ZodError';
                ZodError.errors = validatedUser.error;
                throw ZodError;
            }
            const { username, email, password } = validatedUser.data;
            const passwordHash = await bcrypt.hash(password, 10);
            const user = await UserModel.create({ username, email, password: passwordHash });

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