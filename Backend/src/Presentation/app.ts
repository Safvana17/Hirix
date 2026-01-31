import express from 'express';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    console.log('I am working');
    res.status(200).json({status: "OK"});
});

export default app;