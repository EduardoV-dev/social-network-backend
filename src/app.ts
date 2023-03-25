import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { connectToDatabase } from './config/database';
import { v1Router } from './config/routes-from-features';
import { swaggerV1Setup } from './config/swagger';
import * as env from './constants/env-variables';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(
    cors({
        origin: env.NODE_ENV === 'development' ? '*' : env.BASE_URL,
        optionsSuccessStatus: 200,
    }),
);
app.use(express.json());
app.use('/v1/api', v1Router);
app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerV1Setup));
app.use(errorHandler);

const PORT = env.PORT || 3120;

(async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log('Server initialized on port', PORT);
    });
})();
