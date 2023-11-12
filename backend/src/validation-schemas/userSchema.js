import z from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/; // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation= z.string().min(8, { message: 'Password must be at least 8 characters long' }).max(100, { message: 'Password must be at most 100 characters long' }).regex(passwordRegex, { message: 'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character' });
const emailValidation = z.string().email({ message: 'Invalid email' }).min(3, { message: 'Email must be at least 3 characters long' }).max(30, { message: 'Email must be at most 30 characters long' });
const userSchema = z.object({
    username: z.string().min(3, { message: 'Name must be at least 3 characters long' }).max(30, { message: 'Name must be at most 30 characters long' }),
    email: emailValidation,
    password: passwordValidation,
});

export const validateUser = (user) => {
    return userSchema.safeParse(user);
}