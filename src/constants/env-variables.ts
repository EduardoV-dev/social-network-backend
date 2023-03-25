import dotenv from 'dotenv';

dotenv.config();

export const {
    BASE_URL,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME,
    DB_NAME,
    JWT_SECRET,
    MONGODB_PASSWORD,
    MONGODB_USERNAME,
    NODE_ENV,
    PORT,
} = process.env;
