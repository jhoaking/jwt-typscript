import express from 'express';
import { PORT } from './config';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(PORT , () =>{
    console.log('server on port ',PORT);
})


