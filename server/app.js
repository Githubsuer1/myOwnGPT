import express from 'express';
import cors from 'cors';
import clientRouter from './routes/client.routes.js';

// setting up port
const PORT = process.env.PORT || 8000;


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

// listening to port
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})

export default app;
