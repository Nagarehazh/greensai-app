import { Request, Response } from 'express';
import { BanIp } from '../models/banip';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import * as dotenv from 'dotenv'
dotenv.config()

const register = async (req: Request, res: Response) => {
    try {
        const { userName, email, password, isAdmin } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
            isAdmin
        }, {
            fields: ['userName', 'password', 'email', 'isAdmin']
        });

        const token = jwt.sign({ id: user }, "sda1234" || 'secretkey', {
            expiresIn: 60 * 60 * 24
        });

        return res.status(200).json({ user, token });
    } catch (error) {
       return res.json(error);
    }
}


const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const banned = await BanIp.findOne({
            where: {
                ip: req.ip
            }
        });
        if (banned) {
            return res.status(400).json({ message: 'You are banned' });
        }
        
        const user = await User.findOne({
            where: {
                email
            }
        });
        if ((user as any).banned) {
            return res.status(400).json({ message: 'You are banned' });
        }
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const validPassword = await bcrypt.compare(password, (user as any).password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ id: user }, process.env.SECRET_KEY || 'secretkey', {
            expiresIn: 60 * 60 * 24
        });
        const { password: _, ...userWithoutPassword } = (user as any);

        return res.status(200).json({ user: userWithoutPassword, token });
    } catch (error) {
        return res.json(error);
    }
}





        
        


export { register, login };