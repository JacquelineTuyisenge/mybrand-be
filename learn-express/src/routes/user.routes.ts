import express from 'express';
import httpUsers from '../controllers/user.controllers';
import isValidUser from '../middlewares/usersMiddlewares';
import authenticateLogin from '../middlewares/authentication';

const UserRouter = express.Router();

UserRouter.post('/register', isValidUser, httpUsers.createUser);
UserRouter.post('/login', httpUsers.logIn);
UserRouter.get('/loggedInUser', authenticateLogin, httpUsers.loggedInUser);
UserRouter.get('/', httpUsers.getAllUsers);
UserRouter.get('/:id', httpUsers.getSingleUser);
UserRouter.patch('/:id', isValidUser, httpUsers.updateUser);
UserRouter.delete('/', httpUsers.deleteUser);

export default UserRouter;