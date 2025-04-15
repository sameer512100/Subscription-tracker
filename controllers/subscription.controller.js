import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req,res,next)=>{
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user:req.user._id,
        })
        res.status(201).json({
            success:true,
            message:'Subscription created successfully',
            data:{
                subscription
            }
        })
    }catch(error){

    }
}

export const getUserSubscriptions = async (req,res,next)=>{
    try{
        // check if the user is same as the one in the token
        if(req.user.id!=req.params.id){
            return res.status(403).json({
                success:false,
                message:'You are not allowed to access this resource'
            })
        }
        const subscriptions = await Subscription.find({user:req.params.id}).populate('user','name email')
        res.status(200).json({
            success:true,
            message:'Subscriptions fetched successfully',
            data:{
                subscriptions
            }
        })
    }catch(error){
        next(error); 
    }
}

export const getAllSubscriptions = async(req,res,next)=>{
    try{
        const subscriptions = await Subscription.find().populate('user','name email')
        res.status(200).json({
            success:true,
            message:'Subscriptions fetched successfully',
            data:{
                subscriptions
            }
        })
    }catch(error){
        next(error); 
    }
}