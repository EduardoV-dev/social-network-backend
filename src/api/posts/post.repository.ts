import { Types } from 'mongoose';

import { PostDocument, PostModel, PostRequest } from './post.models';

type PostCRUD = Global.CRUD & {
    count: () => Promise<number>;
};

class PostRepositoryClass implements PostCRUD {
    public count = (): Promise<number> => PostModel.countDocuments({ active: true });

    public create = (resource: PostRequest): Promise<PostDocument> =>
        new PostModel(resource).save();

    public findAll = (limit: number, skip: number): Promise<PostDocument[]> =>
        PostModel.find({ active: true }).sort({ createdAt: 'ascending' }).skip(skip).limit(limit);

    public findById = (_id: string) =>
        PostModel.findById(new Types.ObjectId(_id))
            .where({ active: true })
            .populate('creator', '-password') as Promise<PostDocument | null>;

    public updateById = (_id: string, resource: PostRequest) =>
        PostModel.findByIdAndUpdate(_id, resource, { new: true }) as Promise<PostDocument>;

    public deleteById = (_id: string) => this.updateById(_id, { active: false } as PostRequest);
}

export const PostRepository = new PostRepositoryClass();
