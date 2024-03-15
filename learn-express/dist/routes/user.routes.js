"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = __importDefault(require("../controllers/user.controllers"));
const usersMiddlewares_1 = __importDefault(require("../middlewares/usersMiddlewares"));
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const UserRouter = express_1.default.Router();
UserRouter.post('/', usersMiddlewares_1.default, user_controllers_1.default.createUser);
UserRouter.post('/login', user_controllers_1.default.logIn);
UserRouter.get('/loggedInUser', authentication_1.default, user_controllers_1.default.loggedInUser);
UserRouter.get('/', user_controllers_1.default.getAllUsers);
UserRouter.get('/:id', user_controllers_1.default.getSingleUser);
UserRouter.patch('/:id', usersMiddlewares_1.default, user_controllers_1.default.updateUser);
UserRouter.delete('/', user_controllers_1.default.deleteUser);
exports.default = UserRouter;
