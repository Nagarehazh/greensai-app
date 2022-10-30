import { Request, Response } from "express";
import { User } from "../models/user";
import { BanIp } from "../models/banip";
import { getGeolocalization } from "./utils/apicalls";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
dotenv.config()

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { token } = req.body;
        if (token === ADMIN_TOKEN) {
            const users = await User.findAll();
            return res.json({
                data: users
            });
        } else {
            return res.status(401).json({
                message: 'You are not authorized to access this resource'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}



const getUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { token } = req.body;
        if (token === ADMIN_TOKEN) {
            const { id } = req.params;
            const user = await User.findOne({
                where: {
                    id
                }
            });
            return res.json(user);
        } else {
            return res.status(401).json({
                message: 'You are not authorized to access this resource'
            });

        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const getUserInfo = async (_req: Request, res: Response): Promise<Response> => {
    try {

        // const ip: any = req.header('x-forwarded-for') || req.socket.remoteAddress;
        // const IP = ip.split(":").pop();
        

        // console.log(IP, "***************")
        const IP = "2800:e2:1380:d94:cd7:e3b6:6a01:3db6";

        const isBanned = await BanIp.findOne({
            where: {
                ip: IP
            }
        });

        if (isBanned) {
            return res.json("You are banned");
        } else {
            const response = IP !== undefined && await getGeolocalization(IP);

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


const banUserId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { token } = req.body;
        if (token === ADMIN_TOKEN) {
            // const { ip } = req;
            // const IP = ip.split(":").pop();
            const { id } = req.params;

            const IP = "2800:e2:1380:d94:cd7:e3b6:6a01:3db6";
            // userId include in BanIp 
            const findIp = await BanIp.findOne({
                where: {
                    userId: id
                },
            });

            console.log(findIp)

            if (findIp && (findIp as any).ip === IP) {
                return res.json("user/IP already banned");
            } else {
                const banIp = await BanIp.create({
                    userId: id,
                    ip: IP
                });

                const user = await User.findOne({
                    where: {
                        id
                    }
                });
                if (user) {
                    await user.update({
                        banned: true
                    });

                }

                return res.json(banIp);
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

const deleteIpBan = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { token } = req.body;
        if (token === ADMIN_TOKEN) {
            const { id } = req.params;
           await BanIp.destroy({
                where: {
                    userId: id
                }
            });
            await User.update({
                    banned: false
                }, {
                    where: {
                        id
                    }
                });

                return res.json("User ban deleted successfully");

            
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
    deleteIpBan
}

