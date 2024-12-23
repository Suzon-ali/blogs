import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundHandler from './app/middlewares/notFoundHandler';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//router
app.use('/api/', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;
