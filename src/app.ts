import dotenv from 'dotenv';
import express from 'express';
import { router } from './dynamic-routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', router);

const PORT = process.env.PORT || 3120;

app.listen(PORT, () => {
    console.log('Server initialized on port', PORT);
});
