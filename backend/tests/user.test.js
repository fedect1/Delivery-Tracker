import UserModel from "../src/models/mongodb/User";
import bcrypt from 'bcrypt';

describe('Create user', () => {
    beforeEach(async () => {
        await UserModel.deleteMany({});
        passwordHash = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ username:"José", password: passwordHash });
        await user.save();
    });
});