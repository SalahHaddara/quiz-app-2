import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}

export const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: '7w',
    })
}