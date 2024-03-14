import express from 'express';
import httpQuerries from '../controllers/querries.controllers';
import isValidQuerry from '../middlewares/querriesMiddleware';

const querriesRouter = express.Router();

querriesRouter.post('/', isValidQuerry, httpQuerries.httpAddQuerries);
querriesRouter.get('/', httpQuerries.httpGetAllQuerries);
querriesRouter.get('/:id', httpQuerries.httpGetQuerry);
querriesRouter.patch('/:id', isValidQuerry, httpQuerries.httpUpdateQuerry);
querriesRouter.delete('/:id', httpQuerries.httpDeleteQuerry);

export default querriesRouter;