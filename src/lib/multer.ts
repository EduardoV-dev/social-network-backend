import multer from 'multer';

const uploader = multer({ storage: multer.memoryStorage() });

export const uploadSingleFile = (fieldName: string) => uploader.single(fieldName);
