import { RequestPost, PostDocument, PostModel } from './post.models';

type PostCRUD = Pick<Global.CRUD, 'create' | 'findAll'> & {
    count: () => Promise<number>;
};

class PostRepositoryClass implements PostCRUD {
    public count = (): Promise<number> => PostModel.countDocuments();

    public create = (resource: RequestPost): Promise<PostDocument> => PostModel.create(resource);

    // public deleteById = (_id: string) => Promise<Post>;

    public findAll = (limit: number, skip: number) => PostModel.find().skip(skip).limit(limit);

    // public findById = (_id: number) => Promise<Post>;

    // public updateById = (_id: string, resource: Post) => Promise<Post>;
}

export const PostRepository = new PostRepositoryClass();
