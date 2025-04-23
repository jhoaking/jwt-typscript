import express from 'express';
import { PORT } from './config';
import cookieParser from 'cookie-parser';
import { routerAuth } from './routes/authRoutes';
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/user',routerAuth);

app.listen(PORT , () =>{
    console.log('server on port ',PORT);
})


