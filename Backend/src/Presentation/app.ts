import express from 'express';
import cors from 'cors';
import { connectDB } from '../Infrastructure/config/mongo.config';
import routes from './http/routes/index'


const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/test', (req, res) => {
    console.log('I am working');
    res.status(200).json({status: "OK"});
});

app.use('/', routes)

export default app;