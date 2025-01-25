import express from 'express';
import cors from 'cors';
import clientRouter from './routes/client.routes.js';

// creating instance of express application 
const app = express();


// middlewares
app.use(express.json());
app.use(cors({
    origin:"*",
}))
app.use(express.static('public/temp'));
app.use(express.json());


// routing
app.use('/api/v1/gpt',clientRouter);

export default app;