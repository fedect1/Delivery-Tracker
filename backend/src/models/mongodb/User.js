import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username must be at most 30 characters long'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],

});

userSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.__v;
        delete ret.password;
        return ret;
    }
});

class User {
    static async create({ username, password }) {
        const user = new UserModel({ username, password });
        await user.save();
        return user;
    }
}

userSchema.loadClass(User);
const UserModel = mongoose.model('User', userSchema);
export default UserModel