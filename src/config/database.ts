import mongoose from 'mongoose';

import { DB_NAME, MONGODB_PASSWORD, MONGODB_USERNAME } from '../constants/env-variables';

const URI_CONNECTION = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_USERNAME}.mz5uoyo.mongodb.net`;

export const connectToDatabase = (): Promise<typeof mongoose> =>
    mongoose.connect(URI_CONNECTION, {
        dbName: DB_NAME,
        retryWrites: true,
        writeConcern: new mongoose.mongo.WriteConcern('majority'),
    });
