import { Request, Response } from "express";
import { User } from "../models/user";
import { BanIp } from "../models/banip";
import { getGeolocalization, searchGeolocalization } from "./utils/apicalls";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
dotenv.config()

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (user && (user as any).isAdmin === true) {
            const users = await User.findAll();

            return res.status(200).json(users);

        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }


    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong',
            error
        });
    }
};

const getUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id, id2 } = req.params;
        const user = await User.findByPk(id);

        if (user && (user as any).isAdmin === true) {
            const user = await User.findByPk(id2);

            if (user) {
                //user without password
                const { password, ...userWithoutPassword } = user as any;
                return res.status(200).json(userWithoutPassword);
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong',
            error
        });
    }
};

const getUserInfo = async (_req: Request, res: Response): Promise<Response> => {
    try {

       const IP = "102.217.238.0";

        const isBanned = await BanIp.findOne({
            where: {
                ip: IP
            }
        });

        if (isBanned) {
            return res.json("You are banned");
        } else {
            const response = await getGeolocalization(IP);

            if (response) {
                return res.json(response);
            } else {
                return res.json("No response");
            }
        }

    } catch (error) {
        return res.json(error);
    }
}

const searchInfoWithIp = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { ip } : any = req.query;
        
        const user = await User.findByPk(id);

        if (user && (user as any).isAdmin === true) {
            const response = ip !== undefined && await searchGeolocalization(ip);

            if (response) {
                return res.json(response);
            } else {
                return res.json("No response");
            }
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        return res.json(error);
    }
}





const banUserId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id, id2 } = req.params;
        const { banned } = req.body;

        const user = await User.findByPk(id);

        if (user && (user as any).isAdmin === true) {
            const user = await User.findByPk(id2);

            if (user) {
                await user.update({ banned });
                return res.status(200).json({ message: 'User banned' });
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong',
            error
        });
    }
};



const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { userName, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
        }, {
            fields: ['userName', 'password']
        });

        const token = jwt.sign({ id: user }, process.env.SECRET_KEY || 'secretkey', {
            expiresIn: 60 * 60 * 24
        });

        return res.status(200).json({ user, token });

    } catch (error) {
        return res.json(error);
    }
}

const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { userName, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.update({
            userName,
            email,
            password: hashedPassword,
        }, {
            where: {
                id
            }
        });
        return res.status(200).json({ userName, email, password });
    } catch (error) {
        return res.json(error);
    }
}

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { token } = req.body;
        if (token === ADMIN_TOKEN) {
            const { id } = req.params;
            await User.destroy({
                where: {
                    id
                }
            });
            return res.json("User deleted successfully");
        } else {
            return res.status(401).json({
                message: 'You are not authorized to access this resource'
            });
        }
    } catch (error) {
        return res.json(error);
    }
}

const banIp = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { ip } = req.body;
        const banIp = await BanIp.findOrCreate({
            where: {
                ip
            }
        });
        return res.json(banIp);
    } catch (error) {
        return res.json(error);
    }
}

const getBanIps = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const banIps = await BanIp.findAll();
        return res.json(banIps);
    } catch (error) {
        return res.json(error);
    }
}



const deleteIpBan = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { ip } = req.body;
        const user = await User.findByPk(id);

        if (user && (user as any).isAdmin === true) {
            const searchIp = await BanIp.findOne({
                where: {
                    ip
                }
            });
            if (searchIp) {
                await BanIp.destroy({
                    where: {
                        ip
                    }
                });


                return res.json("Ip deleted successfully");
            } else {
                return res.json("Ip not found");
            }


        } else {
            return res.status(401).json({
                message: 'You are not authorized to access this resource'
            });
        }
    } catch (error) {
        return res.json(error);
    }
}



export {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUserInfo,
    banUserId,
    deleteIpBan,
    banIp,
    getBanIps,
    searchInfoWithIp
}

