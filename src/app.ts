import dotenv from 'dotenv';
import express from 'express';
import { featuresRouter } from './features-routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', featuresRouter);

const PORT = process.env.PORT || 3120;

app.listen(PORT, () => {
    console.log('Server initialized on port', PORT);
});
