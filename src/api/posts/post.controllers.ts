import { Request, Response, NextFunction } from 'express';

import { Post } from './post.models';
import { PostServices } from './post.services';

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page: number = Number(req.query.page || 1);
        const results = await PostServices.getPosts(page);
        res.status(200).send(results);
    } catch (error) {
        next(error);
    }
};

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post: Post = await PostServices.create(req.body, req.file);
        res.status(200).send({ message: 'Post created successfully', post });
    } catch (error) {
        next(error);
    }
};
