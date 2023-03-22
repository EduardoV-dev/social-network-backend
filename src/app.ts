import dotenv from 'dotenv';
import express from 'express';

import { connectToDatabase } from './config/database';
import { v1Router } from './config/routes-from-features';
import * as env from './constants/env-variables';
import { errorHandler } from './middlewares/error-handler';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/v1', v1Router);
app.use(errorHandler);

const PORT = env.PORT || 3120;

(async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log('Server initialized on port', PORT);
    });
})();
