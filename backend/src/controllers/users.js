import UserModel from '../models/mongodb/User.js';
import bcrypt from 'bcrypt';
import { validateUser } from '../validation-schemas/userSchema.js';

export class usersController{
    static async create(req, res, next){
        try{

            const validatedUser = validateUser(req.body);
            if (!validatedUser.success) {
                console.log(validatedUser.error)
                const errorMessages = validatedUser.error.issues.map((issue) => issue.message);
                const combinedErrorMessage = `Validation failed: ${errorMessages.join(', ')}`;
                const error = new Error(combinedErrorMessage);
                error.type = 'ZodError';
                throw error;
            }
            const { username, email, password } = validatedUser.data;
            const passwordHash = await bcrypt.hash(password, 10);
            const user = await UserModel.create({ username, email, password: passwordHash });

            res.status(201).json({
                ok: true,
                uid: user._id,
                username: user.username,
            });
        }catch(err){
            if (err.code === 11000) {
                const field = err.message.includes('username') ? 'username' : 'email';
                const message = `User with this ${field} already exists`;
                err = new Error(message);
                err.type = 'DuplicateError';
            }
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