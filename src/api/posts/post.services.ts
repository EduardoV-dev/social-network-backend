import { uploadToCloudinary } from '../../lib/cloudinary';
import { HttpError } from '../../lib/http-error';
import { User } from '../users/user.models';

import { Post, PostDocument, PostRequest } from './post.models';
import { PostRepository } from './post.repository';

const POSTS_PER_PAGE = 2;

type Image = Express.Multer.File | undefined;

export interface GetPostsReturn {
    message: string;
    posts: Post[];
    totalItems: number;
}

export interface PostReturn {
    message: string;
    post: PostDocument;
}

interface PostMutation {
    userId: string;
    postId: string;
}

interface PostCreation {
    post: PostRequest;
    image: Image;
    userId: string;
}

interface PostEdition extends PostMutation {
    post: PostRequest;
    image: Image;
}

const POST_IMAGES_FOLDER = 'posts';

class PostServicesClass {
    /**
     * Verifies if the userId from the authentication middleware is the same that created a post, if true,
     * user will be able to delete or update post, else, will not be able to do it.
     *
     * @param Mutation Configutation params for the function
     * @param Mutation.postId Id for the post that could be mutated (updated or deleted)
     * @param Mutation.userId Id for the current authenticated user
     * @throws HttpError for forbidden action
     * @returns PostDocument from database, Post belongs to the passed postId
     */
    private checkIfUserIsCreator = async ({
        postId,
        userId,
    }: PostMutation): Promise<PostDocument> => {
        const responseFromDB = await this.getPost(postId);
        const isCreator: boolean = (responseFromDB.post.creator as User)._id.toString() === userId;
        if (!isCreator) throw new HttpError('You are not allowed for this action', 403);
        return responseFromDB.post;
    };

    public create = async ({ post, image, userId }: PostCreation): Promise<PostReturn> => {
        if (!image) throw new HttpError('Post image is required', 400);
        if (!image.mimetype.includes('image')) throw new HttpError('File is not an image', 400);

        const [imageUrl] = await uploadToCloudinary([image], POST_IMAGES_FOLDER);
        const response: PostDocument = await PostRepository.create({
            ...post,
            creator: userId,
            image: imageUrl,
        });

        return { message: 'Post created', post: response };
    };

    public getPosts = async (page: number): Promise<GetPostsReturn> => {
        const skip: number = (page - 1) * POSTS_PER_PAGE;
        const posts: PostDocument[] = await PostRepository.findAll(POSTS_PER_PAGE, skip);
        const totalPosts: number = await PostRepository.count();
        return { message: 'Posts fetched successfully', posts, totalItems: totalPosts };
    };

    public getPost = async (postId: string): Promise<PostReturn> => {
        const post: PostDocument | null = await PostRepository.findById(postId);
        if (!post) throw new HttpError('No post was found', 404);
        return { message: 'Post fetched', post };
    };

    public updatePost = async ({
        userId,
        image,
        post,
        postId,
    }: PostEdition): Promise<PostReturn> => {
        const postFromDB: PostDocument = await this.checkIfUserIsCreator({ userId, postId });
        const [imageUrl]: string[] = image
            ? await uploadToCloudinary([image], POST_IMAGES_FOLDER)
            : [postFromDB.image];

        const updatedPost: PostDocument = await PostRepository.updateById(postId, {
            ...post,
            image: imageUrl,
        });

        return { message: 'Post updated', post: updatedPost };
    };

    public deletePost = async (config: PostMutation): Promise<PostReturn> => {
        await this.checkIfUserIsCreator(config);
        const deletedPost: PostDocument = await PostRepository.deleteById(config.postId);
        return { message: 'Post delete', post: deletedPost };
    };
}

export const PostServices = new PostServicesClass();
