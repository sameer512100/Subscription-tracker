import {Router} from "express";
import authorize from '../middlewares/auth.middleware.js';
import {createSubscription, getAllSubscriptions, getUserSubscriptions} from "../controllers/subscription.controller.js";
const subscriptionRouter =  Router();

subscriptionRouter.get('/',authorize,getAllSubscriptions);

subscriptionRouter.get('/:id',(req,res)=>res.send({title:'Get  subscription details'}));

subscriptionRouter.post('/',authorize,  createSubscription);

subscriptionRouter.put('/:id',(req,res)=>res.send({title:'Update subscription'}));

subscriptionRouter.delete('/',(req,res)=>res.send({title:'delete subscription'}));

subscriptionRouter.get('/user/:id',authorize,getUserSubscriptions);

subscriptionRouter.put('/:id/cancel',(req,res)=>res.send({title:'cancel subscription'}));

subscriptionRouter.get('/upcoming-renewals',(req,res)=>res.send({title:'Get upcoming renewal'}));

export default subscriptionRouter; 