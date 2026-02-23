import express from 'express';
import cors from 'cors';
import { connectDB } from '../Infrastructure/config/mongo.config';
import routes from './http/routes/index'
import { logger } from '../utils/logging/loger';


const app = express();

app.use(cors());
app.use(express.json());

connectDB().catch((err) => {
    logger.error('Database connection failed', err)
    process.exit(1)
});

app.get('/test', (req, res) => {
    logger.info('I am from app.ts')
    res.status(200).json({status: "OK"});
});

app.use('/', routes)

export default app;