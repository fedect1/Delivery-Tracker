import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userSchema: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
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

const User = mongoose.model('User', userSchema);
export default User;