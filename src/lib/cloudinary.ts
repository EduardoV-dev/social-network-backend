import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import URIParser from 'datauri/parser';

import * as env from '../constants/env-variables';

import { HttpError } from './http-error';

const uriParser = new URIParser();

cloudinary.config({
    api_key: env.CLOUDINARY_API_KEY,
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_secret: env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a single file (converted into base64 by using URIParser) into cloudinary, will return the
 * response as a promise
 *
 * @param uri File in URI format
 * @param folder Folder in which file will be uploaded inside
 * @returns Response from uploading the file to cloudinary
 */
const uploadSingleURI = (uri: URIParser, folder: string): Promise<UploadApiResponse> =>
    new Promise((resolve, reject) => {
        try {
            if (!uri.content)
                throw new HttpError(
                    'There was an error while trying to create upload images to cloudinary',
                    500,
                );

            resolve(cloudinary.uploader.upload(uri.content, { folder }));
        } catch (error) {
            reject(error);
        }
    });

/**
 * Uploads an array of files to cloudinary
 *
 * @param files Files from multer
 * @param folder Folder in which files will be uploaded
 * @returns Array of urls for the files that were uploaded
 */
export const uploadToCloudinary = async (
    files: Express.Multer.File[],
    folder: string,
): Promise<string[]> => {
    const dataUris: URIParser[] = files.map((file) =>
        uriParser.format(file.originalname, file.buffer),
    );
    const uploadResponses: PromiseSettledResult<UploadApiResponse>[] = await Promise.allSettled(
        dataUris.map((uri) => uploadSingleURI(uri, folder)),
    );
    const filesUrl: string[] = uploadResponses.map((response) =>
        response.status === 'fulfilled' ? response.value.url : '',
    );
    return filesUrl;
};
