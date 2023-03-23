import { NextFunction, Request, Response } from 'express';

import { PostServices } from './post.services';

class PostControllersClass {
    public getPosts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page: number = Number(req.query.page || 1);
            const response = await PostServices.getPosts(page);
            res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    };

    public getPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId: string = req.params.id;
            const response = await PostServices.getPost(postId);
            res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    };

    public createPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await PostServices.create(req.body, req.file);
            res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    };

    public updatePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await PostServices.updatePost({
                userId: res.locals.userId,
                image: req.file,
                post: req.body,
                postId: req.params.id,
            });

            res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    };

    public deletePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await PostServices.deletePost({
                userId: res.locals.userId,
                postId: req.params.id,
            });

            res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    };
}

export const PostControllers = new PostControllersClass();
