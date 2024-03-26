import express from 'express';
import httpQuerries from '../controllers/querries.controllers';
import isValidQuerry from '../middlewares/querriesMiddleware';
import authCheck from '../middlewares/authentication';

const querriesRouter = express.Router();

querriesRouter.post('/', isValidQuerry, httpQuerries.httpAddQuerries);
querriesRouter.get('/allquerries', authCheck.isAdmin, httpQuerries.httpGetAllQuerries);

export default querriesRouter;