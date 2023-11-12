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
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        minlength: [3, 'Email must be at least 3 characters long'],
        maxlength: [30, 'Email must be at most 30 characters long'],
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
    static async create({ username, email, password }) {
        const user = new UserModel({ username, email, password });
        await user.save();
        return user;
    }
    static async findAll() {
        return UserModel.find({}).populate('orders',
        {
            _id: 1,
            costumerInfo: 1,
            trackerNumber: 1,
            status: 1,
            statusUpdates: 1,
        });
    }
}

userSchema.loadClass(User);
const UserModel = mongoose.model('User', userSchema);
export default UserModel