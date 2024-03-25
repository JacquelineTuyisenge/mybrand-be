import express from 'express';
import httpUsers from '../controllers/user.controllers';
import isValidUser from '../middlewares/usersMiddlewares';
import authCheck from '../middlewares/authentication';

const UserRouter = express.Router();

UserRouter.post('/register', isValidUser, httpUsers.createUser);
UserRouter.post('/login', httpUsers.logIn);
UserRouter.get('/loggedInUser', authCheck.authenticateLogin, httpUsers.loggedInUser);
UserRouter.get('/', authCheck.isAdmin, httpUsers.getAllUsers);
UserRouter.get('/:id', authCheck.isAdmin, httpUsers.getSingleUser);
UserRouter.patch('/:id', authCheck.isAdmin, isValidUser, httpUsers.updateUser);
UserRouter.delete('/', authCheck.isAdmin, httpUsers.deleteUser);

export default UserRouter;