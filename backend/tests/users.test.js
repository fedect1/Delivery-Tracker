
import supertest from 'supertest';
import UserModel from '../src/models/mongodb/User.js';
import { app, server } from '../src/app.js';

import bcrypt from 'bcrypt';

const api = supertest(app);
describe
beforeEach(async () => {
    await UserModel.deleteMany({});

    const passwordHash = await bcrypt.hash('123456#Ab', 10);
    const user = new UserModel({ username: 'usuario3', email:'user3@gmail.com', password: passwordHash });
    
    await user.save();
})
