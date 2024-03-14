"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const querries_controllers_1 = __importDefault(require("../controllers/querries.controllers"));
const querriesMiddleware_1 = __importDefault(require("../middlewares/querriesMiddleware"));
const querriesRouter = express_1.default.Router();
querriesRouter.post('/', querriesMiddleware_1.default, querries_controllers_1.default.httpAddQuerries);
querriesRouter.get('/', querries_controllers_1.default.httpGetAllQuerries);
querriesRouter.get('/:id', querries_controllers_1.default.httpGetQuerry);
querriesRouter.patch('/:id', querriesMiddleware_1.default, querries_controllers_1.default.httpUpdateQuerry);
querriesRouter.delete('/:id', querries_controllers_1.default.httpDeleteQuerry);
exports.default = querriesRouter;
