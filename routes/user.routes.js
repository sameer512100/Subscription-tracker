import {Router} from 'express';
import {getAllUsers, getUser} from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js'
const userRouter = Router();

userRouter.get('/',getAllUsers);

userRouter.get('/:id', authorize,getUser);

userRouter.post('/', (req, res) => res.send({title:'create a new user'}));

userRouter.put('/:id', (req, res) => res.send({title:'Update user'}));

userRouter.delete('/:id', (req, res) => res.send({title:'delete'}));

export default userRouter;
