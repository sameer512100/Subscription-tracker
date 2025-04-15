import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import { JWT_SECRET,JWT_EXPIRES_IN } from "../config/env.js";


export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email }).session(session);
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{
            name,
            email,
            password: hashedPassword
        }], { session });

        const newUser = newUsers[0];

        const token = jwt.sign({ userId: newUsers._id }, JWT_SECRET, { expiresIn: '1h' });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                user: newUser,
                token
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};


export const signIn = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({userId: user._id},JWT_SECRET,{expiresIn: JWT_EXPIRES_IN});

        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                user,
                token
            }
        });
    }catch(error){
        next(error);
    }
};

export const signOut = async(req,res,next)=>{
    try{
        res.status(200).json({
            success: true,
            message: 'User signed out successfully'
        });
    }catch(error){
        next(error);
    }
}