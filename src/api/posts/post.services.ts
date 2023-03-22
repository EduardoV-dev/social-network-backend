import { uploadToCloudinary } from '../../lib/cloudinary';
import { HttpError } from '../../lib/http-error';

import { Post, PostDocument } from './post.models';
import { PostRepository } from './post.repository';

const POSTS_PER_PAGE = 2;

interface GetPostsReturn {
    message: string;
    posts: Partial<PostDocument[]>;
    totalItems: number;
}

class PostServicesClass {
    public create = async (
        resource: Post,
        image: Express.Multer.File | undefined,
    ): Promise<Post> => {
        if (!image) throw new HttpError('Post image is required', 400);
        if (!image.mimetype.includes('image'))
            throw new HttpError('Uploaded file is not an image', 400);

        const [imageUrl] = await uploadToCloudinary([image], 'posts');
        const response: PostDocument = await PostRepository.create({
            ...resource,
            image: imageUrl,
        });
        return response;
    };

    public getPosts = async (page: number): Promise<GetPostsReturn> => {
        const skip: number = (page - 1) * POSTS_PER_PAGE;
        const posts: PostDocument[] = await PostRepository.findAll(POSTS_PER_PAGE, skip);
        const totalPosts: number = await PostRepository.count();
        return { message: 'Posts fetched successfully', posts, totalItems: totalPosts };
    };

    // public deleteById = (_id: string) => Promise<Post>;

    // public findById = (_id: number) => Promise<Post>;

    // public updateById = (_id: string, resource: Post) => Promise<Post>;
}

export const PostServices = new PostServicesClass();
